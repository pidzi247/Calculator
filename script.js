const display = document.getElementById('display');
const upperNum = document.getElementById('upper-number');
const lowerNum = document.getElementById('lower-number');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const percent = document.getElementById('percentage')

let storedValue = 0;
let storedOperator = null;
let equalSignClicked = false;
let evaluation = null;


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

numbers.forEach(num => {
    num.addEventListener('click', updateDisplay);
});

operators.forEach(operator => {
  operator.addEventListener('click', operate);
});

equals.addEventListener('click', result);

clear.addEventListener('click', reset);

percent.addEventListener('click', percentage);


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

function reset(e) {
  upperNum.innerHTML = "";
  lowerNum.textContent = "0";
  storedOperator = null;
  storedValue = null;
  evaluation = null;
}

function result(e) {
  upperNum.textContent = `${storedValue} ${storedOperator} ${lowerNum.textContent} ${e.target.textContent}`;
  evaluation = calculate(storedOperator, storedValue, parseInt(lowerNum.textContent))
  lowerNum.textContent = evaluation;
  equalSignClicked = true;
}

function percentage(e) {
  storedValue /= 100;
}