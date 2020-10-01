'use strict';
/* Удаление класса неактивного состояния у карты */
let map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

/* Функция получения случайного целого числа в диапозоне */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Функция получения случайного индекса массива */
function getRandomIndexFromArr(arr) {
  return arr[getRandomIntInclusive(0, arr.length - 1)];
}

/* Функция получения определенного количества случайных элементов массива */
function getRandomElements(arr, newArr) {
  let i = 0;
  let count = getRandomIntInclusive(0, arr.length);
  while (i < count) {
    newArr.push(arr[getRandomIntInclusive(0, arr.length - 1)]);
    i++;
  }
  return newArr;
}

/* количество комнат */
const roomOptionElements = document.querySelector(`#housing-rooms`);

/* время заселения */
const times = document.querySelector(`#timein`);

/*  время выселения */
const timesOut = document.querySelector(`#timeout`);

/* адрес */
const valueLocationX = `120`;
const valueLocationY = `500`;
const address = (`location.x:` + `${valueLocationX}` + `,` + `location.y:` + `${valueLocationY}`);

/* Фичи */
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const randomFeatures = [];

/* Массив фотографий объекта */
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const newPhotoArr = [];

/* Тип помещения */
const PREMISES_TYPES = [`palace`, `flat`, `house`, `bungalow`];

/* Число гостей */
const GUESTS = [`Любое число гостей`, `Два гостя`, `Один гость`, `Не для гостей`];

/* текст ( свойство: описание объекта) */
const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

/* Добавление объявления с данными из массива*/
const mapPins = document.querySelector(`.map__pin`);
const PIN_HEIGHT = 84;
const PIN_HALF_WEIGTH = 32;

/* Генерация данных восьми объектов (объявлений) */
const newAdd = [];
for (let i = 1; i <= 8; i++) {
  let newObject = {
    'author': {
      'avatar': `img/avatars/user0` + i + `.png`,
    },
    'offer': {
      'title': TEXT,
      'address': address,
      'price': getRandomIntInclusive(0, 60000),
      'type': getRandomIndexFromArr(PREMISES_TYPES),
      'rooms': getRandomIndexFromArr(roomOptionElements).textContent,
      'guests': getRandomIndexFromArr(GUESTS),
      'checkin': getRandomIndexFromArr(times).textContent,
      'checkout': getRandomIndexFromArr(timesOut).textContent,
      'features': getRandomElements(FEATURES, randomFeatures),
      'description': TEXT,
      'photos': getRandomElements(PHOTOS, newPhotoArr),
    },
    'location': {
      'x': getRandomIntInclusive(0, 700),
      'y': getRandomIntInclusive(130, 630),
    },
  };
  newAdd.push(newObject);
}

const newArrObject = newAdd;

newArrObject.forEach(function (item) {
  const pin = document.querySelector(`#pin`).content;
  const newPin = pin.cloneNode(true);
  const image = newPin.querySelector(`img`);
  const mapPin = newPin.querySelector(`.map__pin`);
  image.src = item.author.avatar;
  mapPin.style.left = item.location.x + PIN_HALF_WEIGTH + `px`;
  mapPin.style.top = item.location.y + PIN_HEIGHT + `px`;
  image.alt = item.offer.title;
  mapPins.append(mapPin);
}
);
