const makeBigger = () => {
   alert('make bigger!');
let element1=document.querySelector("div"); 
element1.style.fontSize= "100px";
element1=document.querySelector("h1");
element1.style.fontSize= "100px";
};

const makeSmaller = () => {
   alert('make smaller!');
   let element2=document.querySelector("div").className="content"; 
   element2.style.fontSize= "15px";
   element2=document.querySelector("h1");
   element2.style.fontSize= "15px";
};

/*
Tips:
1. First, in the index.html file, add an onclick attribute to each button.
   The value of the attribute should be a call to the corresponding function
   (see class demos).

2. Then modify the body of the "makeBigger" and 
   "makeSmaller" functions (in between the curly braces)
   to target the body element and set it's font size.
*/
