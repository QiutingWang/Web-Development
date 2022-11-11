'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //indexing
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    }
  }, 
  orderDelivery: function({
    starterIndex=1,
     mainIndex=0, 
     time='20:00', 
     address}){
    console.log(`Order Recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} and ${time}.`);
  },
  orderPasta:function(ing1, ing2, ing3){
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`);
  },
  orderPizza:function(mainIngredient,...otherIngredients){
    console.log(mainIngredient),
    console.log(otherIngredients)
  },
};

//////////////////////////////
/////Destructuring Arrays/////
// Destructuring: break a complex data structure down into a smaller data structure like variable
const array=[2,3,4];
const a=array[0];
const b=array[1];
const c=array[2];

const [x,y,z]=array; //the destructuring assignment, the right side is where we want to destructure
console.log(x,y,z); //return: 2 3 4
console.log(array); //return:[2, 3, 4]

const [first,second]=restaurant.categories;
console.log(first,second); //return:Italian Pizzeria

let [main, ,secondary]=restaurant.categories; //if we add a space and separate by comma, it will automatically jump one element in original structure.
console.log(main,secondary); //return:Italian Vegetarian

///// Switch Variables
const temp=main;
main=secondary;
secondary=temp;
console.log(main,secondary); //return:Vegetarian Italian
[main,secondary]=[secondary,main];
console.log(main,secondary); //return:Vegetarian Italian

/////Recieve two return values from a function
const [starter,mainCourse]=restaurant.order(2,0); 
console.log(starter,mainCourse); //return:GarlicBread Pizza

/////Deal with nested array: one array inside another
const nested=[2,4,[5,6]];
const [i, ,j]=nested; 
console.log(i,j); //return: 2  [5, 6]

//get all individual values
const [l, ,[m, n]]=nested; //destructuring inside destructuring
console.log(l, m, n); //return:2 5 6

// Default values, it is useful when we get data from API
const [p=1, q=1, r=1]=[8,9];
console.log(p,q,r); //return:8 9 1

////////////////////////////////
/////Destructuring Objects/////
//we use {} to destructure objects and just specify the name of properties, the order of the objects is not matter
const {name, openingHours, categories}=restaurant;
console.log(name, openingHours, categories);
// // return:Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

/////make the name of variable be different from the property name
const {name:restaurantName, openingHours:hours, categories:tags}=restaurant;
console.log(restaurantName,hours,tags);
// return:Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

/////set the default value
const {menu=[], starterMenu: starters=[]} =restaurant//use = to define default menu
console.log(menu, starters); 
// return: []  ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

/////Mutating Variables
let a=111;
let b=999;
const object={a:23,b:7,c:14};
({a,b}=object);  //without bracket, it is a code block,returning error with equal sign to assign the value
console.log(a,b); //return: 23 7

/////Nested Object
const {fri}=openingHours;
console.log(fri); //return:{open: 11, close: 23}

const {fri:{open:o, close:c}}=openingHours;
console.log(o,c); //return:11 23

restaurant.orderDelivery({
  time:'19:10',
  address:'Beal Rd, Calipatria, CA 92233',
  mainIndex: 2,
  starterIndex: 2
});
// return:Order Recieved! Garlic Bread and Risotto will be delivered to Beal Rd, Calipatria, CA 92233 and 19:10
restaurant.orderDelivery({
  address:'Beal Rd, Calipatria, CA 92233',
  starterIndex:1
}); //with default value
// return: Order Recieved! Bruschetta and Pizza will be delivered to Beal Rd, Calipatria, CA 92233 and 20:00

////////////////////////////
/////Spread Operator.../////
//Expand an array into all its elements, unpacking all the elements at once. Works on all iterables:arrays,maps,strings,sets, but NOT objects.
const array1=[7,8,9];
const badNewArray=[1,2,array1[0],array1[1],array1[2]];
console.log(badNewArray); //return:[1, 2, 7, 8, 9]
//method with Spread operator
const newArray=[1,2,...array1]; //...: taking all elements out of the array
console.log(newArray); //return:[1, 2, 7, 8, 9]
//When we pass argument into functions
console.log(...newArray); //return:1 2 7 8 9

/////build a new array based on the original one
const newMenu=[...restaurant.mainMenu,'Gelato'];
console.log(newMenu); //return:['Pizza', 'Pasta', 'Risotto', 'Gelato']

/////Copy array
const mainMenuCopy=[...restaurant.mainMenu];
console.log(mainMenuCopy); //return:['Pizza', 'Pasta', 'Risotto']

/////Join two arrays
const menu=[...restaurant.mainMenu,...restaurant.starterMenu];
console.log(menu); //return:['Pizza', 'Pasta', 'Risotto', 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

/////work with string
const string='DorisWang';
const letters=[...string,' ','S.'];
console.log(letters); //return: ['D', 'o', 'r', 'i', 's', 'W', 'a', 'n', 'g', ' ', 'S.']
console.log(...string);//return:D o r i s W a n g

/////Real world example
const ingredients=[prompt('Let\'s make pasta! Ingredient 1?'),prompt('Ingreduent 2?'),prompt('Ingreduent 3?')]; //use \ when there exists ' representing possessive in order to prevent the accident sentence break. OR we can replace single quote with double quote
console.log(ingredients); //return:Here is your delicious pasta with aspargus, mushroom, and sausage.
restaurant.orderPasta(...ingredients); //the same as above

/////New ES2018 can apply... to objects
const newRestaurant={...restaurant,founder:'Martha Stewart', foundedIn:2000};
console.log(newRestaurant);

const restaurantCopy={...restaurant};
restaurantCopy.name='La Pergola';
console.log(restaurantCopy.name, restaurant.name); //return:La Pergola Classico Italiano

/////////////////////////////////////
/////Rest Pattern and Parameters/////
//rest: use the exact same syntax as spread, to collect multiple elements and condense them into array, packing elements into an array, opposite to spread method.
/////1)Destructuring
// REST ... on the LEFT side of =
const [a,b,...others]=[1,2,3,4,5];
console.log(a,b,others); //return:1 2 [3, 4, 5]

const [pizza, ,risotto,...otherFood]=[...restaurant.mainMenu,...restaurant.starterMenu];//other element must be the last element 
console.log(pizza,risotto,otherFood);
// return:Pizza Risotto ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

//Objects:
const {sat,...weekdays}=restaurant.openingHours;
console.log(weekdays);
// return:{thu: {…}, fri: {…}}

// //////2)Functions
const add=function(...numbers){
  let sum=0;
  for(let i=0; i<numbers.length; i++) sum+=numbers[i];
  console.log(sum);
};
add(2,3); //5
add(3,1,4,1,5); //14
add(8,2,6,4,3,7,3,9); //42

const x=[23,5,7];
add(...x); //35

restaurant.orderPizza('pineapple','squid','chicken breast','durian'); //return:['squid', 'chicken breast', 'durian']


/////////////////////////////////////
/////Short Circuiting(&& and ||)/////
// use any data type, can return any data type
/////OR
//Rule: if the first value is the TRUTHY value, it will immediately return the first truthy value
console.log(17 || 'Doris'); //return:17
console.log(''|| 'Doris'); //return: Doris Not neccessarily return the boolean value
console.log(true||0); //return: true
console.log(undefined||null); //return: null

restaurant.numGuests=23;
const guests1=restaurant.numGuests ? restaurant.numGuests:10;
console.log(guests1); //return:23
const guests2=restaurant.numGuests||10;
console.log(guests2); //23

/////AND
//Rule1: if the first value is the FALSY value, it will immediately return the first falsy value. The entire result is false.
//Rule2: in && statment, the argument is true, if all the elements are true. It will return the last value.
console.log(0 && 'Doris'); //0
console.log(17 && 'Doris'); //Doris
console.log('Hello' && 22 && null && 'Doris'); //null

if (restaurant.orderPizza){
  restaurant.orderPizza('mushroom','spinach');
}
//Another method
restaurant.orderPizza&&restaurant.orderPizza('mushroom','spinach');

/////////////////////////////////////////
/////Nullish Coalescing Operator(??)/////
//Set the default value, if the first value is falsy value
// Nullish values: null and undefined (NOT 0 or '')
restaurant.numGuests=0;
const guests=restaurant.numGuests||10;
console.log(guests); 
// Another method:
const guestsCorrect=restaurant.numGuests ?? 10;
console.log(guestsCorrect); 

//////////////////////////////////////
/////Logical Assignment Operators/////
const restaurant1={
  name:'Capri',
  numGuests:0,
};
const restaurant2={
  name:'La Pizza',
  owner:'Giovona'
};
// set default number of guests for restaurant who do not have this property
/////Use OR Assignment
restaurant1.numGuests=restaurant1.numGuests || 10;
restaurant2.numGuests=restaurant2.numGuests || 10;
// Another syntax for OR:
restaurant1.numGuests ||= 10;
restaurant2.numGuests ||= 10;
console.log(restaurant1,restaurant2);
// return:{name: 'Capri', numGuests: 10} {name: 'La Pizza', owner: 'Giovona', numGuests: 10}

/////Use Nullish Assignment
restaurant1.numGuests ??= 10;
restaurant2.numGuests ??= 10;
console.log(restaurant1,restaurant2);
// return: {name: 'Capri', numGuests: 0} {name: 'La Pizza', owner: 'Giovona', numGuests: 10}

/////Use AND Assignment
restaurant1.owner=restaurant1.owner && '<ANONYMOUS>';
restaurant2.owner=restaurant2.owner && '<ANONYMOUS>';
console.log(restaurant1,restaurant2);
// return:{name: 'Capri', numGuests: 0, owner: undefined} {name: 'La Pizza', owner: '<ANONYMOUS>', numGuests: 10}
//Another method:
restaurant1.owner &&='<ANONYMOUS>';
restaurant2.owner &&='<ANONYMOUS>';
console.log(restaurant1,restaurant2);
// return:{name: 'Capri', numGuests: 0} {name: 'La Pizza', owner: '<ANONYMOUS>'}

//////////////////////////
/////Code Challenge#1/////
/* 
We're building a football betting app (soccer for my American friends)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
*/
// 1.
const [players1, players2] = game.players;
console.log(players1, players2);

// 2.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Periscic'];

// 5.
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6.
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
};

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals('Davies', 'Muller');
printGoals(...game.scored);

// 7.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
