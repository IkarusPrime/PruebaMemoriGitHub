'use strict';

var cardsArray = [{//array de las cartas
  'name': 'postre1',
  'img': 'img/postre1.jpg'
}, {
  'name': 'bolas',
  'img': 'img/bolas.jpg'
}, {
  'name': 'sepia',
  'img': 'img/sepia.jpg'
}, {
  'name': 'crema',
  'img': 'img/crema.jpg'
}, {
  'name': 'iogur',
  'img': 'img/iogur.jpg'
}, {
  'name': 'ojos',
  'img': 'img/ojos.jpg'
}, {
  'name': 'sopa',
  'img': 'img/sopa.jpg'
}, {
  'name': 'tarta',
  'img': 'img/tarta.jpg'
}, {
  'name': 'almejas',
  'img': 'img/almejas.jpg'
}, {
  'name': 'macarrones',
  'img': 'img/macarrones.jpg'
}, {
  'name': 'porcion',
  'img': 'img/porcion.jpg'
}, {
  'name': 'carne',
  'img': 'img/carne.jpg'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});//aleatoriza la posición de las cartas

//definición de variables importantes
var firstGuess = '';//definicion de la variable para la primera carta seleccionada
var secondGuess = '';//definicion de la variable para la segunda carta seleccionada
var count = 0;//contador para la comparación
var previousTarget = null;//indica si ha carta en status selected
var delay = 1200;
let pairs = 0, errors = 0, moves = 0, score = 0;
let premio = '';
var game = document.getElementById('game');//indica el div del tablero
var grid = document.createElement('section');//crea un elemento de tipo section para mostrar las cartas
grid.setAttribute('class', 'grid');//establece el atributo class con valor grid
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,//guarda el nombre
      img = item.img;//guarda la foto

  var card = document.createElement('div');//crea el espacio donda se vera la carta
  card.classList.add('card');//crea la carta
  card.dataset.name = name;//pone el nombre a la carta

  var front = document.createElement('div');//crea el espacio para el dorso de la carta
  front.classList.add('front');//crea el dorso de la carta

  var back = document.createElement('div');//crea el espacio para el reverso de la carta
  back.classList.add('back');//crea el reverso de la carta
  back.style.backgroundImage = 'url(' + img + ')';//assigna la foto al reverso
  grid.appendChild(card);//introduce la carta en el objeto
  card.appendChild(front);//introduce la imagen en la cara de la carta
  card.appendChild(back);//introduce la foto del dorso de la carta
});

var match = function match() {//pareja correcta
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {//si la pareja es correcta se le pone el status match para que no se puede seleccionar otra vez
    card.classList.add('match');//sustituye el valor selected por el match en el atributo class
    if(pairs == 12){
      if (40 > score && score > 30) {
        premio = "cafe/chupito/copa";
        premios(premio)
      } else if (45 > score && score > 39){
        premio = "postre";
        premios(premio)
      }else if (50 > score && score > 44){
        premio = "5% descuento";
        premios(premio)
      }else if (55 > score && score > 49){
        premio = "10% descuento";
        premios(premio)
      }else if (60 > score && score > 54){
        premio = "20% descuento";
        premios(premio)
      }
    }
  });
};

var resetGuesses = function resetGuesses() {//resetea las variables de las cartas
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {//establece el valor selected en el atributo class
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {//se ejecuta al girar una carta
  var clicked = event.target;//se guarda la carta seleccionada
  
  if (clicked.nodeName === 'SECTION' ||//no cartas seleccionadas
      clicked === previousTarget || //previous target no es null
      clicked.parentNode.classList.contains('selected') || //si ha carta selected
      clicked.parentNode.classList.contains('match')) {//si hay pareja correcta
    return;//reseta la comparación
  }

  if (count < 2) {//comparación de cartas
    count++;
    if (count === 1) {//primera carta
      firstGuess = clicked.parentNode.dataset.name;//guarda el nombre
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');//dice que hay carta selected
    } else {//segunda carta
      secondGuess = clicked.parentNode.dataset.name;//guarda el nombre
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');//status selected
      moves++;
      document.getElementById("num1").innerHTML=moves;
    }

    if (firstGuess && secondGuess) {//comparación para match
      if (firstGuess === secondGuess) {//hay match
        score=score+5;
        pairs=pairs+1;
        document.getElementById("num3").innerHTML=score;
        setTimeout(match, delay);//desaparecen las cartas
      }else{
        errors++;
        score=score-2;
        if(score<0) score=0;
        document.getElementById("num3").innerHTML=score;
        document.getElementById("num2").innerHTML=errors;
      }
      setTimeout(resetGuesses, delay);//resetea las cartas
    }
    previousTarget = clicked;//indica que hay una carta selected 
  }
});

function premios(premio){
  document.getElementById("qrText").innerHTML=premio;
}