'use strict';

/////// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

/////// Data needed for first part of the section
// ES6 enhanced object literals 3: compute property names instead of having to write them out manually and literally. Create a new variable outside the orginial one, then use [varName[i]], similar to indexing
const weekdays=['mon','tue','wed','thu','fri','sat','sun'];
const openingHours={
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  }
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 enchanced object literals 1: abstract from the main function body to outside
  openingHours,
  // ES6 enchanced object literals 2: with slightly easier syntax, just replace funcName:function(x,y){} to funcName(x,y){}
  order(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //indexing
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

// //////////////////////////////
// /////Destructuring Arrays/////
// // Destructuring: break a complex data structure down into a smaller data structure like variable
// const array=[2,3,4];
// const a=array[0];
// const b=array[1];
// const c=array[2];

// const [x,y,z]=array; //the destructuring assignment, the right side is where we want to destructure
// console.log(x,y,z); //return: 2 3 4
// console.log(array); //return:[2, 3, 4]

// const [first,second]=restaurant.categories;
// console.log(first,second); //return:Italian Pizzeria

// let [main, ,secondary]=restaurant.categories; //if we add a space and separate by comma, it will automatically jump one element in original structure.
// console.log(main,secondary); //return:Italian Vegetarian

// ///// Switch Variables
// const temp=main;
// main=secondary;
// secondary=temp;
// console.log(main,secondary); //return:Vegetarian Italian
// [main,secondary]=[secondary,main];
// console.log(main,secondary); //return:Vegetarian Italian

// /////Recieve two return values from a function
// const [starter,mainCourse]=restaurant.order(2,0); 
// console.log(starter,mainCourse); //return:GarlicBread Pizza

// /////Deal with nested array: one array inside another
// const nested=[2,4,[5,6]];
// const [i, ,j]=nested; 
// console.log(i,j); //return: 2  [5, 6]

// //get all individual values
// const [l, ,[m, n]]=nested; //destructuring inside destructuring
// console.log(l, m, n); //return:2 5 6

// // Default values, it is useful when we get data from API
// const [p=1, q=1, r=1]=[8,9];
// console.log(p,q,r); //return:8 9 1

// ////////////////////////////////
// /////Destructuring Objects/////
// //we use {} to destructure objects and just specify the name of properties, the order of the objects is not matter
// const {name, openingHours, categories}=restaurant;
// console.log(name, openingHours, categories);
// // // return:Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

// /////make the name of variable be different from the property name
// const {name:restaurantName, openingHours:hours, categories:tags}=restaurant;
// console.log(restaurantName,hours,tags);
// // return:Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

// /////set the default value
// const {menu=[], starterMenu: starters=[]} =restaurant//use = to define default menu
// console.log(menu, starters); 
// // return: []  ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// /////Mutating Variables
// let a=111;
// let b=999;
// const object={a:23,b:7,c:14};
// ({a,b}=object);  //without bracket, it is a code block,returning error with equal sign to assign the value
// console.log(a,b); //return: 23 7

// /////Nested Object
// const {fri}=openingHours;
// console.log(fri); //return:{open: 11, close: 23}

// const {fri:{open:o, close:c}}=openingHours;
// console.log(o,c); //return:11 23

// restaurant.orderDelivery({
//   time:'19:10',
//   address:'Beal Rd, Calipatria, CA 92233',
//   mainIndex: 2,
//   starterIndex: 2
// });
// // return:Order Recieved! Garlic Bread and Risotto will be delivered to Beal Rd, Calipatria, CA 92233 and 19:10
// restaurant.orderDelivery({
//   address:'Beal Rd, Calipatria, CA 92233',
//   starterIndex:1
// }); //with default value
// // return: Order Recieved! Bruschetta and Pizza will be delivered to Beal Rd, Calipatria, CA 92233 and 20:00

// ////////////////////////////
// /////Spread Operator.../////
// //Expand an array into all its elements, unpacking all the elements at once. Works on all iterables:arrays,maps,strings,sets, but NOT objects.
// const array1=[7,8,9];
// const badNewArray=[1,2,array1[0],array1[1],array1[2]];
// console.log(badNewArray); //return:[1, 2, 7, 8, 9]
// //method with Spread operator
// const newArray=[1,2,...array1]; //...: taking all elements out of the array
// console.log(newArray); //return:[1, 2, 7, 8, 9]
// //When we pass argument into functions
// console.log(...newArray); //return:1 2 7 8 9

// /////build a new array based on the original one
// const newMenu=[...restaurant.mainMenu,'Gelato'];
// console.log(newMenu); //return:['Pizza', 'Pasta', 'Risotto', 'Gelato']

// /////Copy array
// const mainMenuCopy=[...restaurant.mainMenu];
// console.log(mainMenuCopy); //return:['Pizza', 'Pasta', 'Risotto']

// /////Join two arrays
// const menu=[...restaurant.mainMenu,...restaurant.starterMenu];
// console.log(menu); //return:['Pizza', 'Pasta', 'Risotto', 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// /////work with string
// const string='DorisWang';
// const letters=[...string,' ','S.'];
// console.log(letters); //return: ['D', 'o', 'r', 'i', 's', 'W', 'a', 'n', 'g', ' ', 'S.']
// console.log(...string);//return:D o r i s W a n g

// /////Real world example
// const ingredients=[prompt('Let\'s make pasta! Ingredient 1?'),prompt('Ingreduent 2?'),prompt('Ingreduent 3?')]; //use \ when there exists ' representing possessive in order to prevent the accident sentence break. OR we can replace single quote with double quote
// console.log(ingredients); //return:Here is your delicious pasta with aspargus, mushroom, and sausage.
// restaurant.orderPasta(...ingredients); //the same as above

// /////New ES2018 can apply... to objects
// const newRestaurant={...restaurant,founder:'Martha Stewart', foundedIn:2000};
// console.log(newRestaurant);

// const restaurantCopy={...restaurant};
// restaurantCopy.name='La Pergola';
// console.log(restaurantCopy.name, restaurant.name); //return:La Pergola Classico Italiano

// /////////////////////////////////////
// /////Rest Pattern and Parameters/////
// //rest: use the exact same syntax as spread, to collect multiple elements and condense them into array, packing elements into an array, opposite to spread method.
// /////1)Destructuring
// // REST ... on the LEFT side of =
// const [a,b,...others]=[1,2,3,4,5];
// console.log(a,b,others); //return:1 2 [3, 4, 5]

// const [pizza, ,risotto,...otherFood]=[...restaurant.mainMenu,...restaurant.starterMenu];//other element must be the last element 
// console.log(pizza,risotto,otherFood);
// // return:Pizza Risotto ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// //Objects:
// const {sat,...weekdays}=restaurant.openingHours;
// console.log(weekdays);
// // return:{thu: {…}, fri: {…}}

// // //////2)Functions
// const add=function(...numbers){
//   let sum=0;
//   for(let i=0; i<numbers.length; i++) sum+=numbers[i];
//   console.log(sum);
// };
// add(2,3); //5
// add(3,1,4,1,5); //14
// add(8,2,6,4,3,7,3,9); //42

// const x=[23,5,7];
// add(...x); //35

// restaurant.orderPizza('pineapple','squid','chicken breast','durian'); //return:['squid', 'chicken breast', 'durian']


// /////////////////////////////////////
// /////Short Circuiting(&& and ||)/////
// // use any data type, can return any data type
// /////OR
// //Rule: if the first value is the TRUTHY value, it will immediately return the first truthy value
// console.log(17 || 'Doris'); //return:17
// console.log(''|| 'Doris'); //return: Doris Not neccessarily return the boolean value
// console.log(true||0); //return: true
// console.log(undefined||null); //return: null

// restaurant.numGuests=23;
// const guests1=restaurant.numGuests ? restaurant.numGuests:10;
// console.log(guests1); //return:23
// const guests2=restaurant.numGuests||10;
// console.log(guests2); //23

// /////AND
// //Rule1: if the first value is the FALSY value, it will immediately return the first falsy value. The entire result is false.
// //Rule2: in && statment, the argument is true, if all the elements are true. It will return the last value.
// console.log(0 && 'Doris'); //0
// console.log(17 && 'Doris'); //Doris
// console.log('Hello' && 22 && null && 'Doris'); //null

// if (restaurant.orderPizza){
//   restaurant.orderPizza('mushroom','spinach');
// }
// //Another method
// restaurant.orderPizza&&restaurant.orderPizza('mushroom','spinach');

// /////////////////////////////////////////
// /////Nullish Coalescing Operator(??)/////
// //Set the default value, if the first value is falsy value
// // Nullish values: null and undefined (NOT 0 or '')
// restaurant.numGuests=0;
// const guests=restaurant.numGuests||10;
// console.log(guests); 
// // Another method:
// const guestsCorrect=restaurant.numGuests ?? 10;
// console.log(guestsCorrect); 

// //////////////////////////////////////
// /////Logical Assignment Operators/////
// const restaurant1={
//   name:'Capri',
//   numGuests:0,
// };
// const restaurant2={
//   name:'La Pizza',
//   owner:'Giovona'
// };
// // set default number of guests for restaurant who do not have this property
// /////Use OR Assignment
// restaurant1.numGuests=restaurant1.numGuests || 10;
// restaurant2.numGuests=restaurant2.numGuests || 10;
// // Another syntax for OR:
// restaurant1.numGuests ||= 10;
// restaurant2.numGuests ||= 10;
// console.log(restaurant1,restaurant2);
// // return:{name: 'Capri', numGuests: 10} {name: 'La Pizza', owner: 'Giovona', numGuests: 10}

// /////Use Nullish Assignment
// restaurant1.numGuests ??= 10;
// restaurant2.numGuests ??= 10;
// console.log(restaurant1,restaurant2);
// // return: {name: 'Capri', numGuests: 0} {name: 'La Pizza', owner: 'Giovona', numGuests: 10}

// /////Use AND Assignment
// restaurant1.owner=restaurant1.owner && '<ANONYMOUS>';
// restaurant2.owner=restaurant2.owner && '<ANONYMOUS>';
// console.log(restaurant1,restaurant2);
// // return:{name: 'Capri', numGuests: 0, owner: undefined} {name: 'La Pizza', owner: '<ANONYMOUS>', numGuests: 10}
// //Another method:
// restaurant1.owner &&='<ANONYMOUS>';
// restaurant2.owner &&='<ANONYMOUS>';
// console.log(restaurant1,restaurant2);
// // return:{name: 'Capri', numGuests: 0} {name: 'La Pizza', owner: '<ANONYMOUS>'}

// //////////////////////////
// /////Code Challenge#1/////
// /* 
// We're building a football betting app (soccer for my American friends)!

// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// 1. Create one player array for each team (variables 'players1' and 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
// */
// // 1.
// const [players1, players2] = game.players;
// console.log(players1, players2);

// // 2.
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3.
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4.
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Periscic'];

// // 5.
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// // 6.
// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length} goals were scored`);
// };

// // printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// // printGoals('Davies', 'Muller');
// printGoals(...game.scored);

// // 7.
// team1 < team2 && console.log('Team 1 is more likely to win');
// team1 > team2 && console.log('Team 2 is more likely to win');

/////////////////////////////////////
/////Looping Arrays--For-of loop/////
// const menu=[...restaurant.starterMenu,...restaurant.mainMenu];
// for (const item of menu) console.log(item); //basically,give you the current elements
// //return: 
// // Focaccia, 
// // Bruschetta, 
// // Garlic Bread, 
// // Caprese Salad, 
// // Pizza, 
// // Pasta, 
// // Risotto
// for (const item of menu.entries()){  //use .entries() method, an array iterator, we can get the current index at the same time
//   console.log(item);
// }
// // return:
// // [0, 'Focaccia']
// // [1, 'Bruschetta']
// // [2, 'Garlic Bread']
// // [3, 'Caprese Salad']
// // [4, 'Pizza']
// // [5, 'Pasta']
// // [6, 'Risotto']
// // We create a loop for print the menu
// for (const item of menu.entries()){
//   console.log(`${item[0]+1}:${item[1]}`);
// }
// // return:
// // 1:Focaccia
// // 2:Bruschetta
// // 3:Garlic Bread
// // 4:Caprese Salad
// // 5:Pizza
// // 6:Pasta
// // 7:Risotto

// // Another way to list the menu: use simple de-structuring technique
// for (const [index, element] of menu.entries()){
//   console.log(`${index+1}:${element}`);
// }

// ////////////////////////////////////
// /////Enhanced Object Literials/////
// // Since all of the content written in the main function using the object literal syntax. There are three tricks demonstrated above

// ///////////////////////////////
// /////Optional Chaining(. ?)////
// // To get the opening hours of restaurant on Monday, only check out one property
// if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open); //11
// // if the openingHours is also optional,we need to check them both. Use && to connect multiple optional property checking.
// if (restaurant.openingHours && restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);

// // ES2020 has Optional Chaining method to simply the messy codes above, using . ?
// console.log(restaurant.openingHours.mon?.open); //only if the property before question mark exists(nullish), then the property after ? will be read //return: undefined
// console.log(restaurant.openingHours?.fri?.open); // 11
// // Example
// const days=['mon','tue','wed','thu','fri','sat','sun'];
// for (const day of days){
//   const open=restaurant.openingHours[day]?.open ?? 'closed'; //we set undefined to closed with nullish coalescing operator
//   console.log(`On ${day},we open at ${open}.`);
// }
// // return:
// // On mon,we open at closed.
// // On tue,we open at closed.
// // On wed,we open at closed.
// // On thu,we open at 12.
// // On fri,we open at 11.
// // On sat,we open at 0.
// // On sun,we open at closed.

// /////Methods
// // check whether the method exists before we use it
// console.log(restaurant.order?.(0,1) ?? 'Method does not exist'); //['Focaccia', 'Pasta']
// console.log(restaurant.orderRisotto?.(0,1) ?? 'Method does not exist'); //Method does not exist

// ///// optional chainings work on arrays
// // check whether the array is empty
// const users=[
//   {name:'Doris',
//   email:'118020390@link.cuhk.edu.cn'}
// ];
// // to get the first element of the array
// console.log(users[0]?.name ?? 'User array empty'); // Doris
// // Another way without checking
// if (users.length>0) console.log(users[0].name); else console.log('User array empty'); // Doris

// //////////////////////////////////////////////////////////
// /////Looping Objects: Object Keys, Values, and Entries////
// /////Loop over property names--Keys
// const properties=Object.keys(openingHours); //use Object.keys() to get an array includes property names
// //Print how many days the restaurant open(Counting Problem)
// let openStr=`We are open on ${properties.length} days:` 
// for (const day of properties){
//   openStr+=`${day},`
// }
// console.log(openStr); //We are open on 3 days:thu,fri,sat,

// /////Property Values
// const values= Object.values(openingHours);
// console.log(values);
// // return:[{…}, {…}, {…}]
// // 0: {open: 12, close: 22}
// // 1: {open: 11, close: 23}
// // 2: {open: 0, close: 24}

// /////Property Entries
// const entries=Object.entries(openingHours);
// console.log(entries);
// // return:[Array(2), Array(2), Array(2)]
// for (const x of entries){
//   console.log(x);  //it returns each key and value. Eg: ['thu', {…}]  0 : "thu"  1: {open: 12, close: 22}
// }
// // Use direct destructure technique
// for (const [key,{open,close}] of entries){
//   console.log(`On ${key} we open at ${open} and close at ${close}.`);
// }
// // return:
// // On thu we open at 12 and close at 22.
// // On fri we open at 11 and close at 23.
// // On sat we open at 0 and close at 24.

// /////////////
// /////Set/////
// // New data structure introduced in ES6
// // Definition: a collection of unique values, without any duplications, holding any mixed data types, with irrelevant order
// const ordersSet=new Set(['Pasta','Pizza','Pizza','Risotto','Pasta','Gelato']);
// console.log(ordersSet); //return:Set(4) {'Pasta', 'Pizza', 'Risotto', 'Gelato'}
// // iterable operation
// console.log(new Set('Doris')); //return:Set(5) {'D', 'o', 'r', 'i', 's'}. The set could also be empty.
// // looping
// for (const order of ordersSet) console.log(order); 
// // how many different meals are going to be cooked.
// console.log(ordersSet.size); //4. Not use length in arrays
// // check whether a certain element is in a set, use .has() method, which is similar to includes() method in arrays
// console.log(ordersSet.has('Pizza')); //true
// console.log(ordersSet.has('Steak')); //false
// // add a new element to a set,use .add()
// ordersSet.add('Garlic Bread');
// console.log(ordersSet); //Set(5) {'Pasta', 'Pizza', 'Risotto', 'Gelato', 'Garlic Bread'}
// // .delee() an element
// ordersSet.delete('Risotto');
// console.log(ordersSet); //Set(4) {'Pasta', 'Pizza', 'Gelato', 'Garlic Bread'}
// // delete all the element at the same time
// // ordersSet.clear();
// // console.log(ordersSet); //Set(0) {size: 0}
// // retrieve values out of a set? No way! There is no need.
// // we can not simply use index method
// // Example:
// // const staff=['Waiter','Chef','Waiter','Manager','Chef','Waiter'];
// // const staffUnique=new Set(staff);
// // console.log(staffUnique); //Set(3) {'Waiter', 'Chef', 'Manager'}
// // Convert the set to array
// const staff=['Waiter','Chef','Waiter','Manager','Chef','Waiter'];
// const staffUnique=[...new Set(staff)]; //unpacked
// console.log(staffUnique); //(3) ['Waiter', 'Chef', 'Manager']
// // how many unique positions are there? (counting)
// console.log(new Set(staff).size); //3

// //////////////////////////
// /////Maps Fundamental/////
// // maps is one of the new data structures released in ES6
// // map values to keys
// // Difference between maps and objects: in maps, the key can be any data types; While, in objects, the keys are have to be strings.
// const rest=new Map(); //create an empty map
// rest.set('name','Classico Italiano');//use .set() to fill in the empty map
// rest.set(1,'Firenze,Italy');
// rest.set(2,'Lisbon, Portugal');
// console.log(rest); //Map(3) {'name' => 'Classico Italiano', 1 => 'Firenze,Italy', 2 => 'Lisbon, Portugal'}
// //Update the map use .set(),and use .get(keyName) abstract correspond values
// rest
//    .set('categories',['Italian','Pizzeria','Vegetarian','Organic']) //array
//    .set('open',11) //number
//    .set('close',23)
//    .set(true,'We are open :D') //boolen keys
//    .set(false,'We are closed :(');
// console.log(rest.get('name')); //Classico Italiano
// console.log(rest.get(true)); //We are open :D
// console.log(rest.get(1)); //Firenze,Italy
// // the power has boolean in map key
// const time=21;
// console.log(rest.get(time>rest.get('open') && time<rest.get('close'))); //We are open :D. we get true in this statement.
// console.log(rest.has('categories')); //true. Similar to object's hasOwnProperty in OOP session.
// rest.delete(2);
// // rest.clear();
// console.log(rest);
// console.log(rest.size);//7
// // Hence, there are some overlap instructions both in maps and sets.
// const array=[1,2];
// rest.set(array,'Test'); //we add an array
// rest.set(document.querySelector('h1'),'Heading');
// console.log(rest);
// console.log(rest.get(array)); //Test. If we do not construct array before update the map, just get([1,2]), it returns undefined

// ////////////////////////
// /////Maps Iteration/////
// const question=new Map([
//   ['Question','What is the best programming language in the world?'],
//   [1,'C'],
//   [2,'Java'],
//   [3,'JavaScript'],
//   ['Correct',2],
//   [true,'Correct🎉🎉'],
//   [false,'Try again!'],
// ]);
// console.log(question); //Map(7) {'Question' => 'What is the best programming language in the world?', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', 'Correct' => 2, …}
// // Convert object to map
// console.log(Object.entries(openingHours)); //(3) [Array(2), Array(2), Array(2)]
// const hoursMap=new Map(Object.entries(openingHours));
// console.log(hoursMap); //Map(3) {'thu' => {…}, 'fri' => {…}, 'sat' => {…}}
// ////Iterations:Quiz App
// console.log(question.get('Question'));
// for (const [key,value] of question){
//   if (typeof key==='number') console.log((`Answer ${key}: ${value}`));
// }
// // return:
// // What is the best programming language in the world?
// // Answer 1: C
// // Answer 2: Java
// // Answer 3: JavaScript
// // To get the answer of user, we use prompt
// const answer=Number(prompt('Your answer')); //We will compare the number input with key
// console.log(answer); //2
// console.log(question.get(question.get('Correct')===answer)); //Correct🎉🎉

// //Convert map to array: with unpacked ... method
// console.log([...question]); //(7) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]. The array of array


//////////////////////////////
/////Working with Strings/////
/////Indexing
const airline='American Airlines';
const plane='AA 1948';
console.log(plane[0]); //A
console.log(plane[3]);//1,the space also treated as a character
console.log('AA 2423'[5]); //2
console.log(airline.length); //17
console.log('AA 2423'.length); //7
//Get the position: 
console.log(airline.indexOf('r')); //3
console.log(airline.lastIndexOf('r')); //11
console.log(airline.indexOf('Airlines'));//9
console.log(airline.indexOf('airlines'));//-1.Can't be found in airline string. It is case sensitive.

/////Slice method needs the indexes as arguments
console.log(airline.slice(4)); //ican Airlines. In slice(x), x is the beginning parameter, getting the substring.
console.log(airline.slice(4,7));//ica. slice(x,y), y is the ending parameter, the end position value corresponding letter is not included in the result. The length of the extracted string= ending value-beginning value.
// extract the first word without indexing
console.log(airline.slice(0, airline.indexOf(' '))); //American
console.log(airline.slice(airline.lastIndexOf(' ')+1)); //Airlines. We add 1 the space in front of the word we extract is eliminated
console.log(airline.slice(-5)); //lines. Extract words in inverted order.

const checkMiddleSeat=function(seat){
  //B and E are  middle seat
  //Take the last letter of seat then check whether in the middle seat lists
  const s=seat.slice(-1);
  if (s==='B' || s==='E')
  console.log('You got the middle seat🙃');
  else console.log('You got lucky~😜');
}
checkMiddleSeat('11B'); //You got the middle seat🙃
checkMiddleSeat('22C'); //You got lucky~😜

////// Boxing 
//Definition: convert the string primitives to a string object with the same content.
console.log(new String('DorisWang')); //String {'DorisWang'}
console.log(typeof new String('DorisWang')); //object
console.log(typeof new String('DorisWang').slice(1)); //string. Automatically come back to string.

/////Change the Case of the String
console.log(airline.toLowerCase()); //american airlines
console.log(airline.toUpperCase()); //AMERICAN AIRLINES
// Fix capitalization in name
const passenger='dorIs WAng';
const passengerLower=passenger.toLowerCase();
const passengerCorrect=passengerLower[0].toUpperCase()+ passengerLower.slice(1,6) +passengerLower[6].toUpperCase() + passengerLower.slice(7);
console.log(passengerCorrect);//Doris Wang

// Example: check the user email, comparing emails
const email='qiutingwang0917@smile.com'; //the fake email
const loginEmail='  Qiutingwang0917@Smile.Com \n';
// convert to lowercase
const lowerEmail=loginEmail.toLowerCase();
/////trim
const trimmedEmail=lowerEmail.trim();
console.log(trimmedEmail); //qiutingwang0917@smile.com
// Another way: combine the lowercase and trim space into one step
const normalizedEmail=loginEmail.toLowerCase().trim();
console.log(normalizedEmail); //qiutingwang0917@smile.com
// Comparison
console.log(email===normalizedEmail);//true
// ES2019: trimStart and trimEnd: use to trim white space only from the start of the string, or only from the end of the string

/////Replacing: case sensitive
// .replace(original, alternative). It creates a new string.
const priceGreatBritain='277,87£'; 
const priceUnitedStates=priceGreatBritain.replace('£','$').replace(',','.');
console.log(priceUnitedStates); //277.87$

const announce='All passengers come to barding door 22. Barding door 22!'
const announceCorrect=announce.replace('door','gate');
console.log(announceCorrect); //All passengers come to barding gate 22. Barding door 22! //It only replace the first occurrence door word.
// 1.Use Regular Expression to replace all the occurrences.
console.log(announce.replace(/door/g,'gate')); //All passengers come to barding gate 22. Barding gate 22! //g means global.
// 2. Another method: .replaceAll()
console.log(announce.replaceAll('door','gate')); //All passengers come to barding gate 22. Barding gate 22!

/////Booleans: includes,startsWith,endsWith-->return: true/false
// .includes()
const plane1='Airbus87neo';
console.log(plane1.includes('A87')); //true
console.log(plane1.includes('nio')); //false
// .startsWith()
console.log(plane1.startsWith('Air')); //true
// .endsWith
console.log(plane1.endsWith('7neo'));//true

// Practice:
const checkBaggage=function(item){
  const baggage=item.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')){
    console.log('You are not allow on broad🚫');
  }else{
    console.log('Welcome abroad!😄')
  };
}
checkBaggage('I have a Laptop, some food, and a pocket Knife.'); //You are not allow on broad🚫
checkBaggage('Socks and Camera'); //Welcome abroad!😄
checkBaggage('Got some snacks and a GUN for protection.'); //You are not allow on broad🚫

/////Split
// Split a string into multiple part based on a divider string.
console.log('a+very+nice+string'.split('+')); //(4) ['a', 'very', 'nice', 'string']
//split and join
const [firstName,lastName]='Doris Wang'.split(' ');
const newName=['Ms.',firstName,lastName.toUpperCase()].join(' ');
console.log(newName);//Ms. Doris WANG
// capitalize function
const capitalizeName=function(name){
  const names=name.split(' ');
  const namesUpper=[]; 
  for (const n of names){
    namesUpper.push(n[0].toUpperCase()+n.slice(1)); //fill in the blank
  }
  console.log(namesUpper.join(' '));
}
capitalizeName('jessica ann smith'); //Jessica Ann Smith

/////Padding a string: .padStart .padEnd
// add the certain character to the string, until the string get the desired length
const message='Go to gate 22!'
console.log(message.padStart(25,'*'));//***********Go to gate 22! //fill the string length with * from left to right up to 25 character
console.log('Doris'.padStart(25,'*').padEnd(40,'*'));//********************Doris***************

// Example: only get last 4 characters 
const maskCreditCard=function(number){
  const str=number+''; //change to string
  const last=str.slice(-4);
  return last.padStart(str.length,'*');
}
console.log(maskCreditCard(4789292682679860)); //************9860
console.log(maskCreditCard('1765342687839862')); //************9862    it still work with string

/////Repeat
// repeat the same string multiple times. .repeat(number of time we want to repeat it)
const message2='Bad weather! All departures delayed...';
console.log(message2.repeat(4)); //Bad weather! All departures delayed...Bad weather! All departures delayed...Bad weather! All departures delayed...Bad weather! All departures delayed...
const planesInLine=function(n){
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}.`);
}
planesInLine(5); //There are 5 planes in line 🛩🛩🛩🛩🛩.