const display = document.getElementById("display");
const upperNum = document.getElementById("upperNumber");
const lowerNum = document.getElementById("lowerNumber");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const point = document.getElementById("point");
const signMinusPlus = document.getElementById("plusMinus");

let firstNum = 0;
let secondNum = null;
let storedOperator = null;
let equalSignClicked = false;
let decimalSignClicked = false;
let evaluation = null;

//EVENT LISTENER SECTION
numbers.forEach((num) => {
  num.addEventListener("click", updateDisplay);
});

operators.forEach((operator) => {
  operator.addEventListener("click", operate);
});

equals.addEventListener("click", result);

clear.addEventListener("click", reset);

point.addEventListener("click", decimal);

signMinusPlus.addEventListener("click", flipSign);

//FUNCTION SECTION
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
  if (n2 === 0) {
    lowerNum.innerHTML = "";
    return (upperNum.textContent = "You cannot divide by zero");
  }
  return n1 / n2;
}

function calculate(operator, n1, n2) {
  switch (operator) {
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

function updateDisplay(e) {
  if (upperNum.textContent === "Invalid input!") {
    upperNum.textContent = "";
  }
  if (equalSignClicked) {
    lowerNum.textContent = "";
    equalSignClicked = false;
  }
  if (!storedOperator) {
    if (lowerNum.textContent === "0") {
      //If there is "0" in the bottom part of display it gets deleted
      lowerNum.innerHTML = "";
    }
    lowerNum.textContent += e.target.textContent;
  } else {
    if (parseFloat(lowerNum.textContent) === parseFloat(firstNum)) {
      //Conditional to prevent string concatenation on already evaluated operation
      lowerNum.textContent = "";
    }
    lowerNum.textContent += e.target.textContent;
    secondNum = parseFloat(lowerNum.textContent);
  }
}

//Handles actual logic when and how to call operate function
function operate(e) {
  if (equalSignClicked) {
    storedOperator = null;
  }
  if (decimalSignClicked) {
    decimalSignClicked = false;
  }
  if (!storedOperator) {
    //If no operator was hit before, we store a numb in lower display and operator as well
    firstNum = parseFloat(lowerNum.textContent);
    storedOperator = e.target.textContent;
    upperNum.textContent = `${firstNum} ${storedOperator}`;
  } else {
    secondNum = parseFloat(lowerNum.textContent);
    if (secondNum === 0 && storedOperator === "/") {
      //Prevents dividing by zero and pops a message
      return division(firstNum, secondNum);
    }
    evaluation = calculate(storedOperator, firstNum, secondNum);
    upperNum.textContent = `${evaluation} ${storedOperator}`;
    lowerNum.textContent = roundDecimal(evaluation);
    firstNum = roundDecimal(evaluation);
    storedOperator = e.target.textContent;
    upperNum.textContent = `${firstNum} ${storedOperator}`;
  }
}

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
  if (firstNum === null || secondNum === null) {
    reset();
    return (upperNum.textContent = "Invalid input!");
  }
  if (secondNum === 0 && storedOperator === "/") {
    return division(firstNum, secondNum);
  }
  upperNum.textContent = `${firstNum} ${storedOperator} ${secondNum} ${e.target.textContent}`;
  evaluation = calculate(storedOperator, firstNum, secondNum);
  lowerNum.textContent = roundDecimal(evaluation);
  equalSignClicked = true;
}

function decimal(e) {
  if (lowerNum.textContent.includes(".")) {
    return;
  } else {
    lowerNum.textContent += e.target.textContent;
  }
}

function flipSign() {
  if (!firstNum) {
    lowerNum.textContent *= -1;
    firstNum = lowerNum.textContent;
  } else {
    lowerNum.textContent *= -1;
    secondNum = lowerNum.textContent;
  }
}

function roundDecimal(result) {
  return Math.round((result + Number.EPSILON) * 100) / 100;
}
