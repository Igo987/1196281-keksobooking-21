'use strict';
/* Удаление класса неактивного состояния у карты */
let mapBooking = document.querySelector(`.map`);
mapBooking.classList.remove(`map--faded`);

/* Функция получения случайного целого числа в диапозоне */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Функция получения случайного элемента */
function getRandomElement(arr) {
  return arr[getRandomIntInclusive(0, arr.length - 1)];
}

/* Функция получения определенного количества случайных элементов массива */
function getRandomElements(arr) {
  let arrCopy = [...arr]; // Копируем массив
  let result = [];
  let randomElementCount = getRandomIntInclusive(1, arr.length);
  for (let i = 0; i < randomElementCount; i++) {
    let randomIndex = getRandomIntInclusive(0, arrCopy.length - 1);
    let elementToAdd = arrCopy.splice(randomIndex, 1);
    result.push(elementToAdd);
  }
  return result;
}

/* количество комнат */
const roomOptionElementsValue = Array.from(document.querySelectorAll(`#housing-rooms`)).map((el) => el.textContent).toString().replace(/ +/g, ` `).trim().split(`\n`);

/* время заселения */
const timeIn = Array.from(document.querySelectorAll(`#timein`)).map((el) => el.textContent).toString().replace(/ +/g, ` `).trim().split(`\n`);

/*  время выселения */
const timeOut = Array.from(document.querySelectorAll(`#timeout`)).map((el) => el.textContent).toString().replace(/ +/g, ` `).trim().split(`\n`);

/* Фичи */
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

/* Массив фотографий объекта */
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

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
  const valueLocationX = getRandomIntInclusive(0, 1000);
  const valueLocationY = getRandomIntInclusive(0, 700);
  const address = `${valueLocationX}, ${valueLocationY}`;
  const newPhotoArr = [];
  const randomFeatures = [];
  let newObject = {
    'author': {
      'avatar': `img/avatars/user0` + i + `.png`,
    },
    'offer': {
      'title': TEXT,
      'address': address,
      'price': getRandomIntInclusive(0, 60000),
      'type': getRandomElement(PREMISES_TYPES),
      'rooms': getRandomElement(roomOptionElementsValue),
      'guests': getRandomElement(GUESTS),
      'checkin': getRandomElement(timeIn),
      'checkout': getRandomElement(timeOut),
      'features': getRandomElements(FEATURES, randomFeatures),
      'description': TEXT,
      'photos': getRandomElements(PHOTOS, newPhotoArr),
    },
    'location': {
      'x': valueLocationX,
      'y': valueLocationY,
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
