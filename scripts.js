const buttons = document.querySelectorAll('button')
const numbers = document.querySelectorAll('.not-operator')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('#equals')
const reset = document.querySelector('#reset')

const auxiliaryCurrent = document.querySelector('.auxiliary-current')
const current = document.querySelector('.current-operation')
const previousRecent = document.querySelector('.previous-recent')
const previousOlder = document.querySelector('.previous-old')

function verifyTypeOfButton(text) {
    const arithmeticOperatorsAndDot = ['+', '-', '/', '*', '.']
    const numbersAndParentheses = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", '(', ')']

    let indexlastCaracter = current.textContent.length - 1
    let lastCaracter = current.textContent[indexlastCaracter]

    if (numbersAndParentheses.includes(text)){ // botao clicado foi de numero ou parentese
    
        // analisando quem vem antes dos numeros ou parenteses

        if (current.textContent == '0'){ // se estiver apenas 0, numero ou paratese inserido deve substitui-lo

            current.textContent = text // 

        } else if (numbersAndParentheses.includes(lastCaracter)) { // se antecessor for numero ou parentese, acrescente o numero/parentese inserido imediatamente depois

            current.textContent = current.textContent + text 

        } else if (lastCaracter == '.'){  // se antecessor for ponto, acrescente o numero/parentese inserido imediatamente depois

            current.textContent = current.textContent + text

        } else { //  // se antecessor for operador aritmetico ou %, acrescente um espaco, depois o numero/parentese inserido

            current.textContent = current.textContent + " " + text
        }
    }

    else if (arithmeticOperatorsAndDot.includes(text)){ // botao clicado foi de operador aritetico ou ponto

        // analisando quem vem antes dos operadores aritmeticos

        if (arithmeticOperatorsAndDot.includes(lastCaracter)){ // antecessor é outro operador, antecessor deve ser substituido pelo botao clicado
            
            let stringToArray = current.textContent.split("")
            stringToArray.splice(indexlastCaracter, 1, " ",text)

            let arrayToString = stringToArray.join("")

            current.textContent = arrayToString

        } else { // antecessor é um numero ou parenteses, operador sera acrescentado depois deles

            if(text == '.'){ // . acrescentado imediatamente dps do numero/parentese

                current.textContent = current.textContent + text  

            } else {  // operador aritmetico é acrescentado depois de ter sido acrescentado um espaco

                current.textContent = current.textContent + " " +text

            }
        }

    }

    else if (text == '%') {

        let indexlastCaracter = current.textContent.length - 1
        let lastCaracter = current.textContent[indexlastCaracter]

        if (arithmeticOperatorsAndDot.includes(lastCaracter)){ // antecessor é outro operador, antecessor deve ser substituido pelo botao clicado
            
            let stringToArray = current.textContent.split("")
            stringToArray.splice(indexlastCaracter, 1, " ","* 0.01 *") // a partir do ultimo indice, retire 1, acrescente " ", e acrescente "* 0.01 *"

            let arrayToString = stringToArray.join("")

            current.textContent = arrayToString

        } else { // antecessor é numero ou parentese

            if (current.textContent.length == 1) {

                let stringToArray = current.textContent.split("")
                stringToArray.splice(1, 0, " ","* 0.01 *")

                let arrayToString = stringToArray.join("")

                current.textContent = arrayToString

            } else {

                let stringToArray = current.textContent.split("")
                stringToArray.splice(indexlastCaracter + 1, 0, "* 0.01 *")

                let arrayToString = stringToArray.join("")

                current.textContent = arrayToString

            }
        }
    }

    else if (text == "AC") {

        let raiseToRecentHistory = current.textContent
        let raiseToOlderHistory = previousRecent.textContent

        previousOlder.textContent = raiseToOlderHistory
        previousRecent.textContent = raiseToRecentHistory

        current.textContent = 0


    }

    else if (text == '=') {

        let raiseToRecentHistory = current.textContent
        let raiseToOlderHistory = previousRecent.textContent

        previousOlder.textContent = raiseToOlderHistory
        previousRecent.textContent = raiseToRecentHistory

        current.textContent = eval(current.textContent)

    }
}

function dynamicOutput() {

    let fontSizeOfCurrent = getComputedStyle(current).fontSize // css em arquivo externo, esse metodo permite acessar 
    let overflowOfCurrent = getComputedStyle(current).overflowWrap
    // console.log("----------------- para debug ----------------")
    // console.log("altura da fonte", fontSizeOfCurrent)
    // console.log("valor do overflowWrap", overflowOfCurrent)
    // console.log("largura do atual calculo", current.clientWidth)
    // console.log("largura de caixa maior do atual", auxiliaryCurrent.clientWidth)
    if ((current.clientWidth >= 314) && (fontSizeOfCurrent != "15px")){
        let atualSoNumero = fontSizeOfCurrent.split("px")[0]
        current.style.fontSize = `${atualSoNumero - 5}px`
    } else if (fontSizeOfCurrent == "15px") {
        let newOverflow = "break-word"
        current.style.overflowWrap = newOverflow
    }

}

buttons.forEach(btn => {
    btn.addEventListener('click', function() {
        verifyTypeOfButton(btn.textContent)
        dynamicOutput()
    }
)})


