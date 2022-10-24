'use strict';
//////////////////////////////////////////////////////////////////
///////Build the first UI component----Working with Classes///////

/////Store the classes usually used in variables
const modal=document.querySelector('.modal');
const overlay=document.querySelector('.overlay');
const btnCloseModal=document.querySelector('.close-modal');
// if we just use this general name method for selecting three Show modal button(a selector matches multiple elements using querySelector method, it has limitations), as the result only the first one will be shown in console
// const btnsOpenModal=document.querySelector('.show-modal');
// console.log(btnsOpenModal);
// To ease the limitation, we use .querySelectorAll method
const btnsOpenModal=document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);
// return:NodeList(3) [button.show-modal, button.show-modal, button.show-modal]

//Writing the loop operations:
// for(let i= 0; i< btnsOpenModal.length; i++)
//   console.log(btnsOpenModal[i].textContent);
//return:Show modal 1   Show modal 2   Show modal 3
// In this case, we do not use {} to define the block, cuz if it only one line code we want to execute, the block and braces don't need to create.


/////show the hidden content when clicking with loop
// for(let i= 0; i< btnsOpenModal.length; i++)
  // btnsOpenModal[i].addEventListener('click',function(){
    // console.log('Button Clicked'); //once we click the button,the words will show in console
    // modal.classList.remove('hidden'); //show the hidden content when click the button using .classList.remove() method. Besides, in this case, we do not add dot before hidden, cuz dot is only added for querySelector().
    // overlay.classList.remove('hidden'); //when the hidden content shows, the background of original information blur
  // });

/////close the hidden content when clicking the close icon on the modal
  // btnCloseModal.addEventListener('click',function(){
  //   modal.classList.add('hidden');
  //   overlay.classList.add('hidden');
  // });

/////close the hidden content when clicking the overlay
  // overlay.addEventListener('click',function(){
  //   modal.classList.add('hidden');
  //   overlay.classList.add('hidden');
  // });

/////Another Effective way(made the code more readable and expressive)
const closeModal=function(){
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

//The same as openModal:
const openModal=function(){
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  console.log('Button Clicked');
}

for(let i= 0; i< btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click',openModal);
btnCloseModal.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);


/////Handling an "ESC" Keypress Event/////
//keyup: when we left our finger off the keybroad basically or off the key;
//keypress: fired continuously as we keep our finger on a certain key;
//keydown: fired as soon as we just press down the key;

// document.addEventListener('keyDown',function(){ //this function will effective when we press any key
//   console.log('A key is pressed');
// })
document.addEventListener('keydown',function(event){
  console.log(event.key);
  // if (event.key==='Escape'){ //if we press Escape on keybroad
  //   if(!modal.classList.contains('hidden')){ //if it doesn't contain hidden button
  //     closeModal(); 
  //   }
  // }
  // Another useful way to make code more cleaner and readable, we put the if condition together
  if (event.key==='Escape' && !modal.classList.contains('hidden')){
    closeModal();
  }
});

