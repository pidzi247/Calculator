let display = document.getElementById('display');
let numbers = document.querySelectorAll('.num');
let operators = document.querySelectorAll('.operator');

let storedValue = null;
let storedOperator = null;


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

function operate(operator, n1, n2) {
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
  operator.addEventListener('click', storeValue)
})

function updateDisplay(e) {
  if(storedValue !== null) {
    display.textContent = operate(storedOperator, parseInt(storedValue), parseInt(e.target.textContent));
  } else {
    display.textContent = e.target.textContent;
  }
}

function storeValue(e) {
  storedValue = display.textContent;
  storedOperator = e.target.textContent;
}
