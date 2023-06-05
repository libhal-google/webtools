//////////////////////////////////////////////////
// 0. Preliminary Stuff
//////////////////////////////////////////////////

// URL Testing (Modify the filepath for your localhost)

// Prefill All Textfields with '1'
// webtools/electric-motor-torque-curve/index.html?voltage-rated=1&voltage-supplied=1&no-load-torque=1&rated-torque=1&no-load-speed=1&rated-speed=1&no-load-current=1&rated-current=1

// Prefill All Textfields
// webtools/electric-motor-torque-curve/index.html?voltage-rated=67&voltage-supplied=134&no-load-torque=312&rated-torque=3&no-load-speed=12&rated-speed=1&no-load-current=1&rated-current=1

// Prefill a Few Textfields
// webtools/electric-motor-torque-curve/index.html?voltage-rated=1&voltage-supplied=1&no-load-torque=1&rated-torque=3&no-load-speed=1&rated-speed=1&no-load-current=1&rated-current=1

/////////////////////////////////////////////////////////////////////////
// 1. Define Variables
/////////////////////////////////////////////////////////////////////////

var var_voltage_rated = 0;
var var_voltage_supplied = 0;
var var_no_load_torque = 0;
var var_rated_torque = 0;
var var_no_load_speed = 0;
var var_rated_speed = 0;
var var_no_load_current = 0;
var var_rated_current = 0;
var var_target_torque = 0;

var mathstuff = 0;
/////////////////////////////////////////////////////////////////////////
// 2. Tie const values to document elements (text area and then display)
/////////////////////////////////////////////////////////////////////////
function execute() {
    const input_voltage_rated = parseFloat(document.getElementById("voltage_rated").value);
    const input_voltage_supplied = parseFloat(document.getElementById("voltage_supplied").value);
    const input_no_load_torque = parseFloat(document.getElementById("no_load_torque").value);
    const input_rated_torque = parseFloat(document.getElementById("rated_torque").value);
    const input_no_load_speed = parseFloat(document.getElementById("no_load_speed").value);
    const input_rated_speed = parseFloat(document.getElementById("rated_speed").value);
    const input_no_load_current = parseFloat(document.getElementById("no_load_current").value);
    const input_rated_current = parseFloat(document.getElementById("rated_current").value);
    const input_target_torque = parseFloat(document.getElementById("target_torque").value);

    //  Optional, just if we want to show math in action
    const display_voltage_rated = document.getElementById("display_voltage_rated");
    const display_voltage_supplied = document.getElementById("display_voltage_supplied");
    const display_no_load_torque = document.getElementById("display_no_load_torque");
    const display_rated_torque = document.getElementById("display_rated_torque");
    const display_no_load_speed = document.getElementById("display_no_load_speed");
    const display_rated_speed = document.getElementById("display_rated_speed");
    const display_no_load_current = document.getElementById("display_no_load_current");
    const display_target_torque = document.getElementById("display_target_torque");
    const display_rated_current = document.getElementById("display_rated_current");
    const display_max_torque = document.getElementById("display_max_torque");
    const display_max_current = document.getElementById("display_max_current");
    const display_max_power = document.getElementById("display_max_power");
    const display_limited_RPM = document.getElementById("display_limited_RPM");
    const display_limtied_Power = document.getElementById("display_limited_Power");
    const display_limited_electrical = document.getElementById("display_limited_electrical");


    // outputs
    const output_max_torque = document.getElementById("max_torque");
    const output_max_current = document.getElementById("max_current");
    const output_max_power = document.getElementById("max_power");
    const output_limited_RPM = document.getElementById("limited_RPM");
    const output_limited_Power = document.getElementById("limited_Power");
    const output_limited_electrical = document.getElementById("limited_electrical");

    /////////////////////////////////////////////////////////////////////////
    // Motor Torque Graph
    /////////////////////////////////////////////////////////////////////////
    const torqueX = [];
    const RPMY = [];
    const CurrentY = [];
    const Limited_CurrentY = [];
    const Limited_RPMY = [];

    const vratio = input_voltage_supplied / input_voltage_rated;
    const adj_rpm_min = vratio * input_rated_speed;
    const adj_rpm_max = vratio * input_no_load_speed;
    const rpmTorqueSlope = (adj_rpm_min - adj_rpm_max) / (input_rated_torque - input_no_load_torque);
    const stallTorque = -adj_rpm_max / rpmTorqueSlope;
    const torqueStep = (stallTorque) / 30;

    const adj_Current_min = Math.pow(vratio, -1) * input_no_load_current;
    const adj_Current_max = Math.pow(vratio, -1) * input_rated_current;
    const rpmCurrentSlope = (adj_rpm_min - adj_rpm_max) / (adj_Current_min - adj_Current_max);
    const stallCurrent = (adj_rpm_max / rpmCurrentSlope) - adj_Current_min;
    const currentStep = (stallCurrent) / 30;

    for (let i = 0; i <= 30; i++) {
        torqueX.push(i * torqueStep);
        RPMY.push(torqueX[i] * rpmTorqueSlope + adj_rpm_max);
        CurrentY.push(i * currentStep + adj_Current_min)
        if (torqueX[i] < input_target_torque) {
            Limited_RPMY.push(RPMY[i]);
            Limited_CurrentY.push(CurrentY[i]);
        } else {
            Limited_RPMY.push(RPMY[i] * (input_target_torque / torqueX[i]));
            Limited_CurrentY.push(CurrentY[i] * (input_target_torque / torqueX[i]));
        }

    }

    GRAPH = document.getElementById('Motor_Torque');
    data = [
        {
            type: 'scatter',
            x: torqueX,
            y: RPMY,
            marker: {
                color: 'rgb(25,118,210)'
            },
            name: 'RPM'


        },

        {
            type: 'scatter',
            x: torqueX,
            y: CurrentY,
            marker: {
                color: 'rgb(255,0,0)'
            },
            name: 'Current'

        },

        {
            type: 'scatter',
            x: torqueX,
            y: Limited_CurrentY,
            marker: {
                color: 'rgb(29,131,72)'
            },
            name: 'Limited Current'

        },

        {
            type: 'scatter',
            x: torqueX,
            y: Limited_RPMY,
            marker: {
                color: 'rgb(255,184,28)'
            },
            name: 'Limited RPM'
        }


    ];

    layout = {
        title: 'RPM / Current vs. Torque',
        xaxis: {
            title: 'Torque'
        },
        yaxis: {
            title: 'RPM/Current'
        },
        margin: {
            autoexpand: true
        }



    }

    Plotly.newPlot(GRAPH, data, layout);

    /////////////////////////////////////////////////////////////////////////
    // Output calculations
    /////////////////////////////////////////////////////////////////////////

    output_max_torque.textContent = Math.round(torqueX[torqueX.length - 1] * 100) / 100;
    output_max_current.textContent = Math.round(CurrentY[CurrentY.length - 1] * 100) / 100;
    output_max_power.textContent = (Math.pow(vratio * input_no_load_speed, 2) * (input_rated_torque - input_no_load_torque)) / (4 * vratio * (input_no_load_speed - input_rated_speed));
    output_limited_RPM.textContent = rpmTorqueSlope * input_target_torque + adj_rpm_max;
    output_limited_Power.textContent = input_voltage_supplied * rpmCurrentSlope * input_target_torque + adj_Current_min;

}

/////////////////////////////////////////////////////////////////////////
// 4. Define functions changing values on the webpage
/////////////////////////////////////////////////////////////////////////

function updateInput_voltage_rated(e) {
    var_voltage_rated = parseFloat(e.target.value);
    display_voltage_rated.textContent = e.target.value;
    Calculate();
}

function updateInput_voltage_supplied(e) {
    var_voltage_supplied = parseFloat(e.target.value);
    display_voltage_supplied.textContent = e.target.value;
    Calculate();
}

function updateInput_no_load_torque(e) {
    var_no_load_torque = parseFloat(e.target.value);
    display_no_load_torque.textContent = e.target.value;
    console.log("display no load torque ", display_no_load_torque.textContent);
    Calculate();
}

function updateInput_rated_torque(e) {
    var_rated_torque = parseFloat(e.target.value);
    display_rated_torque.textContent = e.target.value;
    console.log("display no load torque ", display_rated_torque.textContent);
    Calculate();
}

function updateInput_no_load_speed(e) {
    var_no_load_speed = parseFloat(e.target.value);
    display_no_load_speed.textContent = e.target.value;
    console.log("display no load torque ", display_no_load_speed.textContent);
    Calculate();
}

function updateInput_rated_speed(e) {
    var_rated_speed = parseFloat(e.target.value);
    display_rated_speed.textContent = e.target.value;
    console.log("display no load torque ", display_rated_speed.textContent);
    Calculate();
}

function updateInput_no_load_current(e) {
    var_no_load_current = parseFloat(e.target.value);
    display_no_load_current.textContent = e.target.value;
    console.log("display no load torque ", display_no_load_current.textContent);
    Calculate();
}

function updateInput_rated_current(e) {
    var_rated_current = parseFloat(e.target.value);
    display_rated_current.textContent = e.target.value;
    console.log("display no load torque ", display_rated_current.textContent);
    Calculate();
}

function updateInput_target_torque(e) {
    var_target_torque = parseFloat(e.target.value);
    display_target_torque.textContent = e.target.value;
    // console.log("display no load torque ", display_rated_current.textContent);
    Calculate();
}

/////////////////////////////////////////////////////////////////////////
// 5. Event Listeners that detect changes fromuser input
/////////////////////////////////////////////////////////////////////////

input_voltage_rated.addEventListener("change", updateInput_voltage_rated);
input_voltage_rated.addEventListener("click", updateInput_voltage_rated);

input_voltage_supplied.addEventListener("change", updateInput_voltage_supplied);
input_voltage_supplied.addEventListener("click", updateInput_voltage_supplied);

input_no_load_torque.addEventListener("change", updateInput_no_load_torque);
input_no_load_torque.addEventListener("click", updateInput_no_load_torque);

input_rated_torque.addEventListener("change", updateInput_rated_torque);
input_rated_torque.addEventListener("click", updateInput_rated_torque);

input_no_load_speed.addEventListener("change", updateInput_no_load_speed);
input_no_load_speed.addEventListener("click", updateInput_no_load_speed);

input_rated_speed.addEventListener("change", updateInput_rated_speed);
input_rated_speed.addEventListener("click", updateInput_rated_speed);

input_no_load_current.addEventListener("change", updateInput_no_load_current);
input_no_load_current.addEventListener("click", updateInput_no_load_current);

input_rated_current.addEventListener("change", updateInput_rated_current);
input_rated_current.addEventListener("click", updateInput_rated_current);

input_target_torque.addEventListener("change", updateInput_target_torque);
input_target_torque.addEventListener("click", updateInput_target_torque);

/////////////////////////////////////////////////////////////////////////
// 6. URL Parameters
/////////////////////////////////////////////////////////////////////////

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

console.log("location is", location);
console.log(urlParams);

const url_voltage_rated = urlParams.get("voltage_rated");
console.log(url_voltage_rated);

const url_voltage_supplied = urlParams.get("voltage_supplied");
console.log(url_voltage_supplied);

const url_no_load_torque = urlParams.get("no_load_torque");
console.log(url_no_load_torque);

const url_rated_torque = urlParams.get("rated_torque");
console.log(url_rated_torque);

const url_no_load_speed = urlParams.get("no_load_speed");
console.log(url_no_load_speed);

const url_rated_speed = urlParams.get("rated_speed");
console.log(url_rated_speed);

const url_no_load_current = urlParams.get("no_load_current");
console.log(url_no_load_current);

const url_rated_current = urlParams.get("rated_current");
console.log(url_rated_current);

const url_target_torque = urlParams.get("target_torque");

/////////////////////////////////////////////////////////////////////////
// 7. Load from URL
/////////////////////////////////////////////////////////////////////////

window.addEventListener("load", (event) => {
    console.log("preloading?", input_voltage_rated);
    // load from url
    input_voltage_rated = url_voltage_rated;
    input_voltage_supplied = url_voltage_supplied;
    input_no_load_torque = url_no_load_torque;
    input_rated_torque = url_rated_torque;
    input_no_load_speed = url_no_load_speed;
    input_rated_speed = url_rated_speed;
    input_no_load_current = url_no_load_current;
    input_rated_current = url_rated_current;
    input_target_torque = url_target_torque;

    display_voltage_rated.textContent = url_voltage_rated;
    display_voltage_supplied.textContent = url_voltage_supplied;
    display_no_load_torque.textContent = url_no_load_torque;
    display_rated_torque.textContent = url_rated_torque;
    display_no_load_speed.textContent = url_no_load_speed;
    display_rated_speed.textContent = url_rated_speed;
    display_no_load_current.textContent = url_no_load_current;
    display_rated_current.textContent = url_rated_current;
    display_target_torque.textContent = url_target_torque;

    execute();
});
