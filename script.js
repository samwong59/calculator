const display = document.querySelector(".display");

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