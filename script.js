function add(NUM_num1, NUM_num2) {
  return NUM_num1 + NUM_num2;
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