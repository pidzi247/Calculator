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
const signMinusPlus = document.getElementById('plus-minus');

//Variables to hold data for calculation and clearing data
let firstNum = 0;
let secondNum = null;
let storedOperator = null;
let equalSignClicked = false;
let decimalSignClicked = false;
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

signMinusPlus.addEventListener('click', flipSign);


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
  if(n2 === 0) { // Check to prevent dividing a number by 0
    lowerNum.innerHTML = "";
    return upperNum.textContent = "You cannot divide by zero";
  }
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
  if(upperNum.textContent === "Invalid input!") {
    upperNum.textContent = "";
  }
  if(equalSignClicked) {
    lowerNum.textContent = "";
    equalSignClicked = false;
  }
  if(!storedOperator) {
    if(lowerNum.textContent === "0") { //If there is "0" in the bottom part of display it gets deleted
    lowerNum.innerHTML = "";
    }
    lowerNum.textContent += e.target.textContent;
  } else {
    if(parseFloat(lowerNum.textContent) === parseFloat(firstNum)) { //Conditional to prevent string concatenation on already evaluated operation
      lowerNum.textContent = "";                    
    }
    lowerNum.textContent += e.target.textContent;
    secondNum = parseFloat(lowerNum.textContent);
  }
  
}

//Handles actual logic when and how to call operate function
function operate(e) {

  if(equalSignClicked) {
    //Check for "light" reset of display so when after you hit equal sign,
    //you can then continue with another operations, taking the result of previous 
    //operation as firstNum
    storedOperator = null;
  }
  if(decimalSignClicked) {
    decimalSignClicked = false;
  }
  if(!storedOperator) {
    //If no operator was hit before, we store a numb in lower display and operator as well
    firstNum = parseFloat(lowerNum.textContent);
    storedOperator = e.target.textContent;
    upperNum.textContent = `${firstNum} ${storedOperator}`;  
  } else {
    secondNum = parseFloat(lowerNum.textContent);
    if(secondNum === 0 && storedOperator === "/") {
      return division(firstNum, secondNum);
    }
    evaluation = calculate(storedOperator, firstNum, secondNum);
    upperNum.textContent = `${evaluation} ${storedOperator}`;
    lowerNum.textContent = Math.round((evaluation + Number.EPSILON) * 100) / 100;
    firstNum = Math.round((evaluation + Number.EPSILON) * 100) / 100;
    storedOperator = e.target.textContent;
    upperNum.textContent = `${firstNum} ${storedOperator}`;
  }
}

//Clears all the necessary data for user to start over fresh and clean
function reset() {
  upperNum.innerHTML = "";
  lowerNum.textContent = "0";
  storedOperator = null;
  firstNum = 0;
  secondNum = null;
  evaluation = null;
  decimalSignClicked = false;
  equalSignClicked = false;
}

//Handles logic when user hits 'equal' sign and provides visual clue when its hit
function result(e) {
  if(firstNum === null || secondNum === null) {
    reset();
    return upperNum.textContent = "Invalid input!"
  }
  if(secondNum === 0 && storedOperator === "/") {
    return division(firstNum, secondNum);
  }
  upperNum.textContent = `${firstNum} ${storedOperator} ${secondNum} ${e.target.textContent}`;
  evaluation = calculate(storedOperator, firstNum, secondNum)
  lowerNum.textContent = Math.round((evaluation + Number.EPSILON) * 100) / 100;
  equalSignClicked = true;
}

function decimal(e) {
  if(lowerNum.textContent.includes(".")) {
    return ;
  } else {
    lowerNum.textContent += e.target.textContent;
  }
}

function flipSign() {
  if(!firstNum) {
    lowerNum.textContent *= -1;
    firstNum = lowerNum.textContent;
  } else {
    lowerNum.textContent *= -1;
    secondNum = lowerNum.textContent;
  }
}