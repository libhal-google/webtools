// const selectElement = document.getElementById('.calc-1');
// selectElement.addEventListener('change', (event) => {
//   const result = document.querySelector('.result');
//   result.textContent = `You like ${event.target.value}`;
// });

//////////////////////////////////////////////////
// 0. Preliminary Stuff
//////////////////////////////////////////////////
/// Make sure that the files actually SEE each other
//alert("Hello World!");




//////////////////////////////////////////////////
// 1. Define Variables 
//////////////////////////////////////////////////

var firstinput = 0
var secondinput = 0

//  How do access DOM (html) elements????????
//  REMEMBER THIS??? ---->  <input type="text" id="calc-1" >
const input1 = document.getElementById('calc-1');
const input2 = document.getElementById('calc-2');

//  Optional, just if we want to show math in action
const display1 = document.getElementById('display1');
const display2 = document.getElementById('display2');

//  Display the result
const result = document.getElementById('result');



//////////////////////////////////////////////////
// 2. Actual math equations
//////////////////////////////////////////////////
function Calculate(evt){
  console.log("calculate called")
  mathstuff = parseFloat(firstinput) + parseFloat(secondinput)
  result.textContent = parseFloat(mathstuff)
  return mathstuff
}



//////////////////////////////////////////////////
// 3. Define functions changing values on the webpage based on text inputs
//////////////////////////////////////////////////

function updateInput1(e){
  firstinput = parseFloat(e.target.value)
  display1.textContent = e.target.value
  Calculate()
}
function updateInput2(e){
  secondinput = parseFloat(e.target.value)
  display2.textContent = e.target.value
  Calculate()
}



//////////////////////////////////////////////////
// 4. Event Listeners (stuff that's actually listening 
//////////////////////////////////////////////////

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  display1.textContent = input1
  display2.textContent = input2
});


input1.addEventListener('change', updateInput1);
input1.addEventListener('click', updateInput1);

input2.addEventListener('change', updateInput2);
input2.addEventListener('click', updateInput2);









const queryString = window.location.search;
console.log(queryString);


