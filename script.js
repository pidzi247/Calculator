let display = document.getElementById('display');
let numbers = document.querySelectorAll('.num');

let displayValue = 0;



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
  return n1 / n2
}

//Operate function that takes one of the operator functions above and 
//numbers as arguments

function operate(operator, n1, n2) {
  switch(operator) {
    case "+":
      return addition(n1, n2);
      break;
  }
}

numbers.forEach(num => {
  num.addEventListener('click', updateDisplay);
});

function updateDisplay(e) {
  display.textContent = e.target.textContent;
  displayValue = e.target.textContent;
}
