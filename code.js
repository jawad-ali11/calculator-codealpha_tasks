var btns = document.querySelectorAll("table button");
var lastOperatorBtn = null;
var lastClickedIsOperator = false;
var lastOperator = "";
var currentValue = "";
var result = 0;

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let display = document.getElementById("display");

        // Handle numeric buttons and the π button
        if (!isNaN(btn.textContent) || btn.textContent === "π") {
            if (btn.textContent === "π") {
                currentValue = Math.PI.toString();  // π value
            } else {
                currentValue = btn.textContent;
            }
            
            if (display.value === "0" || lastClickedIsOperator) {
                display.value = currentValue;
            } else {
                display.value += currentValue;
            }
            document.getElementById("AC").textContent = "CE";
            lastClickedIsOperator = false;
        }

        // Handle decimal point button
        else if (btn.textContent === ".") {
            if (display.value === "" || lastClickedIsOperator) {
                display.value = "0.";
            } else if (!display.value.includes(".")) {
                display.value += ".";
            }
            lastClickedIsOperator = false;
        }

        // Handle CE/AC button
        else if (btn.textContent === "CE") {
            display.value = "0";
            document.getElementById("AC").textContent = "AC";
            resetCalculator();
        }

        // Handle operator buttons (+, -, ×, ÷)
        else if (isOper(btn.textContent)) {
            if (!lastClickedIsOperator) {
                calculateResult(display.value);
                display.value = result;
            }
            lastOperator = btn.textContent;
            lastClickedIsOperator = true;

            if (lastOperatorBtn) {
                lastOperatorBtn.style.backgroundColor = "";
            }
            btn.style.backgroundColor = "#FAFAFA";
            lastOperatorBtn = btn;
        }

        // Handle power operation (x^y)
        else if (btn.classList.contains("x-power-y")) {
            if (!lastClickedIsOperator) {
                calculateResult(display.value);
                display.value = result;
            }
            lastOperator = "^";
            lastClickedIsOperator = true;

            if (lastOperatorBtn) {
                lastOperatorBtn.style.backgroundColor = "";
            }
            btn.style.backgroundColor = "#FAFAFA";
            lastOperatorBtn = btn;
        }

        // Handle percentage operation (%)
        else if (btn.textContent === "%") {
            calculateResult(display.value, true); // true indicates percentage calculation
            display.value = result;
            lastClickedIsOperator = true;
        }

        // Handle square root (√x)
        else if (btn.textContent === "√x") {
            display.value = Math.sqrt(parseFloat(display.value));
            lastClickedIsOperator = true;
        }

        // Handle equals button
        else if (btn.textContent === "=") {
            calculateResult(display.value);
            display.value = result;
            lastClickedIsOperator = true;
            lastOperator = "";
            if (lastOperatorBtn) {
                lastOperatorBtn.style.backgroundColor = "";
                lastOperatorBtn = null;
            }
        }
    });
});

function calculateResult(current, isPercentage = false) {
    current = parseFloat(current);

    if (isPercentage) {
        current = result * (current / 100);
    }

    if (lastOperator === "+") {
        result += current;
    } else if (lastOperator === "-") {
        result -= current;
    } else if (lastOperator === "×") {
        result *= current;
    } else if (lastOperator === "÷") {
        if (current === 0) {
            result = "Error";
        } else {
            result /= current;
        }
    } else if (lastOperator === "^") {
        result = Math.pow(result, current);
    } else {
        result = current;
    }
}

function isOper(value) {
    const operators = ["+", "-", "×", "÷"];
    return operators.includes(value);
}

function resetCalculator() {
    lastOperator = "";
    currentValue = "";
    result = 0;
    lastClickedIsOperator = false;
    if (lastOperatorBtn) {
        lastOperatorBtn.style.backgroundColor = "";
        lastOperatorBtn = null;
    }
}
