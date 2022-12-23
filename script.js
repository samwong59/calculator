const STR_DIV_BY_ZERO_ERROR_MSG = "You can't divide by zero!";

const display = document.querySelector(".display");

function add(NUM_num1, NUM_num2) {
  return Number(NUM_num1) + Number(NUM_num2);
}

function subtract(NUM_num1, NUM_num2) {
  return NUM_num1 - NUM_num2;
}

function multiply(NUM_num1, NUM_num2) {
  return NUM_num1 * NUM_num2;
}

function divide(NUM_num1, NUM_num2) {
  return NUM_num1 / NUM_num2;
}

function operate(NUM_num1, NUM_num2, STR_operator) {
  switch(STR_operator) {
    case "+":
      return add(NUM_num1, NUM_num2);
    case "-":
      return subtract(NUM_num1, NUM_num2);
    case "*":
      return multiply(NUM_num1, NUM_num2);
    case "/":
      return divide(NUM_num1, NUM_num2);
    default:
      return "Invalid input!";
  }
}

document.querySelector(".clear").addEventListener("click", clearDisplay);

function clearDisplay() {
  display.textContent = "";
}

Array.from(document.querySelectorAll(".num")).forEach(numButton => {
  numButton.addEventListener("click", displayNumber);
});

function displayNumber(e) {
  const num = e.target.textContent;
  display.textContent += num;
}

Array.from(document.querySelectorAll(".operator")).forEach(operatorButton => {
  operatorButton.addEventListener("click", displayOperator);
})

function displayOperator(e) {
  const operator = e.target.textContent;
  display.textContent += ` ${operator} `;
}

document.querySelector(".equals").addEventListener("click", calculate);

function evaluateOperator(ARR_expression, STR_operator) {
  while (true) {
    const NUM_index = ARR_expression.findIndex(element => element == STR_operator);
    if (NUM_index == -1) {
      return;
    }
    const NUM_previousIndex = NUM_index - 1;
    ARR_expression.splice(NUM_previousIndex, 3, operate(ARR_expression[NUM_previousIndex], ARR_expression[NUM_index + 1], STR_operator));
  }
}

function calculate() {
  const STR_expression = display.textContent;
  const ARR_expression = STR_expression.split(" ");
  let STR_extraOperator;
  // If expression ends with another operator, operator is removed from ARR_expression andstored in STR_extraOperator so it won't be calculated but can be added to the display at the end
  if (ARR_expression[ARR_expression.length - 1] == "") {
    ARR_expression.pop();
    STR_extraOperator = ARR_expression.pop();
  }
  evaluateOperator(ARR_expression, "/");
  if (ARR_expression[0] == STR_DIV_BY_ZERO_ERROR_MSG) {
    display.textContent = ARR_expression[0];
    return;
  }
  evaluateOperator(ARR_expression, "*");
  evaluateOperator(ARR_expression, "+");
  evaluateOperator(ARR_expression, "-");
  if (ARR_expression[0] === Infinity || ARR_expression[0] === -Infinity) {
    display.textContent = STR_DIV_BY_ZERO_ERROR_MSG;
    return;
  }
  if (!STR_extraOperator) {
    display.textContent = ARR_expression[0];
    return;
  }
  display.textContent = `${ARR_expression[0]} ${STR_extraOperator} `;
  return;
}