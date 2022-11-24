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
const point = document.getElementById('point');

//Variables to hold data for calculation and clearing data
let firstNum = null;
let secondNum = null;
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

point.addEventListener('click', decimal);


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
  if(!storedOperator) {
    if(lowerNum.textContent === "0") {
    //If there is "0" in the bottom part of display it gets deleted
    lowerNum.innerHTML = "";
    }
    lowerNum.textContent += e.target.textContent;
  } else {
    //Conditional to prevent string concatenation on evaluated operation
    if(parseFloat(lowerNum.textContent) === firstNum) {
      lowerNum.textContent = "";
    }
    lowerNum.textContent += e.target.textContent;
    secondNum = parseFloat(lowerNum.textContent);
  }
  
}

//Handles actual logic when and how to call operate function
function operate(e) {
  //Check for "light" reset of display so when after you hit equal sign,
  //you can then continue with another operations, taking the result of previous 
  //operation as firstNum
  if(equalSignClicked) {
    storedOperator = null;
  }
  if(!storedOperator) {
    firstNum = parseFloat(lowerNum.textContent);
    storedOperator = e.target.textContent;
    upperNum.textContent = `${firstNum} ${storedOperator}`;  
  } else {
    secondNum = parseFloat(lowerNum.textContent);
    evaluation = calculate(storedOperator, firstNum, secondNum);
    upperNum.textContent = `${evaluation} ${storedOperator}`;
    lowerNum.textContent = evaluation.toFixed(2);
    firstNum = evaluation.toFixed(2);
    storedOperator = e.target.textContent;
    upperNum.textContent = `${firstNum} ${storedOperator}`;
  }
  equalSignClicked = false;
}

//Clears all the necessary data for user to start over fresh and clean
function reset() {
  upperNum.innerHTML = "";
  lowerNum.textContent = "0";
  storedOperator = null;
  firstNum = null;
  evaluation = null;
}

//Handles logic when user hits 'equal' sign and provides visual clue when its hit
function result(e) {
  upperNum.textContent = `${firstNum} ${storedOperator} ${secondNum} ${e.target.textContent}`;
  evaluation = calculate(storedOperator, firstNum, secondNum)
  lowerNum.textContent = evaluation.toFixed(2);
  equalSignClicked = true;
}

function decimal(e) {
  secondNum += e.target.textContent;
  lowerNum.textContent = secondNum;
}