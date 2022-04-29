'use strict';

// var cardsArray = [{//array de las cartas
//   'name': 'shell',
//   'img': 'img/mario/blueshell.png'
// }, {
//   'name': 'star',
//   'img': 'img/mario/star.png'
// }, {
//   'name': 'bobomb',
//   'img': 'img/mario/bobomb.png'
// }, {
//   'name': 'mario',
//   'img': 'img/mario/mario.png'
// }, {
//   'name': 'luigi',
//   'img': 'img/mario/luigi.png'
// }, {
//   'name': 'peach',
//   'img': 'img/mario/peach.png'
// }, {
//   'name': '1up',
//   'img': 'img/mario/1up.png'
// }, {
//   'name': 'mushroom',
//   'img': 'img/mario/mushroom.png'
// }, {
//   'name': 'thwomp',
//   'img': 'img/mario/thwomp.png'
// }, {
//   'name': 'bulletbill',
//   'img': 'img/mario/bulletbill.png'
// }, {
//   'name': 'coin',
//   'img': 'img/mario/coin.png'
// }, {
//   'name': 'goomba',
//   'img': 'img/mario/goomba.png'
// }];

var cardsArray = [{//array de las cartas
  'name': 'pizza',
  'img': 'img/restaurante/pizza.png'
}, {
  'name': 'cafe',
  'img': 'img/restaurante/cafe.png'
}, {
  'name': 'bistec',
  'img': 'img/restaurante/bistec.png'
}, {
  'name': 'ensalada',
  'img': 'img/restaurante/ensalada.png'
}, {
  'name': 'espageti',
  'img': 'img/restaurante/espageti.png'
}, {
  'name': 'refresco',
  'img': 'img/restaurante/refresco.png'
}, {
  'name': 'sopa',
  'img': 'img/restaurante/sopa.png'
}, {
  'name': 'pescado',
  'img': 'img/restaurante/pescado.png'
}, {
  'name': 'vino',
  'img': 'img/restaurante/vino.png'
}, {
  'name': 'bulletbill',
  'img': 'img/mario/bulletbill.png'
}, {
  'name': 'coin',
  'img': 'img/mario/coin.png'
}, {
  'name': 'goomba',
  'img': 'img/mario/goomba.png'
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
let pairs = 0;

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

let errors = 0, moves = 0, score = 0;

var match = function match() {//pareja correcta
  score+=5;
  //añadir visibilidad al contador
  if (pairs==12) {
    //victoria, mostrar puntuacion total/premio
  }
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {//si la pareja es correcta se le pone el status match para que no se puede seleccionar otra vez
    card.classList.add('match');//sustituye el valor selected por el match en el atributo class
  });
};

var resetGuesses = function resetGuesses() {//resetea las variables de las cartas
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  errors++;
  score-=5;
  if(score<0) score=0;
  //añadir visibilidad del contador

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
      //añadir vilibilidad al contador;
    }

    if (firstGuess && secondGuess) {//comparación para match
      if (firstGuess === secondGuess) {//hay match
        setTimeout(match, delay);//desaparecen las cartas
      }
      setTimeout(resetGuesses, delay);//resetea las cartas
    }
    previousTarget = clicked;//indica que hay una carta selected 
  }
});