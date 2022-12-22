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

// Input: string STR_expression
// Output: string STR_result
// GUI: number and operator buttons to create STR_equation. Equals button to call function

// Split STR_expression by whitespace into ARR_expression
// If ARR_expression's size is even, pop last element and store in STR_extraOperator
// Search ARR_expression for any "/" characters and store the index NUM_index
// Divide previous element of NUM_index by following element of NUM_index and store in tempResult
// splice out involved indexes and add tempResult in their place
// Search for any more division operators and repeat process
// repeat process for multiply then
// repeat process for  addition then
// repeat process for subtraction
// display ARR_expression[0] + STR_extraOperator

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
  console.log(ARR_expression);
}