class Calculator{
    constructor(previousDisplayText, resultDisplayText){
        this.previousDisplayText = previousDisplayText;
        this.resultDisplayText = resultDisplayText;
        this.clear();
    }
    clear(){
        this.previousDisplay = '';
        this.resultDisplay = '';
        this.operation = undefined;
    }
    delete(){
         this.resultDisplay = this.resultDisplay.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number === '.' && this.resultDisplay.includes('.')) return
        this.resultDisplay = this.resultDisplay.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.resultDisplay === '') return
        if(this.previousDisplay !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousDisplay = this.resultDisplay;
        this.resultDisplay = '';
    }
    compute(){
        let computation
        const previous = parseFloat(this.previousDisplay);
        const current = parseFloat(this.resultDisplay);
        if(isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = previous + current;
                break
            case '-':
                computation = previous - current;
                break
            case '*':
                computation = previous * current;
                break
            case '÷':
                computation = previous / current;
                break
            case '%':
                computation = previous % current;
                break
            default:
            return
        }
        this.resultDisplay = computation;
        this.operation = undefined;
        this.previousDisplay = '';
    }

    printDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
        
    }

    updateDisplay() {
      this.resultDisplayText.innerText = this.printDisplayNumber(this.resultDisplay);

      if (this.operation != null) {
        this.previousDisplayText.innerText = `${this.printDisplayNumber(this.previousDisplay)} ${this.operation}`;
      } else {
        this.previousDisplayText.innerText = ''
      }
    };
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const resultDisplayText = document.querySelector('[data-result]');
const previousDisplayText = document.querySelector('[data-previous]');

const calculator = new Calculator(previousDisplayText, resultDisplayText);

numberButtons.forEach(button=>{
   button.addEventListener("click",() => {
       calculator.appendNumber(button.innerText);
       calculator.updateDisplay()
   })
});

operatorButtons.forEach(button=>{
    button.addEventListener("click",() => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
 });

 equalsButton.addEventListener('click', button => {
     calculator.compute();
     calculator.updateDisplay();
 });

 clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

