function sum(number1, number2) {

  console.log(number1 + number2)
  return number1 + number2
}

let number1 = document.getElementById('deposit').value
let number2 = document.getElementById('loan').value

let button =document.querySelector('button')

button.addEventListener('click', sum(number1, number2))





