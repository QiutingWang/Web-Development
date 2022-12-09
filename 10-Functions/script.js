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
  const[first, ...others] =str.split(' ');
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