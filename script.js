
class Calculator { //Class calculator with all functions inside

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement  
        this.clear()
    }


    clear (){ // Function to clear the display
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined

    }

    delete() { // To delete the input one by one
        this.currentOperand = this.currentOperand.toString().slice(0,-1)// the slice method makes you chop the string from the first index to the last one
    }

    appendNumber (number){ // Making sure that only one dot is shown
        if(number ==='.' && this.currentOperand.includes('.')) return // the return without anything just make the . to stop displaying 
        this.currentOperand = this.currentOperand.toString() + number.toString() //Converting the number into a string to be able to concatenate them
    }

    chooseOperation (operation) {
        if (this.currentOperand === '') return // Again the return here doesn't allow the next lines to run
        if (this.previousOperand !== ''){
            this.compute() // this is making consecutives operantions in the previousOperand
        }
        this.operation = operation  
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute (){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){ //the switch statement is being made about the this.operation parameter
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return

        }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''  
    }
    getDisplayNumber(number){
        //Dealing with decimal numbers and integer, being able to display...
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1] 
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else {
            this.previousOperandTextElement.innerText = ''
        }

    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})