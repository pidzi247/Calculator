/////////////////////////////////////////////////
//VARIABLES SECTION!!!
/////////////////////////////////////////////////

//DOM variables to access proper elements
const display = document.getElementById('display');
const upperNum = document.getElementById('upper-number');
const lowerNum = document.getElementById('lower-number');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const percent = document.getElementById('percentage')

//Variables to hold data for calculation and clearing data
let storedValue = 0;
let storedOperator = null;
let equalSignClicked = false;
let evaluation = null;

/////////////////////////////////////////////////
//EVENT LISTENER SECTION!!!
/////////////////////////////////////////////////

//Event listeners for numbers, operator and special signs buttons
numbers.forEach(num => {
    num.addEventListener('click', updateDisplay);
});

operators.forEach(operator => {
  operator.addEventListener('click', operate);
});

equals.addEventListener('click', result);

clear.addEventListener('click', reset);

percent.addEventListener('click', percentage);

/////////////////////////////////////////////////
//FUNCTION SECTION!!!
/////////////////////////////////////////////////

//Operator functions
function addition(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function division(n1, n2) {
  return n1 / n2;
}

//Operate function that takes one of the operator functions above and 
//numbers as arguments
function calculate(operator, n1, n2) {
  switch(operator) {
    case "+":
      return addition(n1, n2);
      break;
    case "-":
      return subtract(n1, n2);
      break;
    case "*":
      return multiply(n1, n2);
      break;
    case "/":
      return division(n1, n2);
      break;
  }
}


//Function which updates proper display sections with their respective user inputs
function updateDisplay(e) {
  if(lowerNum.textContent === "0") {
    lowerNum.innerHTML = "";
    lowerNum.textContent += e.target.textContent;
  } else {
    if(parseInt(lowerNum.textContent) === storedValue) {
      lowerNum.textContent = "";
    }
    lowerNum.textContent += e.target.textContent;
  }
  
}

//Handles actual logic when and how to call operate function
function operate(e) {
  if(equalSignClicked) {
    storedOperator = null;
  }
  if(!storedOperator) {
    storedValue = parseInt(lowerNum.textContent);
    storedOperator = e.target.textContent;
    upperNum.textContent = `${storedValue} ${storedOperator}`;  
  } else {
    evaluation = calculate(storedOperator, storedValue, parseInt(lowerNum.textContent))
    upperNum.textContent = `${evaluation} ${storedOperator}`;
    lowerNum.textContent = evaluation;
    storedValue = evaluation;
    storedOperator = e.target.textContent;
    upperNum.textContent = `${storedValue} ${storedOperator}`;
  }
  equalSignClicked = false;
}

//Clears all the necessary data for user to start over fresh and clean
function reset(e) {
  upperNum.innerHTML = "";
  lowerNum.textContent = "0";
  storedOperator = null;
  storedValue = null;
  evaluation = null;
}

//Handles logic when user hits 'equal' sign and provides visual clue when its hit
function result(e) {
  upperNum.textContent = `${storedValue} ${storedOperator} ${lowerNum.textContent} ${e.target.textContent}`;
  evaluation = calculate(storedOperator, storedValue, parseInt(lowerNum.textContent))
  lowerNum.textContent = evaluation;
  equalSignClicked = true;
}

function percentage(e) {
  storedValue /= 100;
}