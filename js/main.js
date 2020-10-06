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
  let arrCopy = [...arr];
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
const timesIn = Array.from(document.querySelectorAll(`#timein`)).map((el) => el.textContent).toString().replace(/ +/g, ` `).trim().split(`\n`);

/*  время выселения */
const timesOut = Array.from(document.querySelectorAll(`#timeout`)).map((el) => el.textContent).toString().replace(/ +/g, ` `).trim().split(`\n`);

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
      'checkin': getRandomElement(timesIn),
      'checkout': getRandomElement(timesOut),
      'features': getRandomElements(FEATURES),
      'description': TEXT,
      'photos': getRandomElements(PHOTOS),
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

/* Новая часть */

/* блок объявлений */
/* const pins = document.querySelector(`.map-pins`);
const templateCard = document.querySelector(`#card`).content; // шаблон объявления
const titleCard = templateCard.querySelector(`.popup__title`); // заголовок
const addressCard = templateCard.querySelector(`.popup__text--address`); // адрес
const priceCard = templateCard.querySelector(`.popup__text--price`); // цена {{offer.price}}₽/ночь
const promyseTypeCard = templateCard.querySelector(`.popup__type`); // тип жилья прописать соответствие
const offerCard = templateCard.querySelector(`.popup__text--capacity`); // вместимость {{offer.rooms}} комнаты для {{offer.guests}} гостей
const featuresCard = templateCard.querySelector(`.popup__features`); // фичи
const timeInOutCard = templateCard.querySelector(`.popup__text--time`); // время заезда-выезда Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}
const descriptionCard = templateCard.querySelector(`.popup__description`); // описание
const photoCard = templateCard.querySelector(`.popup__photos`); // фото
const avatarCard = templateCard.querySelector(`.popup__avatar`); // аватар */

/* const form = document.querySelector(`.ad-form`);
const fieldset = form.querySelectorAll(`fieldset`);
const addressForm = form.querySelector(`#address`);

const inputFields = form.querySelectorAll(`input`);
for (let i = 0; i < inputFields.length; i++) {
  inputFields[i].setAttribute(`disabled`, true);
}
const mapFilter = document.querySelector(`.map__filters`);

mapBooking.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    mapBooking.classList.remove(`map--faded`);
    mapFilter.remove(`ad-form--disabled`);
    for (let i = 0; i < inputFields.length; i++) {
      fieldset[i].setAttribute(`disabled`, false);
    }
  }
}
);

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    mapBooking.classList.remove(`map--faded`);
    form.remove(`ad-form--disabled`);
    mapFilter.remove(`ad-form--disabled`);
    form.setAttribute(`disabled`, false);
  }
}
); */
