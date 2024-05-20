const digitButtons = document.querySelectorAll('.digit');
const display = document.querySelector('.display');

const data = {
  'first_number': '',
  'operando': '',
  'second_number': ''
};

init();

function add(a, b) {
  return a + b;
}

function substract(a,b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if(b === 0) {
    console.error("You are trying to divide by 0!");  
    return "error";
  }
  return a / b;
}

function operate(data) {

  const operator = data['operando'];
  const firstOperando = data['first_number'];
  const secondOperando = data['second_number'];
  let result = 0;

  switch(operator) {
    case '+':
      result = add(firstOperando, secondOperando);
      break;
    case '-':
      result = substract(firstOperando, secondOperando);
      break;
    case 'x':
      result = multiply(firstOperando, secondOperando);
      break;
    case '/':
      result = divide(firstOperando, secondOperando);
      break;
    default:
      break;
  }

  if(result === 'error') {
    data['first_number'] = '';
    data['operando'] = '';
    data['second_number'] = '';
  }else {
    result = parseFloat(result).toFixed(2);
    return saveResult(result);
  }

}

function saveResult(result) {
  console.log("result = " + result);

  display.innerText = result;
  data['first_number'] = result;
  data['operando'] = '';
  data['second_number'] = '';
}

function updateDisplay() {
  let displayText = 0;
  if(data['second_number'] !== '') {
    displayText = data['second_number'];
  } 
  // else if(data['operando'] !== '') {
  //   displayText = data['operando'];
  // }
  else if(data['first_number'] !== '') {
    displayText = data['first_number'];
  }

  display.innerText = displayText;
}

function clear(){
  display.innerText = 0;
  data['first_number'] = '';
  data['operando'] = '';
  data['second_number'] = '';
}

function init(){
  const digitButtons = document.querySelectorAll('.digit');
  const operandoButtons = document.querySelectorAll('.operando');
  const commaButton = document.querySelector('.comma');

  display.innerHTML = 0;

  let digitButtonsArr = [...digitButtons];

  digitButtons.forEach(button => button.addEventListener('click', (e) => {
    let digit = e.target.innerText;

    console.log(digit);

    if(data['operando'] === '') {
      data['first_number'] = parseFloat(data['first_number'] + digit);
    }else {
      data['second_number'] = parseFloat(data['second_number'] + digit);
    }
    updateDisplay();
  }));

  operandoButtons.forEach(button => button.addEventListener('click', (e) => {
    let operando = e.target.innerText;

    console.log(operando);

    switch(operando) {
      case 'C':
        clear();
        break;

      case '=':
        operate(data);
        break;

      case '-/+':
        if(data['second_number'] !== '') {
          data['second_number'] = data['second_number'] * (-1);
        }else if(data['first_number'] !== ''){
          data['first_number'] = data['first_number'] * (-1);
        }
        updateDisplay();
        break;
      default:
        if(data['operando'] !== '') {
          operate(data);
        }

        data['operando'] = operando;
        updateDisplay();
        break;
    }

  }));

  commaButton.addEventListener('click', (e) => {
    
    if(!commaButton.dataset.clicked) {
      commaButton.setAttribute('data-clicked', 'true');
      commaButton.style.backgroudColor = '#555';
      commaButton.style.color = '#red';
    }else{
      commaButton.removeAttribute('data-clicked');
      commaButton.removeAttribute('style');
    }
  });

}