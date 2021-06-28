"use strict";

const calculator = {
  displaysValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { waitingForSecondOperand, displaysValue } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displaysValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displaysValue =
      displaysValue === "0" ? digit : displaysValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {
  // If the `displayValue` does not contain a decimal point
  if (!calculator.displaysValue.includes(dot)) {
    // Append the decimal point
    calculator.displaysValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displaysValue, operator } = calculator;

  const inputValue = parseFloat(displaysValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = sum(firstOperand, inputValue, operator);

    calculator.displaysValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  console.log(calculator);
}

function sum(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  } else if (operator === "x") {
    return firstOperand * secondOperand;
  }

  return secondOperand;
}

function resetCalc() {
  calculator.displaysValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const displays = document.querySelector(".display");
  displays.value = calculator.displaysValue;
}

function deleteDigit() {
  calculator.displaysValue = calculator.displaysValue.slice(0, -1);
}

updateDisplay();

const keys = document.querySelector(".button-table");
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();

    return;
  }

  if (target.classList.contains("all-clear")) {
    resetCalc();
    updateDisplay();
    return;
  }

  if (target.classList.contains("deleteD")) {
    deleteDigit(target.value);
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
