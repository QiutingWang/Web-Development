import fastapi
import uvicorn
from fastapi import FastAPI, Path

# 当前路径加入系统变量 ------------------------------------
import os
import sys
root_path = os.getcwd()
print(root_path)
sys.path.append(root_path)
# -----------------------------------------------------
app=FastAPI()
# write a basic python dictionary to store info in key-value pair
students={
  1: {
    "name":"john",
    "age":"22",
    "class":"year 12"
  }
} 
# we want to return the student specific information with the student ID
# for web address in the web server, we need to type in `http://127.0.0.1:8000/get/1`

@app.get("/") #slash is simply the homepage
def index():
  return {"name": "First Data"} 
# later...written in python dictionary and automatically convert to json format 

@app.get("/get-student/{student_id}") #put a dynamic variable here
def get_student(student_id: int=Path(None, description="The ID of the student you want to view", gt=0, lt=3)): #None：catch the error
  return students[student_id] 
##对key的数值进行限制：
# gt: greater than
# lt: less than
# ge: greater than or equal to
# le: less than or equal to