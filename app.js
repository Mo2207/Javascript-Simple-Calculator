const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const currentInputTextElement = document.querySelector("[data-current-operand]");
const previousInputTextElement = document.querySelector("[data-previous-operand]");


class Calculator {
    constructor(previousInputTextElement, currentInputTextElement) {
        this.previousInputTextElement = previousInputTextElement;
        this.currentInputTextElement = currentInputTextElement;
        this.clear();
    }
    clear() {
        this.previousInput = "";
        this.currentInput = "";
        this.operation = undefined;
    }
    delete() {
        this.currentInput = this.currentInput.slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentInput.includes('.')) return;
        this.currentInput += number;
    }
    chooseOperation(operation) {
        if (this.currentInput === '') return;
        if (this.previousInput !== '') {
            this.calculate();
        };
        this.operation = operation;
        // THIS LINE ADDS THE OPERATION TO THE PREVIOUS INPUT WITHOUT OVER-WRITING THE CLEAR() FUNCTION  LIKE IT WAS IN THE UPDATEDISPLAY() FUNCTION
        this.previousInput = `${this.currentInput} ${this.operation}`;
        this.currentInput = "";
    }
    calculate() {
        let result;
        const prev = parseFloat(this.previousInput);
        const cur = parseFloat(this.currentInput);
        if (isNaN(prev) || isNaN(cur)) return;
        switch (this.operation) {
            case '+':
                result = prev + cur;
                break;
            case '-':
                result = prev - cur;
                break;
            case '*':
                result = prev * cur;
                break;
            case '÷':
                result = prev / cur;
                break;
            default:
                return;
        }
        this.currentInput = result;
        this.operation = undefined;
        this.previousInput = '';
    }
    updateDisplay() {
        this.currentInputTextElement.innerText = this.currentInput;
        // THIS BREAKS THE ALL CLEAR BUTTON
        // if (this.operation != null) { 
        //     this.previousInputTextElement.innerText = `${this.previousInput} ${this.operation}`
        // } 
        this.previousInputTextElement.innerText = this.previousInput;
    } 
}

const calculator = new Calculator(previousInputTextElement, currentInputTextElement);

numberBtns.forEach(numButton => {
    numButton.addEventListener('click', () => {
        calculator.appendNumber(numButton.innerText);
        calculator.updateDisplay();
    })
});

operationBtns.forEach(opButton => {
    opButton.addEventListener('click', () => {
        console.log(opButton);
        calculator.chooseOperation(opButton.innerText);
        calculator.updateDisplay();
    })
});

allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

equalsBtn.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});
