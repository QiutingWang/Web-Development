console.log("Hello World!");

const myName='Qiuting(Doris) Wang';  //myName is the variable
const h1=document.querySelector(".heading-primary");
console.log(myName);  //log the variable to console
console.log(h1);

//once we click h1, the following events in function will happen
// h1.addEventListener('click',function(){
//   h1.textContent = myName; //replace h1 to myName text content
//   h1.style.backgroundColor="red";
// //in JS, if we write 2 words together, we can not use -, instead capitalize the second leading letter
//   h1.style.padding='5rem';
// });

////////////////////////////////////////////////////////////////
//updated footer timing point automatically
const yearEl = document.querySelector(".year");
const currentYear=new Date().getFullYear();
// console.log(currentYear);
yearEl.textContent=currentYear; //change the .year class value

//////////////////////////////////////////////////////////
//Make Mobile Navigation Work
const btnNavEl=document.querySelector('.btn-mobile-nav');
const headerEl=document.querySelector('.header');
btnNavEl.addEventListener('click',function(){
  headerEl.classList.toggle("nav-open");
});   //toggle:adding and removing at the same time

//////////////////////////////////////////////////////////
//Implement Smooth Scrolling Animation 
const allLinks=document.querySelectorAll('a:link');

allLinks.forEach(function(link){
  link.addEventListener('click',function(e){
    e.preventDefault();
    const href=link.getAttribute('href');
    console.log(href);

    //scroll back to the top
    if (href=="#") window.scrollTo({
      top:0, //go back to specific position
      behavior:"smooth",
    });
    //scroll to other links
    if (href !=="#" && href.startsWith('#')) {
      const sectionEl=document.querySelector(href);
      sectionEl.scrollIntoView({behavior:"smooth"});
    } 
    //close mobile navigation
    if(link.classList.contains('main-nav-link'))
      headerEl.classList.toggle("nav-open");
  }); 
});

//////////////////////////////////////////////////////////
//Implement Sticky a Navigation Bar except Hero Section
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0]; //select the first element
    console.log(ent);
    //如果不存在intersecting，show sticky nav bar
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {// In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px", //because we set navigation bar height to 8rem
  }
);
obs.observe(sectionHeroEl);


///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

