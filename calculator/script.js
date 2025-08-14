const inputField = document.getElementById("inp");
const calculatorButtons = document.querySelector(".calculator-buttons");

function btn(val) {
  if (inputField.value === "0" && !isNaN(val) && val !== '.') {
    inputField.value = val;
  } else if (inputField.value === "0" && val === '.') {
    inputField.value = "0.";
  } else if (['%', '/', '*', '-', '+'].includes(val) && ['%', '/', '*', '-', '+'].includes(inputField.value.slice(-1))) {
    inputField.value = inputField.value.slice(0, -1) + val;
  } else if (val === '.' && inputField.value.split(/[\+\-\*\/]/).pop().includes('.')) {
    return;
  } else {
    inputField.value += val;
  }
}

function eq() {
  try {
    let expression = inputField.value;
    expression = expression.replace(/%/g, '/100');
    var ev = eval(expression);
    inputField.value = parseFloat(ev.toFixed(10));
  } catch {
    inputField.value = "Error";
  }
}

function C() {
  inputField.value = "0";
}
function del() {
  inputField.value = inputField.value.slice(0, -1) || "0";
}

calculatorButtons.addEventListener('click', (event) => {
  const clickedButton = event.target;
  if (!clickedButton.matches('button')) return;

  if (clickedButton.classList.contains('number') ||
      clickedButton.classList.contains('operator') ||
      clickedButton.classList.contains('decimal')) {
    btn(clickedButton.textContent);
  } else if (clickedButton.classList.contains('equals')) {
    eq();
  } else if (clickedButton.classList.contains('clear')) {
    C();
  } else if (clickedButton.classList.contains('delete-btn')) {
    del();
  }
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    btn(key);
  } else if (key === 'Enter') {
    eq();
  } else if (key === 'Backspace') {
    inputField.value = inputField.value.slice(0, -1) || "0";
  } else if (key.toLowerCase() === 'c') {
    C();
  }
});