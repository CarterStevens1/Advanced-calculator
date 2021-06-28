let radios = document.querySelectorAll('input[type="radio"]');

let theme01 = {
  colorPrimary: "hsl(222, 26%, 31%)",
  colorScreen: "hsl(224, 36%, 15%)",
  colorKeybackground: "hsl(223, 31%, 20%)",
  colorFunctionKey: "hsl(225, 21%, 49%)",
  colorFuntionkeyShadow: "hsl(224, 28%, 35%)",
  colorRedbuttons: "hsl(6, 63%, 50%)",
  colorRedbuttonsShadow: "hsl(6, 70%, 34%)",
  colorNumbers: "hsl(30, 25%, 89%)",
  colorNumbersShadow: "hsl(28, 16%, 65%)",
  colorText: "hsl(221, 14%, 31%)",
  colorWhite: "hsl(0, 0, 100%)",
};
let theme02 = {
  colorPrimary: "hsl(0, 0%, 90%)",
  $colorScreen: "hsl(0, 0%, 93%)",
  colorKeybackground: "hsl(0, 5%, 81%))",
  colorFunctionKey: "hsl(185, 42%, 37%))",
  colorFuntionkeyShadow: "hsl(185, 58%, 25%)",
  $colorRedbuttons: "hsl(25, 98%, 40%)",
  colorRedbuttonsShadow: "hsl(25, 99%, 27%)",
  colorNumbers: "hsl(45, 7%, 89%)",
  colorNumbersShadow: "hsl(35, 11%, 61%)",
  colorText: "hsl(60, 10%, 19%))",
  colorWhite: "hsl(0, 0, 100%)",
};
let theme03 = {
  colorPrimary: "hsl(222, 26%, 31%)",
  colorScreen: "hsl(224, 36%, 15%)",
  colorKeybackground: "hsl(223, 31%, 20%)",
  colorFunctionKey: "hsl(225, 21%, 49%)",
  colorFuntionkeyShadow: "hsl(224, 28%, 35%)",
  colorRedbuttons: "hsl(6, 63%, 50%)",
  colorRedbuttonsShadow: "hsl(6, 70%, 34%)",
  colorNumbers: "hsl(30, 25%, 89%)",
  colorNumbersShadow: "hsl(28, 16%, 65%)",
  colorText: "hsl(221, 14%, 31%)",
  $colorWhite: "hsl(0, 0, 100%)",
};

let properties = [
  "$colorPrimary",
  "$colorScreen",
  "$colorKeybackground",
  "$colorFunctionKey",
  "$colorFuntionkeyShadow",
  "$colorRedbuttons",
  "$colorRedbuttonsShadow",
  "$colorNumbers",
  "$colorNumbersShadow",
  "$colorText",
  "$colorWhite",
];

radios.forEach((radio) => {
  radio.addEventListener("click", (e) => {
    let target = e.target.id;
    let check = e.target.checked;
    switch (target) {
      case "theme-1":
        setTheme(theme01);
        break;
      case "theme-2":
        setTheme(theme02);
        break;
      case "theme-3":
        setTheme(theme03);
        break;

      default:
        break;
    }
  });
});

function setTheme(theme) {
  let styleTarget = document.documentElement.style;

  properties.forEach((prop) => {
    let withOutDash = prop.slice(2);
    styleTarget.setProperty(prop, theme[`${withOutDash}`]);
  });
}

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
