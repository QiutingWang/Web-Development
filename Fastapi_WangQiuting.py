# 当前路径加入系统变量 ------------------------------------
import os
import sys
root_path = os.getcwd()
print(root_path)
sys.path.append(root_path)
# -----------------------------------------------------

from fastapi.responses import FileResponse
from fastapi import FastAPI, Path, File, UploadFile, Body, HTTPException, Depends
import time
import uvicorn
import pathlib 
import hashlib
import pydantic
import aiofiles
import shutil
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import Boolean,Column,ForeignKey,Integer,String,func,create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URL = "..."
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app=FastAPI()

#schemes
class FileBase(BaseModel):
    md5: str
    filename: str
    owner_id: int
    type: Optional[str]

class FileCreate(FileBase):#向数据库提交新记录
    pass

class FileInfo(FileBase):#与数据库查阅结果对接
    id: int

    class Config:
        orm_mode = True

#document list
class FileDB(Base):
    __tablename__ = "files"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    md5 = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String)

##数据传递
#添加新记录
def create_file(db:Session,file:FileCreate):
    db_file=FileDB(**file.dict())
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

#查询记录，参数:用户id和文件类型
def get_files(db:Session,user_id:int=-1,filetype:str=''):
    q=db.query(FileDB)
    if user_id>0 :
        q=q.filter(FileDB.owner_id==user_id)
    if filetype!='':
        q=q.filter(FileDB.type==filetype)
    return q.all()

# 查找单条记录
def get_file(db:Session,file_id:int):
    return db.query(FileDB).get(file_id)

# 删除一条记录
def drop_file(db:Session,file_id:int):
    db_file=db.query(FileDB).get(file_id)
    db.delete(db_file)
    db.commit()
    return db_file
    
#查看相同文件对应的记录数量
def count_num_of_same_file(db:Session,file_md5:str):
    return db.query(func.count(FileDB.id)).filter(FileDB.md5==file_md5).scalar()

# 文件上传
@app.post("/uploadfiles/")
async def create_upload_file(user_id: int,files: List[UploadFile] = File(...),db: Session = Depends(get_db)):
    start = time.time()

    # 文件目录操作
    path = pathlib.Path('userdata')
    if not path.exists():
        path.mkdir()
	
    for file in files:
        res = await file.read()#读取文件完成后，再执行下面的任务
        filemd5 = hashlib.md5(res).hexdigest()#计算md5文件可识别ID并返回字符串
        with open(path.joinpath(filemd5), "wb") as f:
            f.write(res) #写入文件，文件名为md5值
        filename=file.filename #文件名
        filetype=filename.split('.')[-1]#文件名后缀
        db_file = FileCreate(filename=file.filename, md5=filemd5, owner_id=user_id,type=filetype) #按模板生成记录
        create_file(db=db, file=db_file) #添加记录
    return {'time': time.time() - start, 'filename': file.filename}

#查看记录
@app.get('/files',response_model=List[FileInfo])
async def read_files(user_id:int=-1,filetype:str='',db:Session=Depends(get_db)):
    return get_files(db=db,user_id=user_id,filetype=filetype)

#下载文件
@app.get('/files/{file_id}')
async def download_file(file_id:int,db:Session=Depends(get_db)):
    path=pathlib.Path('userdata')#文件保存的根目录
    db_file=get_file(db=db,file_id=file_id)#查找文件记录
    #按文件保存路径找到并发送文件
    return FileResponse(path=path.joinpath(db_file.md5),filename=db_file.filename)

#删除文件
@app.delete('/files/{file_id}', response_model=FileInfo)
async def delete_file(file_id,db:Session=Depends(get_db)):
    path=pathlib.Path('userdata')
    db_file=get_file(db=db,file_id=file_id)
    if not db_file:
        raise HTTPException(status_code=400, detail="Without this file")
    elif count_num_of_same_file(db=db,file_md5=db_file.md5)==1:
        #只有一条相同记录时，才执行删除操作。
        path=path.joinpath(db_file.md5) #路径从目录移动到目录下的文件
        print(path)
        if path.exists():
            try:
                path.unlink()#删除文件
            except:
                raise HTTPException(status_code=500, detail="Failed to delete")
    return drop_file(db=db,file_id=file_id)

base_dir = os.path.dirname(os.path.abspath(__file__))
upload_file_path = Path(base_dir, './uploads')

#文件分割上传
@app.post("/upload")
async def upload_file(
        identifier: str = Body(..., description="文件唯一标识符"),
        number: str = Body(..., description="文件分片序号（初值为0）"),
        file: UploadFile = File(..., description="文件")
):
    path = Path(upload_file_path, identifier)
    if not os.path.exists(path):
        os.makedirs(path)
    file_name = Path(path, f'{identifier}_{number}')
    if not os.path.exists(file_name):
        async with aiofiles.open(file_name, 'wb') as f:
            await f.write(await file.read())
    return {
        'code': 1,
        'chunk': f'{identifier}_{number}'
    }


@app.put("/merge")
async def merge_file(
        name: str = Body(..., description="文件名称（不含后缀）"),
        file_type: str = Body(..., description="文件类型/后缀"),
        identifier: str = Body(..., description="文件唯一标识符")
):
    """合并分片文件"""
    target_file_name = Path(upload_file_path, f'{name}.{file_type}')
    path = Path(upload_file_path, identifier)
    try:
        async with aiofiles.open(target_file_name, 'wb+') as target_file:  # 打开目标文件
            for i in range(len(os.listdir(path))):
                temp_file_name = Path(path, f'{identifier}_{i}')
                async with aiofiles.open(temp_file_name, 'rb') as temp_file:  # 按序打开每个分片
                    data = await temp_file.read()
                    await target_file.write(data)  # 分片内容写入目标文件
    except Exception as e:
        return {
            'code': 0,
            'error': f'合并失败：{e}'
        }
    shutil.rmtree(path)  # 删除临时目录
    return {
        'code': 1,
        'name': f'{name}.{file_type}'
    }

if __name__ == '__main__':
    uvicorn.run(app='main:app', host="127.0.0.1", port=8000, reload=True, debug=True)