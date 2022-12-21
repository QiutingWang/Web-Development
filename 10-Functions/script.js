'use strict';
////////////////////////////
/////Default Parameter//////
// Some parameters set by default
const bookings=[]; //create a blank array
const createBooking=function(
  flightNum, 
  numPassengers=1,  //directly set the default value in the bracket, it is ES6 way.
  price=199*numPassengers){ //It can contain any type of value. The order of parameter setting is important
  // ES5 Way:
  // numPassengers=numPassengers || 1;
  // price=price || 199;
  const booking={
    flightNum,
    numPassengers,
    price
  };
  console.log(booking);
  bookings.push(booking);
}
createBooking('TY171'); //{flightNum: 'TY171', numPassengers: 1, price: 199}
createBooking('TY171',88,234); //{flightNum: 'TY171', numPassengers: 88, price: 234}
createBooking('TY171',88); //{flightNum: 'TY171', numPassengers: 88, price: 17512}
// We cannot skip the parameter, it is all mapped correspondingly. There is a nice way to skip the default parameter with undefined
createBooking('TY171', undefined,10000); //{flightNum: 'TY171', numPassengers: 1, price: 10000}


/////////////////////////////////////////////////////////
/////How Passing Arguments Works: Value VS Reference/////
const flight='TY797';
const doris={
  name:'Doris Wang',
  passport: 123456789
}
const checkIn=function(flightNum, passenger){ 
  //change the flight number
  flightNum='TY999'; //flightNum is a completely different variable, a copy of flight outside of the function,like: const flightNum=flight;
  passenger.name='Ms. '+ passenger.name; // we pass a reference type,like: const passenger=doris. It is the same as manipulating original doris object here, cuz they both are the same object in the memory heap. Be careful to use this way.

  if (passenger.passport===123456789){
    alert('Checked in')    
  }else{
    alert('Wrong passport!')
  }
}
checkIn(flight, doris);
console.log(flight);//TY797
console.log(doris); //{name: 'Ms. Doris Wang', passport: 123456789}

const newPassport=function(person){
  person.passport=Math.trunc(Math.random()*100000000);
};
newPassport(doris);
checkIn(flight,doris); //wrong passport
// JS does not passing by reference, only passing by value


////////////////////////////////////////////////
/////First-Class and Higher-Order Functions/////
/////First-Class Function:
//functions are treated as first-class citizens, simply values, just another type of object
//we can store functions in variables or properties, pass function as arguments to other functions, return a function from another function, call methods on functions

/////Higher-Order Function:
//receive another function as an argument input(callback function), or return new function 


/////////////////////////////////////////////////
/////Functions Accepting Callback Functions/////
// Advantage: split up our code to more reusable and interconnected parts, and allow us to create obstructions, without caring so much detail, thinking at a higher level
const oneWord=function(str){
  return str.replace(/ /g,'').toLowerCase(); //write in regular expression with g flag for global and replace it with simply empty string
};
const upperFirstWord=function(str){
  const[first, ...others] =str.split(' '); //... 扩展运算符
  return [first.toUpperCase(), ...others].join(' ');
};
//Higher Order Function
const transformer=function(str, fn){
  console.log(`Original String:${str}`); 
  console.log(`Transformed String:${fn(str)}`);
  console.log(`Transformed by:${fn.name}`);
}
//input the Callback functions fn
transformer('Wishing many future successes！',upperFirstWord);
//Original String:Wishing you many future successes!
//Transformed String:WISHING many future successes！
//Transformed by:upperFirstWord
transformer('Wishing many future successes！',oneWord);
//Original String:Wishing you many future successes
//Transformed String:wishingmanyfuturesuccesses！
//Transformed by:oneWord

// With eventListener function, callback all the time
const kissMe=function(){
  console.log('💋');
}
document.body.addEventListener('click',kissMe); //if we click the body of the html file, then 💋 in console

['Doris','Amanda','Anita'].forEach(kissMe); //3 💋


///////////////////////////////////////
/////Functions Returning Functions/////
//A useful technique in Functional Programming
const greet =function(greeting){
  return function(name){
    console.log(`${greeting} ${name}.`);
  };
}
//Rewrite greet function above using arrow function. Reference:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions 
//param=>expression
const greetArr=greeting => name=> console.log(`${greeting} ${name}.`);
greetArr('Hi')('Doris'); //Hi Doris.

const greeterHi = greet('Hi!'); //the first function greet we stored in this new variable, this variable is still a function, and we can call it later
greeterHi('Doris'); //Hi! Doris.
greeterHi('Sean'); //Hi! Sean.
// Closures: complex and difficult topic. Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

//🌟Another simplified way:
greet('Hello')('Doris'); //Hello Doris. //greet('Hello') is a function, then we call it with adding ('Doris') to pass the input into argument name


////////////////////////////////////
/////The Call and Apply Methods/////
// this keyword 
const lufthansa={
  airline:'Lufthansa',
  iataCode:'LU',
  bookings:[],
  // Old way: book: function(){} in object
  book(flightNumber,passengerName){
    console.log(`${passengerName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNumber}.`); //this keyword points out lufthansa object itself
    this.bookings.push({flight:`${this.iataCode}${flightNumber}`, passengerName});
  },
};

lufthansa.book(329, 'Doris Wang'); //Doris Wang booked a seat on Lufthansa flight LU329.
console.log(lufthansa); //{airline: 'Lufthansa', iataCode: 'LU', bookings: Array(1), book: ƒ}

//Suppose add a new airplane, to reuse the part of function above, we need to name the key the same as before
const eurowings={
  airline:'Eurowings',
  iataCode:'EW',
  bookings: [],
};
const book=lufthansa.book; //store the book function in lufthansa object into a new function also called book, reusing it afterwards
// book(23, 'Solomon John'); //the regular call has problem, the problem is how to make JS know this keyword refers to what. Totally, there are 3 methods to do this: call, apply, bind.
/////Call Method:
book.call(eurowings, 235, 'Solomon John');//the first argument is what this keyword we want to point to. The later functions after the first one are all the arguments from the original function. In this case, the flight number and passenger name
// return:Solomon John booked a seat on Eurowings flight EW235.
console.log(eurowings); //{airline: 'Eurowings', iataCode: 'EW', bookings: Array(1)}
book.call(lufthansa, 244, 'Mary Cooper'); //Mary Cooper booked a seat on Lufthansa flight LU244.

const swiss={
  airline:'Swiss Airlines',
  iataCode:'SA',
  bookings:[],
}
book.call(swiss,583, 'Doris Wang');//Doris Wang booked a seat on Swiss Airlines flight SA583.
console.log(swiss); //{airline: 'Swiss Airlines', iataCode: 'SA', bookings: Array(1)}

/////Apply Method:
// Apply does not receive a list of arguments after the this keyword, instead it takes the array of the arguments. 
// The first argument is the same with call method:what this refers to.
const flightData=[583, 'Winston Thomas'];
book.apply(swiss, flightData); //Winston Thomas booked a seat on Swiss Airlines flight SA583.
console.log(swiss); //{airline: 'Swiss Airlines', iataCode: 'SA', bookings: Array(2)}
// Another Way:
book.call(swiss, ...flightData); //Winston Thomas booked a seat on Swiss Airlines flight SA583.

/////////////////////
/////Bind Method/////
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
//Bind doesn't immediately call the function, instead it returns a new function, where the this keyword is bound. It sets to any value we pass into bind.
//Syntax: .bind(thisArg,arg1,...)
//an object can borrow a method from another object.
const bookEW= book.bind(eurowings);  
const bookLU=book.bind(lufthansa);
const bookSA= book.bind(swiss);
bookEW(55, 'Abel Smith'); //return: Abel Smith booked a seat on Eurowings flight EW55.

//pass multiple arguments into bind, specify part of argument beforehand-->"partial application"
const bookEW23 = book.bind(eurowings,23);
bookEW23('Doris Wang');//Doris Wang booked a seat on Eurowings flight EW23. //In this case,we only need to pass the passenger name according to the function defined above

/////Preserving this
//use object and eventListeners with bind method
lufthansa.planes= 300;
lufthansa.buyPlane= function(){
  console.log(this);
  this.planes++; //to add a new plane once we click the button
  console.log(this.planes);
};
//we still need to use this keyword to point to lufthansa itself, but not the button in html document
//Then we should manually define what is this keyword refers to-->we use bind to return a new function
document.querySelector('.buy').addEventListener('click',lufthansa.buyPlane.bind(lufthansa)); //301

/////Function Borrowing
//Another Example: Partial Application with bind method:
const addTax= (rate, value)=> value + value*rate;
console.log(addTax(0.10, 200)); //220
//VAT=the value of the tax
const addVAT= addTax.bind(null,0.23);
console.log(addVAT(300)); //369

/////Another Way: Create a function to return one function
const addTaxRate=function(rate){
  return function(value){
    return value+ value*rate;
  }
};
const addVAT2=addTaxRate(0.23);
console.log(addVAT2(300)); //369

/////////////////////////////////////////////////////////
/////Immediately Invoked Function Expressions (IIFE)/////
//we need some functions only execute once, never again and then disappear
const runOnce= function(){
  console.log('This function will never run again!');
}
runOnce(); //This function will never run again!

/////IIFE
//references:https://developer.mozilla.org/en-US/docs/Glossary/IIFE

//add a bracket out of the statement,making it convert to an expression, treated as a grouping operator
//Avoid polluting the global namespace
(function(){
  console.log('This function will never run again!');
})(); //This function will never run again! //we add () to immediately invoke it.

/////Also work for arrow function
//First add a bracket out of the statement, then add () to call it.
(()=>console.log('This function will ALSO never run again!'))(); //This function will ALSO never run again!

//Functions create scopes, one scope does not have access to variables from an inner scope. In reverse, may have ability to achieve.Related to data encapsulation and data privacy, for protecting the variables from being accidentally overwritten by some other parts(libraries, external scripts).
//Variable declaration with let and const create the own scope in its block
{
  const isPrivate= 23;
  var notPrivate=22;
}
// console.log(isPrivate); //inaccessible
console.log(notPrivate); //22, it is accessible.


////////////////////
/////Closures🌟/////
//VE attached to the function,exactly as it was at the time and place the function is created.
//The function gives a reference to its outer scope, which preserves the scope chain throughout time.
//like a backpack that function carries around whatever it goes. This backpack has all the variables that were present in the environment where the function was created.
// We do not need to create closure manually, just need to recognize it.
//https://dmitripavlutin.com/simple-explanation-of-javascript-closures/
const secureBooking=function(){
  let passengerCount=0;
  return function(){
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  }
}

const booker= secureBooking(); //store the results in a new function called booker
//the closures close the parent's scope or over its parents variable environment. And it attached over the VE.
//Owing to the closure, the function doesn't lose connection with variables that exists at the function's birthplace.
//The closure has priority of the scope chain.
booker();//without any arguments //1 passengers
booker(); //2 passengers
//Any function always has access to the variable environment of the execution context in which the function was created.
console.dir(booker); //get the function itself: ƒ anonymous()
/////Analyzing Call Stack and Scope Chain
//code is running in a global execution context, with variable environment contains all variables in secureBooking() EC.
//the scope is the variables of secureBooking function

/////Definitions/////
/////Scope:https://www.geeksforgeeks.org/explain-scope-and-scope-chain-in-javascript/
//determines the accessibility of variables and functions at various parts in one’s own code
//what variables or functions one could access and what variables or functions one cannot access.
//Types: Global scope, Local/function scope, Block scope 
/////Scope Chain:
//Scope Chain means that one variable has a scope is used by another variable or function having another scope.

/////Call Stack
// to keep track of multiple function calls.Every time you invoke a function, it's added to the stack.
// data can be pushed and popped and follows the Last In First Out (LIFO) principle
//for memorizing which function is running right now. 

////////////////////////////////
/////More Closures Examples/////
