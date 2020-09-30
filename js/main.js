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
function getRandomIndexfromArr(arr) {
  return getRandomIntInclusive(0, arr.length - 1);
}

/* получение случайного значения из массива возможного количества комнат */
const roomOptionElements = document.querySelector(`#housing-rooms`);
let roomOptions = {};
roomOptions = roomOptionElements[getRandomIndexfromArr(roomOptionElements, getRandomIntInclusive)].textContent;


/* получение случайного значения из массива возможного времени заселения */
const times = document.querySelector(`#timein`);
let checkInTime = {};
checkInTime = times[getRandomIndexfromArr(times, getRandomIntInclusive)].textContent;


/* получение случайного значения из массива возможного времени выселения */
const timesOut = document.querySelector(`#timeout`);
let checkOuTime = {};
checkOuTime = timesOut[getRandomIndexfromArr(times, checkOuTime, getRandomIntInclusive)].textContent;

/* Цена и адрес */
const price = getRandomIntInclusive(0, 60000);
const address = (`location.x:` + getRandomIntInclusive(0, 700) + `,` + `location.y:` + getRandomIntInclusive(130, 630));

/* Фичи */
const featuresArr = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const newFeaturesArr = [];
for (let i = 0; i <= getRandomIntInclusive(1, featuresArr.length); i++) {
  newFeaturesArr.push(featuresArr[i]);
}

/* Массив фотографий объекта */
const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const newPhotoArr = [];
for (let i = 0; i < getRandomIntInclusive(1, photos.length); i++) {
  newPhotoArr.push(photos[i]);
}

/* Тип помещения */
const ArrType = [`palace`, `flat`, `house`, `bungalow`];
let newArrType = [];
for (let i = 0; i < getRandomIntInclusive(1, ArrType.length); i++) {
  newArrType = ArrType[i];
}

/* Число гостей */
const guests = [`Любое число гостей`, `Два гостя`, `Один гость`, `Не для гостей`];
let newArrGuests = [];
for (let i = 0; i < getRandomIntInclusive(1, guests.length); i++) {
  newArrGuests = guests[i];
}

/* текст ( свойство: описание объекта) */
const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

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
      'title': text,
      'address': address,
      'price': price,
      'type': newArrType,
      'rooms': roomOptions,
      'guests': newArrGuests,
      'checkin': checkInTime,
      'checkout': checkOuTime,
      'features': newFeaturesArr,
      'description': text,
      'photos': newPhotoArr,
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


