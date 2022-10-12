////////////////////////////////////////////////////////////////
/////////Values and Variables///////////
let js="amazing"; //each row end we add ;  
if(js==="amazing") alert('JavaScript is Fun!');

console.log(40+8+23-10);
console.log('DorisWang'); //DorisWang is a value
console.log(20); //20 is a value, and value can be stored in the variables, so that we can use them over and over again

let firstName="Doris"; //declaring a variable
//////////Naming///////////
//The variable name should use camelCase notation. The lowercase start in the first word, following the uppercase first words
//Variable name can not start with a number.It can only contain number, letters, underscore, or dollar sign.Variable name can not use the reversed keywords.
//A more simple and discreptive name is better
console.log(firstName);

let myFirstJob="Programmer"; //a string
console.log(myFirstJob);

////////////////////////////////////////////////////////////////
/////////Data Types///////////
//Object and Primitive Value
//7 primitive data types:numbers,strings,boolean,undefined:value not defined yet(empty value)
let children;
//null:means empty value; Symbol:value that is unique and cannot be changed; BigInt:larger integers than the number type can hold
//JS has dynamic typing, data type is determined automatically.

/////////Code Commenting///////////
// we use double /, another way is to use /*.....*/

console.log(typeof true);  //get the type of the value
console.log(typeof 23); 
console.log(typeof 'DorisWang'); 

// we first assign a value to a variable we use let, then if we want to change the value of the variable, we just assign the value, do not need let.
let javascriptIsFun=true;
console.log(javascriptIsFun)
javascriptIsFun="Yes!"
console.log(javascriptIsFun)

/////////////////////////////////////////////////////////////////////////////
/////////Three Different Ways of Declaring Variables in JavaScript///////////
let age=21;
age=22;//we can reassign the value of age use let method

const birthYear=1991;
birthYear=1990; //this will cause an error, we can not reassign birthYear value use const method; 
//const method can not use undefined variable,eg: const job will cause error

var job="programmer";
job="datascience";  //we can mutate the variable use var method

lastName="Wang"
console.log(lastName); //js will execute without declare var/let/const, but it not a good idea, cuz it doesn't create the current scope. Instead, JS will create a property on global object.


///////////////////////////////////
/////////Basic Operators///////////

/////Math Operators/////
const now=2037;
const ageDoris=now-2000;
const ageSarah=now-2018;
console.log(ageDoris,ageSarah);//we can state multiple variables in console.log
console.log(ageDoris*2,ageDoris/2,2**3);

const fistName="Doris";
const lastName="Wang";
console.log(firstName+ " " + lastName); //+ can concate string. We create a space string this time

/////Assignment Operators/////
let x=10+5; //= sign here is an operator, the result is 15
x +=10;// x=x+10, we reassign the value of x, the result is 25
x *=4; // x=x*4, the result is 100
x++; //x=x+1, the result is 101
x--;// x=x-1, the result is 100
console.log(x);

/////Comparison Operators/////
console.log(ageDoris>ageSarah); //it will return true/false. < > >= <=
console.log(ageSarah>=18);
const isFullAge= ageSarah>=18; //store the result above

console.log(now-2000 > now-2018); //js know do operation first then do comparison, instead of take order simply from left to right

/////Operator Precedence/////
//Table References: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

let z, y;
z = y = 25 - 10 - 5; // z = y = 10, from right to left precedure
console.log(z, y);

const averageAge = (ageDoris + ageSarah) / 2;
console.log(ageDoris, ageSarah, averageAge);

///////////////////////////////////////
/////////Coding Challenge 01///////////
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
*/

//Question1
const massMark=78;
const heightMark=1.69;
const massJohn=92;
const heightJohn=1.95;
//Question2
const BMIMark=massMark/ heightMark**2;
const BMIJohn=massJohn/ heightJohn**2;
console.log(BMIMark, BMIJohn);
//Question3:
const markHigherBMI=BMIMark>BMIJohn;
console.log(markHigherBMI);

////////////////////////////////////////////////
/////////String and Template Literals///////////
const firstName='Doris';
const job="Data Science";
const birthYear=2000;
const year=2037;

const doris="I'm " + firstName +", a " + (year-birthYear) +" years old " +job+ " !"; //do not forget to use space
console.log(doris);
//The more useful way: template literals
const dorisNew=`I'm ${firstName}, a ${year-birthYear} year old ${job}!`; //${variableName}: to insert the variable in the string sentence.
console.log(dorisNew);

console.log("String with \n\
multiple \n\
lines");  
// \n\: a new line should be created, we move to the new line
console.log(`String with
multiple
lines`);  //the another way we use `...`

//////////////////////////////////////////////////////
/////////Taking Decisions:if-else Statement///////////
const age=15;
if (age>=18){
  console.log("Sarah can start driving license")
} //if the expression in () is true, then execute the content in {}
else {
  const yearsLeft=18-age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years:) `);
};

const birthYear=1991;
let century;
if (birthYear<=2000){
   century=20;
} else {
   century=21;
}
console.log(century);


///////////////////////////////////////
/////////Coding Challenge 02///////////
/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement 😉
*/
//Question1
const massMark=78;
const heightMark=1.69;
const massJohn=92;
const heightJohn=1.95;

const BMIMark=massMark/ heightMark**2;
const BMIJohn=massJohn/ heightJohn**2;
console.log(BMIMark, BMIJohn);
const markHigherBMI=BMIMark>BMIJohn;

if(BMIMark>BMIJohn){
  console.log("Mark's BMI is higher than John's!")
}else{
  console.log("John's BMI is higher than Mark's!")
};
//Question2:
if(BMIMark>BMIJohn){
  console.log(`Mark's BMI (${BMIMark}) is higher than John's(${BMIJohn})!`)
}else{
  console.log(`John's (${BMIJohn}) BMI is higher than Mark's(${BMIMark})!`)
};


////////////////////////////////////////////////
/////////Type Conversion and Coercion///////////

/////////Type Conversion////////////
const inputYear='1991';
console.log(inputYear + 18); //string, the result is 199118, we need to convert string to number

const inputYear='1991';
console.log(Number(inputYear)+18); //we convert string to number, this time 18 is automatically convert to number

console.log(Number('Doris')); //the result is NaN
console.log(typeof NaN); //the result is number

console.log(String(23)); // we state String/ Number... these data types should caplitalize the first letter, otherwise it doesn't work.
// JS can only convert data into number/string/boolean, but cannot convert into null or undefined


/////////Type Coercion////////////
// when an operator deals with two values that have different types
console.log('I am ' + 22 + ' years old')
console.log('I am ' + String(22) + ' years old')
console.log('23' / '2');
console.log('23' - '10' - 3);

let n = '1' + 1; //we get 11 as result cuz of string, distingish the difference between string addition and number addition
n = n - 1;
console.log(n);

////////////////////////////////////////////
/////////Truthy and Falsy Values////////////
// 5 Falsy Values:0,"" (empty string),undefined, null,NaN
console.log(Boolean(0));  //false
console.log(Boolean("Doris")); //true
console.log(Boolean({}));  //true
console.log(Boolean(undefined)); //false

const money=10;
if(money){
  console.log("Don't spend it all;)");
} else {
  console.log("You should get a job!");
}

let height=170;
if (height){
  console.log("YAY!Height is defined");
}else{
  console.log("Height is undefined.")
};


//////////////////////////////////////////////////////
/////////////Equality Operators:== and ===////////////
const age=18; //assign the value
if(age===18) console.log('You just became an adult:D(strict)');//=== true/false
if(age==18) console.log('You just became an adult:D(loose)'); //loose operator can make assigned value be treated as number,and also apply when assigned value is number

const favoriate=prompt("What's your favorate number?"); //store the value we put into this varibale
console.log(favoriate);// the input value is shown in console
console.log(typeof favoriate);//the result is string

if (favoriate==17){
  console.log('Cool! 17 is an amazing number!')
} else if (favoriate==7){
  console.log('7 is also a cool number')
} else{
  console.log('number is not 23 or 7')
};

if(favoriate !== 17) console.log("Why not 17?");


///////////////////////////////////////////////////
//////BOOLEAN LOGIC: and, or, not operations////////
const hasDriversLicense=true; //A
const hasGoodVision=false; //B
console.log(hasDriversLicense && hasGoodVision); //&&: and 
console.log(hasDriversLicense || hasGoodVision); //||: or
console.log(!hasDriversLicense);

const shouldDrive=hasDriversLicense && hasGoodVision;
if(shouldDrive){
  console.log("Sarah is able to drive!");
}else{
  console.log("Someone else should drive...");
}
///////
const isTired=true; //C
console.log(hasDriversLicense || hasGoodVision || isTired);

if(hasDriversLicense && hasGoodVision && !isTired){
  console.log("Sarah is able to drive!");
}else{
  console.log("Someone else should drive...");
}

///////////////////////////////////////////
/////////////Coding Challenge 3////////////
/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
*/

//Question1:
const scoreDolphins=(96+108+89)/3;
const scoreKoalas=(88+91+110)/3;
console.log(scoreDolphins,scoreKoalas);//97.66666666666667 96.33333333333333

//Question2:
if (scoreDolphins>scoreKoalas){
  console.log('Dolphins win the trophy');
} else if (scoreDolphins<scoreKoalas){
  console.log('Koalas win the trophy');
} else if (scoreDolphins===scoreKoalas){
  console.log('Both with the trophy');
}

//Question3:
const scoreDolphins=(97+112+101)/3;
const scoreKoalas=(109+95+123)/3;
console.log(scoreDolphins,scoreKoalas); //103.33333333333333 109

if (scoreDolphins>scoreKoalas && scoreDolphins>=100){
  console.log('Dolphins win the trophy');
} else if (scoreDolphins<scoreKoalas && scoreKoalas>=100){
  console.log('Koalas win the trophy');
} else if (scoreDolphins===scoreKoalas){
  console.log('Both with the trophy');
}

// Question4:
const scoreDolphins=(97+112+101)/3;
const scoreKoalas=(109+95+106)/3;
console.log(scoreDolphins,scoreKoalas); //103.33333333333333 103.33333333333333

if (scoreDolphins>scoreKoalas && scoreDolphins>=100){
  console.log('Dolphins win the trophy');
} else if (scoreDolphins<scoreKoalas && scoreKoalas>=100){
  console.log('Koalas win the trophy');
} else if (scoreDolphins===scoreKoalas && scoreDolphins>=100 && scoreKoalas>=100){
  console.log('Both with the trophy');
} else{
  console.log('No one wins the trophy');
}

//////////////////////////////////////////////////////////////////////////////////////////
///////////The switch Statement:compare one value to multiple different options///////////
const day="Tuesday";
switch(day){
  case 'Monday': //day==="Monday"
    console.log('Gymming');
    console.log('Go to coding meetup');
    break;
  case 'Tuesday':
    console.log('Dog Walking');
    break;
  case 'Wednesday':
  case 'Thursday':
    console.log('Write code examples');
    break;
  case 'Friday':
    console.log('Cooking and Preparing Diets');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('Study Computer Vision and NLP');
    break;
  default:
    console.log('Not a valid day.');
}
// // use else if statement express
if (day === 'Monday') {
  console.log('Gymming');
  console.log('Go to coding meetup');
} else if (day === 'Tuesday') {
  console.log('Dog Walking');
} else if (day === 'Wednesday' || day === 'Thursday') {
  console.log('Write code examples');
} else if (day === 'Friday') {
  console.log('Study Computer Vision and NLP');
} else if (day === 'Saturday' || day === 'Sunday') {
  console.log('Enjoy the weekend :D');
} else {
  console.log('Not a valid day!');
}

///////////////////////////////////////////////////
/////////////Statements and Expressions////////////

//Expression
3 + 4 
2000

//statement
true && false && !false

if (23 > 10) {
  const str = '23 is bigger';
}

const me = 'Doris';
console.log(`I'm ${2022 - 2000} years old ${me}`);

/////////////////////////////////////////
///The Conditional (Ternary) Operator///
const age = 22;
// age >= 18 ? console.log('I like to drink wine 🍷') : console.log('I like to drink water 💧');

const drink = age >= 18 ? 'wine 🍷' : 'water 💧';
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = 'wine 🍷';
} else {
  drink2 = 'water 💧';
}
console.log(drink2);

console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'water 💧'}`);


///////////////////////////////////////////////////
/////////////Coding Challenge 4////////////
/*
Steven wants to build a very simple tip calculator for whenever he goes eating in a resturant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.

1. Your task is to caluclate the tip, depending on the bill value. Create a variable called 'tip' for this. It's not allowed to use an if/else statement 😅 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: 'The bill was 275, the tip was 41.25, and the total value 316.25'

TEST DATA: Test for bill values 275, 40 and 430

HINT: To calculate 20% of a value, simply multiply it by 20/100 = 0.2
HINT: Value X is between 50 and 300, if it's >= 50 && <= 300 😉

*/
const bill = 430;
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);


