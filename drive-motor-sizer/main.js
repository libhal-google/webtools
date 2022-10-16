var var_total_mass = 0;
var var_num_wheels = 0;
var var_wheel_radius = 0;
var var_linear_velocity = 0;
var var_acceleration = 0;
var var_maximum_incline = 0;
var var_operating_time = 0;
var var_efficiency = 0;

//replace with actual outputs later
var sum = 0;

//initializing variables with document elements
const input_total_mass = document.getElementById("total_mass");
const input_num_wheels = document.getElementById("num_wheels");
const input_wheel_radius = document.getElementById("wheel_rad");
const input_linear_velocity = document.getElementById("lin_velocity");
const input_acceleration = document.getElementById("acceleration");
const input_maximum_incline = document.getElementById("max_incline");
const input_operating_time = document.getElementById("op_time");
const input_efficiency = document.getElementById("efficiency");

//math in action
const display_total_mass = document.getElementById("display_total_mass");
const display_num_wheels = document.getElementById("display_num_wheels");
const display_wheel_radius = document.getElementById("display_wheel_rad");
const display_linear_velocity = document.getElementById("display_lin_velocity");
const display_acceleration = document.getElementById("display_acceleration");
const display_maximum_incline = document.getElementById("display_max_incline");
const display_operating_time = document.getElementById("display_op_time");
const display_efficiency = document.getElementById("display_efficiency");

const result = document.getElementById("result");

function Calculate(e) {
    sum = 
        parseFloat(input_total_mass.value) +
        parseFloat(input_num_wheels.value) +
        parseFloat(input_wheel_radius.value) +
        parseFloat(input_linear_velocity.value) +
        parseFloat(input_acceleration.value) +
        parseFloat(input_maximum_incline.value) +
        parseFloat(input_operating_time.value) +
        parseFloat(input_efficiency.value);

    result.textContent = sum;
    return sum;
}

//display
function updateInput_total_mass(e) {
    var_total_mass = parseFloat(e.target.value);
    display_total_mass.textContent = e.target.value;
    Calculate();
}

function updateInput_num_wheels(e) {
    var_num_wheels = parseFloat(e.target.value);
    display_num_wheels.textContent = e.target.value;
    Calculate();
}

function updateInput_wheel_radius(e) {
    var_wheel_radius = parseFloat(e.target.value);
    display_wheel_radius.textContent = e.target.value;
    Calculate();
}

function updateInput_linear_velocity(e) {
    var_lin_velocity = parseFloat(e.target.value);
    display_lin_velocity.textContent = e.target.value;
    Calculate();
}

function updateInput_acceleration(e) {
    var_acceleration = parseFloat(e.target.value);
    display_acceleration.textContent = e.target.value;
    Calculate();
}

function updateInput_maximum_incline(e) {
    var_maximum_incline = parseFloat(e.target.value);
    display_max_incline.textContent = e.target.value;
    Calculate();
}

function updateInput_operating_time(e) {
    var_operating_time = parseFloat(e.target.value);
    display_op_time.textContent = e.target.value;
    Calculate();
}

function updateInput_efficiency(e) {
    var_efficiency = parseFloat(e.target.value);
    display_efficiency.textContent = e.target.value;
    Calculate();
}

//event listeners
input_total_mass.addEventListener("change", updateInput_total_mass);
input_total_mass.addEventListener("click", updateInput_total_mass);

input_num_wheels.addEventListener("change", updateInput_num_wheels);
input_num_wheels.addEventListener("click", updateInput_num_wheels);

input_wheel_radius.addEventListener("change", updateInput_wheel_radius);
input_wheel_radius.addEventListener("click", updateInput_wheel_radius);

input_linear_velocity.addEventListener("change", updateInput_linear_velocity);
input_linear_velocity.addEventListener("click", updateInput_linear_velocity);

input_acceleration.addEventListener("change", updateInput_acceleration);
input_acceleration.addEventListener("click", updateInput_acceleration);

input_maximum_incline.addEventListener("change", updateInput_maximum_incline);
input_maximum_incline.addEventListener("click", updateInput_maximum_incline);

input_operating_time.addEventListener("change", updateInput_operating_time);
input_operating_time.addEventListener("click", updateInput_operating_time);

input_efficiency.addEventListener("change", updateInput_efficiency);
input_efficiency.addEventListener("click", updateInput_efficiency);

//URL parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const url_total_mass = new urlParams.get("total-mass");
const url_num_wheels = new urlParams.get("num-wheels");
const url_wheel_radius = new urlParams.get("wheel-radius");
const url_linear_velocity = new urlParams.get("linear-velocity");
const url_acceleration = new urlParams.get("acceleration");
const url_maximum_incline = new urlParams.get("maximum-incline");
const url_operating_time = new urlParams.get("operating-time");
const url_efficiency = new urlParams.get("efficiency");

window.addEventListener("load", (event) => {
    input_total_mass = url_total_mass;
    input_num_wheels = url_num_wheels;
    input_wheel_radius = url_wheel_radius;
    input_linear_velocity = url_linear_velocity;
    input_acceleration = url_acceleration;
    input_maximum_incline = url_maximum_incline;
    input_operating_time = url_operating_time;
    input_efficiency = url_efficiency;

    display_total_mass.textContent = url_total_mass;
    display_num_wheels.textContent = url_num_wheels;
    display_wheel_radius.textContent = url_wheel_radius;
    display_linear_velocity.textContent = url_linear_velocity;
    display_acceleration.textContent = url_acceleration;
    display_maximum_incline.textContent = url_maximum_incline;
    display_operating_time.textContent = url_operating_time;
    display_efficiency.textContent = url_efficiency;

    Calculate();
});