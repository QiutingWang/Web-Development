/////////////////////////////////
/////Activiting Strict Mode//////
'use strict'; ///put 'use strict' at the beginning of the script.It can create visiable error warning for us. Without strict mode, JavaScript will fail sliently.
// let hasDriversLiense= false;
// const passTest= true;

// if (passTest) hasDriverLiense=true; //the error emerge
// if (hasDriversLiense) console.log('I can drive :D');

// const interface='Audio';
// const private=534;
// const if=22;//these variable names have been reserved by JavaSript system


/////////////////////////////////
///////////Functions////////////
function logger(){
  console.log('My name is DorisWang');
} //we use logger to define the function name,simply log something to console;{} create function body. We can use the function many times
logger();//invoking/running/calling the function, then the previous defined function can use over and over again
logger();//the blank function, we may usually use it as block code.It do not return any value from the function


function fruitProcessor(apples,oranges){  //fruitProcessor(parameterNames with comma to separate, we input data into corresponding position in invoking function)
  console.log(apples,oranges);
  const juice=`Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}
// fruitProcessor(5,2); //actual value of parameter is called argument.
const appleJuice=fruitProcessor(5,0);//store the value in a variable
console.log(appleJuice); //return:Juice with 5 apples and 0 oranges.
// another way:
console.log(fruitProcessor(5,0));
const appleOrangeJuice=fruitProcessor(2,4);
console.log(appleOrangeJuice); //Juice with 2 apples and 4 oranges.
//principle: do not repeat yourself or dry!

const num=Number('22') //take 22 string as a parameter, pass this argument in the function. If we type num in console, it return 22


/////////////////////////////////////////////////////////
///////////Function Declaration VS Expression////////////
// Function Declaration
const age1=calcAge1(2000);
function calcAge1(birthYear){
  const age=2022-birthYear;
  return age;
}

// Function Expression
const calcAge2=function (birthYear){ //a function without a name,called it anonymious function
  return 2037-birthYear;
}
const age2=calcAge2(2000); //calling function:we cannot put invoking part before the function defintion part. age2: variable to save returned value(output)

console.log(age1,age2);


//////////////////////////////////////
///////////Arrow Functions////////////
//Shorter and faster function to write. Return keyword and breaket do not need. Super easy when one parameter is needed.
const calcAge3=birthYear => 2022-birthYear; //use => to assign value into the birthYear parameter
//The left part of arrow denotes the input of a function and the right part the output of that function.
const age3=calcAge3(2000);
console.log(age3);


const yearsUntilRetirement= birthYear=>{
  const age=2022-birthYear;
  const retirement=65-age;
  return retirement; // we need return statement here
}

console.log(yearsUntilRetirement(2000));

//For multiple parameters:
const yearUntilRetirement= (birthYear,firstName)=>{
  const age=2022-birthYear;
  const retirement=65-age;
  return `${firstName} retires in ${retirement} years`;
}
console.log(yearUntilRetirement(2000, 'Doris'));
console.log(yearUntilRetirement(1995, 'Clarence'));

//Not all cases can use arrow function.


////////////////////////////////////////////////////////
///////////Functions Calling Other Functions////////////
//Calling one function inside of another function
function cutFruitPieces(fruit){
  return fruit*4;
}

function fruitProcessor(apples,oranges){  //fruitProcessor(parameterNames with comma to separate, we input data into corresponding position in invoking function). fruitProcessor: function name
  const applePieces=cutFruitPieces(apples);
  const orangePieces=cutFruitPieces(oranges); //one function inside another function

  console.log(apples,oranges);
  const juice=`Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2,3)); //return: Juice with 8 pieces of apple and 12 pieces of orange.


///////////////////////////////////////
/////////Reviewing Functions//////////
const calcAge=function(birthYear){
  return 2022-birthYear;
}
const yearUntilRetirement= function(birthYear,firstName){ //this birthYear is not the same as the previous one, it is a local-function variable
  const age=calcAge(birthYear);
  const retirement=65-age;
  if (retirement>0){
    return `${firstName} will return in ${retirement} years.`;
  } else{
    return `${firstName} has already retired.`;
  }
}
console.log(yearUntilRetirement(2000, 'Doris'));
console.log(yearUntilRetirement(1950, 'Henry'));


///////////////////////////////////////
/////////Coding Challenge #1//////////
/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores
*/
// Question1:
const calcAverage=(A,B,C)=>(A+B+C)/3;
console.log(calcAverage(3,4,5)); //testing the accurcy of function design

// // Question2:for test data 1
let scoreDolphins=calcAverage(44,23,71);
let scoreKoalas=calcAverage(65, 54,49);
console.log(scoreDolphins,scoreKoalas);

// // Question3:
const checkWinner=function(avgDolphins,avgKoalas){
  if (avgDolphins>=2*avgKoalas){
    console.log(`Dolhins wins(${avgDolphins} vs ${avgKoalas})`);
  } else if (2*avgDolphins<=avgKoalas){
    console.log(`Koalas wins(${avgKoalas} vs ${avgDolphins})`);
  } else {
    console.log(`No team wins.`)
  }
}
checkWinner(scoreDolphins,scoreKoalas); //calling function

// // Question4:
// // Test data 2
scoreDolphins=calcAverage(85, 54, 41);
scoreKoalas=calcAverage(23, 34, 27);
checkWinner(scoreDolphins,scoreKoalas);


/////////////////////////////////////////
/////////Introduction to Arrays//////////
const friend1='Leonard';
const friend2='Myron';
const friend3='Osmond';

const friends=['Leonard','Myron','Osmond']; //string, use [] literal syntax put them into array
console.log(friends); //return: (3) ['Leonard', 'Myron', 'Osmond']

const years=new Array(1991,1984,2008,2020) //can contain any type of data, we use Array function to create it
console.log(years);  //return: (4) [1991, 1984, 2008, 2020]
console.log(friends[0]); //slicing,return:Leonard
console.log(friends.length);//the exact element numbers in array,not zero base return:3.
console.log(friends[friends.length-1]); //return:Osmond

friends[2]='Patsy';
console.log(friends[2]);//replace the value of output

const doris=['Qiuting Wang', 2022-2000, 'Data Science', friends] //we can put an array in another array.it contains all relevant information
console.log(doris);

// Exercise:
const calcAge=function(birthYear){
  return 2022-birthYear;
}
const year=[1990,1967,2002,2010,2018];
const age01=calcAge(year[0]);
const age02=calcAge(year[1]);
const age03=calcAge(year[2]);
const age04=calcAge(year[3]);
const age05=calcAge(year[4]);
console.log(age01,age02,age03,age04,age05);
const ages=[age01,age02,age03,age04,age05];
console.log(ages);//return:5) [32, 55, 20, 12, 4]0: 321: 552: 203: 124: 4 length: 5[[Prototype]]: Array(0)

/////////////////////////////////////////
/////////Basic Array Operations//////////
const friends=['Leonard','Myron','Osmond'];
// push method adds elements to the end of an array
const newLength=friends.push('Randolph');
console.log(friends);//return:(4) ['Leonard', 'Myron', 'Osmond', 'Randolph']
console.log(newLength);//return:4

//Unshift: Add the element at the beginning of an array
friends.unshift('Valentine');
console.log(friends);//return:(5) ['Valentine', 'Leonard', 'Myron', 'Osmond', 'Randolph']

//Pop:Remove the last element
friends.pop();
console.log(friends);//(4) ['Valentine', 'Leonard', 'Myron', 'Osmond']

//Shift: remove the first element
friends.shift();
console.log(friends);//return:(3) ['Leonard', 'Myron', 'Osmond']

// indexOf: return the index position number of elements
console.log(friends.indexOf('Myron'));//return:1
console.log(friends.indexOf('Valentine'));//return:-1

// includes:return true<--if the element is in array; false<--if the element is not in array. 
// It is strict equally, if it is a number in original array, string includes return false.(type coercion)
console.log(friends.includes('Myron'));//return:true
console.log(friends.includes('Valentine'));//return:false

if (friends.includes('Myron')){
  console.log('You have a friend called Myron.');
}

///////////////////////////////////////
///////////Coding Challenge #2/////////
/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array)
*/
// Question1:
const calcTip=function(bill){
  return bill>=50 && bill<=300 ? bill*0.15:
  bill*0.20;
}
// Another way use arrow function:
const calcTip=bill=> bill>=50 && bill<=300 ? bill*0.15:
bill*0.20;

// Question2:
const bills=[125,555,44];

// Question3:
const tip=[calcTip(bills[0]),calcTip(bills[1]),calcTip(bills[2])];
console.log(bills,tip); //return:(3) [125, 555, 44] (3) [18.75, 111, 8.8]

// Question4:
const total=[tip[0]+bills[0],tip[1]+bills[1],tip[2]+bills[2]];
console.log(total);//return:[143.75, 666, 52.8]


//////////////////////////////////////////
//////////Introduction to Objects/////////
// define key value pairs,give each of value in array a name(property)
// the order of object is not importmant at all;While in array, the order is important!(Slicing and Indexing). Use object for unstructure data
const doriswang={         //create object use {}
  name:'QiutingWang',
  myAge:2022-2000,
  jobTitle:'Machine Learning Engineer(MLE)',
  closeFriends:['Valentine', 'Leonard', 'Myron', 'Osmond', 'Randolph']
};


//////////////////////////////////////////
//////////Dot VS Bracket Notation/////////
//how to retrieve data and change data from object
const doriswang={         
  firstName:'Qiuting',
  lastName:'Wang',
  myAge:2022-2000,
  jobTitle:'Machine Learning Engineer(MLE)',
  closeFriends:['Valentine', 'Leonard', 'Myron', 'Osmond', 'Randolph']
};
console.log(doriswang);//{firstName: 'Qiuting', lastName: 'Wang', myAge: 22, jobTitle: 'Machine Learning Engineer(MLE)', closeFriends: Array(5)}
// // Slicing
console.log(doriswang.firstName);//return:Qiuting
console.log(doriswang['firstName']);//we can do some operations in this way.Examples as follow:

const nameKey='Name';
console.log(doriswang['first'+nameKey]); //Qiuting. The computed property name
console.log(doriswang['last'+ nameKey]);  //Wang. In square breaket,we can put any expression here. The same thing is not work with dot method.

const interestedIn=prompt('What do you want to know about Doris? Choose between firstName,lastName,myAge,jobTitle,closeFriends') //build in function,write the string, create a popup window with a input field.
console.log(doriswang[interestedIn]);//the asking box emerges, input closeFriends, return:(5) ['Valentine', 'Leonard', 'Myron', 'Osmond', 'Randolph']

if(doriswang[interestedIn]){
  console.log(doriswang[interestedIn]);
}else{
  console.log('Wrong requests! Plz choose between firstName,lastName,myAge,jobTitle,closeFriends.');
}

// //add new property to object
doriswang.location='China';
doriswang['twitter']='@Qiuting_Doris';
console.log(doriswang);

//////////////////////////////////////////
///////////////Object Method/////////////
const doriswang={         
  firstName:'Qiuting',
  lastName:'Wang',
  birthYear:2000, //number
  jobTitle:'Machine Learning Engineer(MLE)', //string
  closeFriends:['Valentine', 'Leonard', 'Myron', 'Osmond', 'Randolph'], //array
  hasDriverLicense:false, //boolean

  // calcAge:function(birthYear){  //function
  //   return 2022-birthYear;
  // }
  calcAge:function(){   //this way we call the birtYear in object we have assigned value before, in the bracket we do not need to write anything.
    console.log(this); //return:{firstName: 'Qiuting', lastName: 'Wang', birthYear: 2000, jobTitle: 'Machine Learning Engineer(MLE)', closeFriends: Array(5), …}
    return 2022-this.birthYear; //this points to doriswang本函数
  },
  getSummary:function(){
    return `${this.firstName} is a ${this.calcAge()}-year old ${this.jobTitle}, and she has ${this.hasDriverLicense ? 'a':'no'} driver's license.`
  }
};
console.log(doriswang['calcAge'](2000)); //this time calcAge treated as a string, use a braket to extract it
console.log(doriswang.getSummary()); //return:Qiuting is a 22-year old Machine Learning Engineer(MLE), and she has no driver's license.


///////////////////////////////////////
//////////Coding Challenge #3/////////
/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
*/
// Question1:
const mark={
  fullName:'Mark Miller',
  mass:78,
  height:1.69
}
const John={
  fullName:'John Smith',
  mass:92,
  height:1.95
}

// Question2:
const mark={
  fullName:'Mark Miller',
  mass:78,
  height:1.69,
  calcBMI:function(){
    this.bmi=this.mass/this.height**2;
    return this.bmi;
  }
};
const john={
  fullName:'John Smith',
  mass:92,
  height:1.95,
  calcBMI:function(){
    this.bmi=this.mass/this.height**2;
    return this.bmi;
  }
};
mark.calcBMI();
john.calcBMI();
console.log(mark.bmi,john.bmi); //27.309968138370508 24.194608809993426

// Question3:
if (mark.bmi>john.bmi){
  console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`);
}else{
  console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`);
} //Mark Miller's BMI (27.309968138370508) is higher than John Smith's BMI (24.194608809993426)

///////////////////////////////////////
/////////Iteration and Loop///////////
//for loop keeps running if the condition is true. The condition in bracket is counter.variableName:rep stands for repetition
for(let rep=1; rep<=10; rep=rep+1){  //Model:for(let variableName&startPoint; endCondition; changeIterationForm){...}
  console.log(`Lifting weights repepition ${rep} 🏋🏼‍♀️ `);
}
// return:
// Lifting weights repepition 1 🏋🏼‍♀️ 
// Lifting weights repepition 2 🏋🏼‍♀️ 
// Lifting weights repepition 3 🏋🏼‍♀️ 
// Lifting weights repepition 4 🏋🏼‍♀️ 
// Lifting weights repepition 5 🏋🏼‍♀️ 
// Lifting weights repepition 6 🏋🏼‍♀️ 
// Lifting weights repepition 7 🏋🏼‍♀️ 
// Lifting weights repepition 8 🏋🏼‍♀️ 
// Lifting weights repepition 9 🏋🏼‍♀️ 
// Lifting weights repepition 10 🏋🏼‍♀️ 

////////////////////////////////////////////////////////////
/////////Looping Arrays, Breaking, and Continuing///////////
const doris=[
  'Qiuting Wang', 
  2022-2000, 
  'Data Science', 
  ['Valentine', 'Leonard', 'Myron', 'Osmond', 'Randolph'],
  true
];
const types=[];
for(let i=0; i<doris.length ;i++){  
  //reading from doris array
  console.log(doris[i], typeof doris[i]);
  types[i]=typeof doris[i]; //filling types array
}
console.log(types);//(5) ['string', 'number', 'string', 'object', 'boolean']

// //Another example:
const years=[1991,1987,2002,2020];
const ages=[];
for (let i=0; i<years.length; i++){
  ages.push(2022-years[i]);
}
console.log(ages); //[31, 35, 20, 2]


// Continue and Break 
console.log('-----Only Strings-----');
for(let i=0; i<doris.length ;i++){ 
  if (typeof doris[i] !=='string' ) continue; //only log string in console, anything else will be ignore
  console.log(doris[i], typeof doris[i]);
}
// // return:
// // -----Only Strings-----
// //  Qiuting Wang string
// //  Data Science string

// // After the object is found, nothing else will be printed
console.log('-----Break with Number-----');
for(let i=0; i<doris.length ;i++){ 
  if (typeof doris[i] ==='number' ) break; //only log string in console, anything else will be ignore
  console.log(doris[i], typeof doris[i]);
}


////////////////////////////////////////////////////////
/////////Looping backwards and Loops in Loops///////////
const doris=[
  'Qiuting Wang', 
  2022-2000, 
  'Data Science', 
  ['Valentine', 'Leonard', 'Myron', 'Osmond', 'Randolph']
];
for (let i=doris.length-1; i>=0; i=i-1){ //倒叙呈现
  console.log(i, doris[i]);
}

//create a loop inside a loop:we have three exercises, for each of them we want to repeat 5 times
for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`-------- Starting exercise ${exercise}`);
//write the inner loop
  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♀️`);
  }
}



//////////////////////////////////
/////////The While Loop///////////
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

let rep = 1;
while (rep <= 10) {  //it will run while the condition is true. And we do not need any counter in the braket.
  // console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log('Loop is about to end...');
}

///////////////////////////////////////
/////////Coding Challenge #4//////////
/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 

4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array
*/
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(tip + bills[i]);
}
console.log(bills, tips, totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // sum = sum + arr[i];
    sum += arr[i];
  }
  return sum / arr.length;
}
console.log(calcAverage([2, 3, 7]));
console.log(calcAverage(totals));
console.log(calcAverage(tips));



