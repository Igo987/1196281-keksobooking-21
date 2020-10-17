'use strict';
/* Удаление класса неактивного состояния у карты */
let mapBooking = document.querySelector(`.map`);

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
const PIN_HALF_WIDTH = 32;

/* Генерация данных  объекта (объявления) */
const getSomeObjects = () => {
  let newAdd = [];
  for (let i = 1; i <= 8; i++) {
    const valueLocationX = getRandomIntInclusive(0, 1200);
    const valueLocationY = getRandomIntInclusive(130, 630);
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
  return newAdd;
};

const newArrObjects = getSomeObjects();
newArrObjects.forEach(function (item) {
  const pin = document.querySelector(`#pin`).content;
  const newPin = pin.cloneNode(true);
  const image = newPin.querySelector(`img`);
  const mapPin = newPin.querySelector(`.map__pin`);
  image.src = item.author.avatar;
  mapPin.style.left = item.location.x + PIN_HALF_WIDTH + `px`;
  mapPin.style.top = item.location.y + PIN_HEIGHT + `px`;
  image.alt = item.offer.title;
  mapPins.append(mapPin);
});

/* Новая часть */
/* блок объявлений */
const filterContainers = document.querySelector(`.map__filters-container`);

const card = document.querySelector(`#card`); // шаблон объявления
const newCard = card.content.cloneNode(true); // клонирование шаблона

let cardTitle = newCard.querySelector(`.popup__title`); // заголовок
let cardAddress = newCard.querySelector(`.popup__text--address`); // адрес
let cardPrice = newCard.querySelector(`.popup__text--price`); // цена {{offer.price}}₽/ночь
let cardPromyseType = newCard.querySelector(`.popup__type`); // тип жилья прописать соответствие
let cardOffer = newCard.querySelector(`.popup__text--capacity`); // вместимость {{offer.rooms}} комнаты для {{offer.guests}} гостей
let cardFeatures = newCard.querySelectorAll(`.popup__feature`); // фичи
let cardTimesInOut = newCard.querySelector(`.popup__text--time`); // время заезда-выезда Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}
let cardDescription = newCard.querySelector(`.popup__description`); // описание
let cardPhotos = newCard.querySelector(`.popup__photos`); // блок фото
let cardPhoto = newCard.querySelector(`.popup__photo`); // фотографии
let cardAvatar = newCard.querySelector(`.popup__avatar`); // аватар

/* ОПИСАНИЕ */
cardTitle.textContent = newArrObjects[0].offer.title;
/* АДРЕС*/
cardAddress.textContent = newArrObjects[0].offer.address;
/* ЦЕНА */
cardPrice.textContent = `Цена ` + newArrObjects[0].offer.price + `₽/ночь`;
/* ТИП ПОМЕЩЕНИЯ */
switch (newArrObjects[0].offer.type) {
  case `palace`: cardPromyseType.textContent = `Дворец`;
    break;
  case `bungalow`: cardPromyseType.textContent = `Бунгало`;
    break;
  case `flat`: cardPromyseType.textContent = `Квартира`;
    break;
  case `house`: cardPromyseType.textContent = `Дом`;
}
/* КОЛИЧЕСТВО КОМНАТ ДЛЯ __ ГОСТЕЙ */
cardOffer.textContent = `${newArrObjects[0].offer.rooms}` + `комнаты для ` + `${newArrObjects[0].offer.guests}` + `гостей`;

/* ВРЕМЯ ЗАЕЗДА & ВЫЕЗДА */
cardTimesInOut.textContent = `Заезд после` + `${newArrObjects[0].offer.checkin}` + `,выезд до` + `${newArrObjects[0].offer.checkout}`;

/* ФОТКИ ОБЪЕКТА */
cardPhoto.remove();
for (let i = 0; i < newArrObjects[0].offer.photos.length; i++) {
  let clonePhoto = cardPhoto.cloneNode(false);
  cardPhotos.append(clonePhoto);
  clonePhoto.src = newArrObjects[0].offer.photos[i];
};

/* ОПИСАНИЕ */
cardDescription.textContent = newArrObjects[0].offer.description;

/* АВАТАР */
cardAvatar.src = newArrObjects[0].author.avatar;

/* ВСТАВКА КАРТОЧКИ ОБЪЯВЛЕНИЯ */
filterContainers.prepend(newCard);

/* ФОРМА ОБЪЯВЛЕНИЯ */
const form = document.querySelector(`.ad-form`);
const fieldset = form.querySelectorAll(`fieldset`);

/* НЕАКТИВНЫЕ ЭЛЕМЕНТЫ ФОРМЫ  (ДОЛЖНЫ БЫТЬ) */
const inputFields = form.querySelectorAll(`fieldset`);
for (let i = 0; i < inputFields.length; i++) {
  inputFields[i].setAttribute(`disabled`, true);
}
const mapFilter = document.querySelector(`.map__filters`);
mapFilter.classList.add(`ad-form--disabled`); // добавление блокировки

/*   ПЕРЕМЕЩЕНИЕ МЕТКИ */
let logoPin = document.querySelector(`.map__pin--main`);
logoPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    logoPin.style.top = (logoPin.offsetTop - shift.y) + `px`;
    logoPin.style.left = (logoPin.offsetLeft - shift.x) + `px`;
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
}
);

/* АКТИВАЦИЯ ФОРМЫ ПО ENTER И MOUSEDOWN */
const popup = document.querySelector(`.map__card`);
let addressForm = form.querySelector(`#address`);
const MAP_PIN_SIZE = 31; // половина ширины и высоты main pin (получаем её центр);
addressForm.value = (logoPin.getBoundingClientRect().x - MAP_PIN_SIZE) + `,` + (logoPin.getBoundingClientRect().y - MAP_PIN_SIZE);

popup.hidden = true;

mapBooking.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    mapBooking.classList.remove(`map--faded`);
    mapFilter.classList.remove(`ad-form--disabled`);
    popup.hidden = false;
    form.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < inputFields.length; i++) {
      fieldset[i].removeAttribute(`disabled`);
    }
  }
  logoPin.addEventListener(`mousemove`, function () {
    addressForm.value = (logoPin.getBoundingClientRect().x) + `,` + (logoPin.getBoundingClientRect().y);
  });
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    mapBooking.classList.remove(`map--faded`);
    mapFilter.classList.remove(`ad-form--disabled`);
    popup.hidden = false;
    form.classList.remove(`ad-form--disabled`);
    form.removeAttribute(`disabled`);
  }
  logoPin.addEventListener(`mousemove`, function () {
    addressForm.value = (logoPin.getBoundingClientRect().x) + `,` + (logoPin.getBoundingClientRect().y);
  });
});

/* ФИЧИ */
let valueFeatures = newArrObjects[0].offer.features;
const arrFeatures = Array.from(cardFeatures);
for (let i = 0; i < valueFeatures.length; i++) {
  let getFeatureClass = `popup__feature--` + valueFeatures[i];
  let classAvailable = arrFeatures.forEach((el) => el.classList.contains(getFeatureClass));
  if (!classAvailable) {
    arrFeatures[i].remove();
  }
};

/* ВАЛИДАЦИЯ ГРАФ "КОЛИЧЕСТВО КОМНАТ" И "КОЛИЧЕСТВО ГОСТЕЙ" */
const inputRoom = document.querySelector(`#room_number`); // КОМНАТА
const inputCapacity = document.querySelector(`#capacity`); // ГОСТЬ
let inputCapacityValues = Array.from(inputCapacity).reverse();

inputRoom.addEventListener(`change`, function (e) {
  for (let i = 0; i < inputCapacityValues.length; i++) {
    if (inputCapacityValues[i].value > e.currentTarget.value) {
      inputCapacityValues[i].disabled = true;
    } else {
      inputCapacityValues[i].disabled = false;
    }
  }
});
