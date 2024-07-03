var result = 0;
var newNum = 0;
var memory = 0;
var nextOperation = "";
var screenContent = document.getElementById("screen-content");


function handleclick(val) {
          
    switch(true) {
        case val === "ON/C":
            resetVar();
            display(result);
            screenContent.style.display = screenContent.style.display === 'none' ? 'block' : 'none';
            break;
        case val === "MRC": // Displays value in memory
            display(memory);
            break;
        case val === "M-": // Delete displayed value from memory
            memory -= result;
            resetVar();
            break;
        case val === "M+": // Add displayed value to memory
            memory += result;
            resetVar();
            break;
        case (val >= 0 && val <= 9): // Handle digits input
            if (newNum !== 0) {
                newNum += val;
            } else {
                newNum = parseFloat(val);
            }
            display(newNum);
            break;
        case val === ".": // Handle decimal point and check for existing point
            if (!newNum.toString().includes(".")) {
                newNum += ".";
            }
            display(newNum);
            break;
        case val === "=": // Compute and return result
            newNum = parseFloat(newNum);
            performCalc();
            nextOperation = "";
            break;
        case val === "+":
        case val === "-": // "&#45;"
        case val === "×": // "&#215;"
        case val === "÷" : // "&#247;"
            if (nextOperation !== "") {
                performCalc();
            }
            nextOperation = val; 
            if (result === 0) result += parseFloat(newNum);
            newNum = 0;
            break;
        case val === "√": // "&#8730;"
            result = Math.sqrt(newNum);
            display(result);
            newNum = 0;
            break;
        case val === "%":
            switch(nextOperation) {
                case "+":
                    result = result * (1 + newNum/100);
                    break;
                case "-": // "&#45;"
                    result = result * (1 - newNum/100);
                    break;
                case "×": // "&#215;"
                    result = result * newNum/100;
                    break;
                case "÷" : // "&#247;"
                    result = result / newNum * 100;
                    break;
            }
            display(result);
            break;
        case val === "C":
            resetVar();
            display(result);
            nextOperation = "";
            break;
        case val === "CE": // Clear last entry
            newNum = 0;
            display(newNum);
            break;
    } 
}

// Display the value in the screen area
function display(val) {
    screenContent.innerHTML = val;
}

// perform the calculation, reset newNum and display the result
function performCalc() {
    switch(nextOperation) {
        case "+":
            result += newNum;
            break;
        case "-":
            result -= newNum;
            break;
        case "×":
            result *= newNum;
            break;
        case "÷":
            result /= newNum;
            break;
    }
    newNum = 0;
    display(result);
}

// Reset result and newNum
function resetVar() {
    result = 0;
    newNum = 0;
}