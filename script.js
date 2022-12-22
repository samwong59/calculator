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

function calculate() {
  const STR_expression = display.textContent;
  const ARR_expression = STR_expression.split(" ");
  let STR_extraOperator;
  // If expression ends with another operator, operator is removed from ARR_expression andstored in STR_extraOperator so it won't be calculated but can be added to the display at the end
  if (ARR_expression[ARR_expression.length - 1] == "") {
    ARR_expression.pop();
    STR_extraOperator = ARR_expression.pop();
  }
  while (true) {
    const NUM_index = ARR_expression.findIndex(element => element == "/");
    // break when no more division operators are left in expression
    if (NUM_index == -1) {
      break;
    }
    // Evaluate division expression and place replace expression with result in ARR_expression
    const NUM_previousIndex = NUM_index - 1;
    ARR_expression.splice(NUM_previousIndex, 3, divide(ARR_expression[NUM_previousIndex], ARR_expression[NUM_index + 1]));
  }
  // Repeat division process with multiplication
  while (true) {
    const NUM_index = ARR_expression.findIndex(element => element == "*");
    if (NUM_index == -1) {
      break;
    }
    const NUM_previousIndex = NUM_index - 1;
    ARR_expression.splice(NUM_previousIndex, 3, multiply(ARR_expression[NUM_previousIndex], ARR_expression[NUM_index + 1]));
  }
  // Repeat division process with addition
    while (true) {
      const NUM_index = ARR_expression.findIndex(element => element == "+");
      if (NUM_index == -1) {
        break;
      }
      const NUM_previousIndex = NUM_index - 1;
      ARR_expression.splice(NUM_previousIndex, 3, add(ARR_expression[NUM_previousIndex], ARR_expression[NUM_index + 1]));
    }
  // Repeat division process with subtraction
  while (true) {
    const NUM_index = ARR_expression.findIndex(element => element == "-");
    if (NUM_index == -1) {
      break;
    }
    const NUM_previousIndex = NUM_index - 1;
    ARR_expression.splice(NUM_previousIndex, 3, subtract(ARR_expression[NUM_previousIndex], ARR_expression[NUM_index + 1]));
  }
  if (!STR_extraOperator) {
    display.textContent = ARR_expression[0];
    return;
  }
  display.textContent = `${ARR_expression[0]} ${STR_extraOperator} `;
  return;
}