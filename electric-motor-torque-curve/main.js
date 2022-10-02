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

localStorage.setItem("mystuff", "blah")



/////////////////////////////////////////////////////////////////////////
// 1. Define Variables 
/////////////////////////////////////////////////////////////////////////

var firstinput = 0
var secondinput = 0
var var_no_load_torque = 0
var var_rated_torque = 0
var var_no_load_speed = 0
var var_rated_speed = 0
var var_no_load_current = 0
var var_rated_current = 0

var mathstuff = 0


/////////////////////////////////////////////////////////////////////////
// 2. Tie const values to document elements (text area and then display)
/////////////////////////////////////////////////////////////////////////
//  How to access DOM (html) elements????????
//  REMEMBER THIS??? ---->  <input type="text" id="calc-1" >

const input1 = document.getElementById('calc-1');
const input2 = document.getElementById('calc-2');
const input_no_load_torque = document.getElementById('no_load_torque')
const input_rated_torque = document.getElementById('rated_torque')
const input_no_load_speed = document.getElementById('no_load_speed')
const input_rated_speed = document.getElementById('rated_speed')
const input_no_load_current = document.getElementById('no_load_current')
const input_rated_current = document.getElementById('rated_current')

//  Optional, just if we want to show math in action
const display1 = document.getElementById('display1');
const display2 = document.getElementById('display2');
const display_no_load_torque = document.getElementById('display_no_load_torque');
const display_rated_torque = document.getElementById('display_rated_torque')
const display_no_load_speed = document.getElementById('display_no_load_speed')
const display_rated_speed = document.getElementById('display_rated_speed')
const display_no_load_current = document.getElementById('display_no_load_current')
const display_rated_current = document.getElementById('display_rated_current')

//  Display the result
const result = document.getElementById('result');



/////////////////////////////////////////////////////////////////////////
// 3.. Actual math equation
/////////////////////////////////////////////////////////////////////////

function Calculate(evt){
  //// console.log is how we check values. 
  //// input_* is referring to the textbox, in this case we're grabbing values from those textboxes on the html page
  console.log("CALCULATE CALLED ")
  console.log("input 1--->", input1.value)
  console.log("input 2--->",  input2.value)
  console.log("noloadtorque -----> ",  input_no_load_torque)
  console.log("loadspeed -----> ",  input_no_load_speed)
  console.log("ratedspeed -----> ",  input_rated_speed)
  console.log("noloadcurrent -----> ",  input_no_load_current)
  console.log("ratedcurrent -----> ",  input_rated_current)
  console.log("math stuff is", mathstuff)

  mathstuff = parseFloat(input1.value) + parseFloat(input2.value) + parseFloat(input_no_load_torque.value) + parseFloat(input_rated_torque.value) + parseFloat(input_no_load_speed.value) + parseFloat(input_rated_speed.value) + parseFloat(input_no_load_current.value) + parseFloat(input_rated_current.value)
  console.log("math calc is", mathstuff)
 // result.textContent = parseFloat(mathstuff)
  result.textContent = mathstuff
  return mathstuff
}



/////////////////////////////////////////////////////////////////////////
// 4. Define functions changing values on the webpage 
/////////////////////////////////////////////////////////////////////////

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

function updateInput_no_load_torque(e){
  var_no_load_torque = parseFloat(e.target.value)
  display_no_load_torque.textContent = e.target.value
  console.log("display no load torque ",  display_no_load_torque.textContent)
  Calculate()
}

function updateInput_rated_torque(e){
  var_rated_torque = parseFloat(e.target.value)
  display_rated_torque.textContent = e.target.value
  console.log("display no load torque ",  display_rated_torque.textContent)
  Calculate()
}


function updateInput_no_load_speed(e){
  var_no_load_speed = parseFloat(e.target.value)
  display_no_load_speed.textContent = e.target.value
  console.log("display no load torque ",  display_no_load_speed.textContent)
  Calculate()
}

function updateInput_rated_speed(e){
  var_rated_speed = parseFloat(e.target.value)
  display_rated_speed.textContent = e.target.value
  console.log("display no load torque ",  display_rated_speed.textContent)
  Calculate()
}

function updateInput_no_load_current(e){
  var_no_load_current = parseFloat(e.target.value)
  display_no_load_current.textContent = e.target.value
  console.log("display no load torque ",  display_no_load_current.textContent)
  Calculate()
}

function updateInput_rated_current(e){
  var_rated_current = parseFloat(e.target.value)
  display_rated_current.textContent = e.target.value
  console.log("display no load torque ",  display_rated_current.textContent)
  Calculate()
}





/////////////////////////////////////////////////////////////////////////
// 5. Event Listeners that detect changes fromuser input 
/////////////////////////////////////////////////////////////////////////



input1.addEventListener('change', updateInput1);
input1.addEventListener('click', updateInput1);

input2.addEventListener('change', updateInput2);
input2.addEventListener('click', updateInput2);


input_no_load_torque.addEventListener('change', updateInput_no_load_torque)
input_no_load_torque.addEventListener('click', updateInput_no_load_torque)


input_rated_torque.addEventListener('change', updateInput_rated_torque)
input_rated_torque.addEventListener('click', updateInput_rated_torque)


input_no_load_speed.addEventListener('change', updateInput_no_load_speed)
input_no_load_speed.addEventListener('click', updateInput_no_load_speed)

input_rated_speed.addEventListener('change', updateInput_rated_speed)
input_rated_speed.addEventListener('click', updateInput_rated_speed)

input_no_load_current.addEventListener('change', updateInput_no_load_current)
input_no_load_current.addEventListener('click', updateInput_no_load_current)

input_rated_current.addEventListener('change', updateInput_rated_current)
input_rated_current.addEventListener('click', updateInput_rated_current)



/////////////////////////////////////////////////////////////////////////
// 6. URL Parameters
/////////////////////////////////////////////////////////////////////////

//// https://www.sitepoint.com/get-url-parameters-with-javascript/
/// verified on Chrome and Firefox
/// Example   --->  //file:///Users/asci-blue/Workspace/webtools/electric-motor-torque-curve/index.html?voltage-rated=1&voltage-supplied=1&no-load-torque=1&rated-torque=1&no-load-speed=1&rated-speed=1&no-load-current=1&rated-current=1



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

console.log("location is", location)
console.log(urlParams)

const url_voltage_rated = urlParams.get('voltage-rated')
console.log(url_voltage_rated)

const url_voltage_supplied = urlParams.get('voltage-supplied')
console.log(url_voltage_supplied)

const url_no_load_torque = urlParams.get('no-load-torque')
console.log(url_no_load_torque)

const url_rated_torque = urlParams.get('rated-torque')
console.log(url_rated_torque)

const url_no_load_speed = urlParams.get('no-load-speed')
console.log(url_no_load_speed)

const url_rated_speed = urlParams.get('rated-speed')
console.log(url_rated_speed)

const url_no_load_current = urlParams.get('no-load-current')
console.log(url_no_load_current)

const url_rated_current = urlParams.get('rated-current')
console.log(url_rated_current)


/////////////////////////////////////////////////////////////////////////
// 7. Load from URL
/////////////////////////////////////////////////////////////////////////

window.addEventListener('load', (event) => {
  console.log('preloading?', input1);
  // load from url
  // input1.textContent = url_voltage_rated  /// only updated the text but not the input
  input1.value = url_voltage_rated
  input2.value = url_voltage_supplied
  input_no_load_torque.value = url_no_load_torque
  input_rated_torque.value = url_rated_torque
  input_no_load_speed.value = url_no_load_speed
  input_rated_speed.value = url_rated_speed
  input_no_load_current.value = url_no_load_current
  input_rated_current.value = url_rated_current

  console.log(localStorage.getItem("mystuff"))
 
  display1.textContent = url_voltage_rated;
  display2.textContent = url_voltage_supplied
  display_no_load_torque.textContent = url_no_load_torque
  display_rated_torque.textContent = url_rated_torque
  display_no_load_speed.textContent = url_no_load_speed
  display_rated_speed.textContent = url_rated_speed
  display_no_load_current.textContent = url_no_load_current
  display_rated_current.textContent = url_rated_current

  Calculate()
});



//file:///Users/asci-blue/Workspace/webtools/electric-motor-torque-curve/index.html?voltage-rated=1&voltage-supplied=1&no-load-torque=1&rated-torque=1&no-load-speed=1&rated-speed=1&no-load-current=1&rated-current=1

// file:///Users/asci-blue/Workspace/webtools/electric-motor-torque-curve/index.html?voltage-rated=67&voltage-supplied=134&no-load-torque=312&rated-torque=3&no-load-speed=12&rated-speed=1&no-load-current=1&rated-current=1

// file:///Users/asci-blue/Workspace/webtools/electric-motor-torque-curve/index.html?voltage-rated=67&voltage-supplied=1&no-load-torque=1&rated-torque=3&no-load-speed=1&rated-speed=1&no-load-current=1&rated-current=1

//file:///Users/asci-blue/Workspace/webtools/electric-motor-torque-curve/index.html?voltage-rated=1&voltage-supplied=1&no-load-torque=1&rated-torque=3&no-load-speed=1&rated-speed=1&no-load-current=1&rated-current=1
