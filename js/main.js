'use strict';

/* Удаление класса неактивного состояния у карты */
let mapBooking = document.querySelector(`.map`);

/* количество комнат */
const roomOptionElementsValue = Array.from(document.querySelector(`#housing-rooms`).children).map((el) => el.value);

/* время заселения */
const timesIn = Array.from(document.querySelector(`#timein`).children).map((el) => el.value);


/*  время выселения */
const timesOut = Array.from(document.querySelector(`#timeout`).children).map((el) => el.value);

/* Фичи */
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

/* Массив фотографий объекта */
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

/* Тип помещения */
const PREMISES_TYPES = [`palace`, `flat`, `house`, `bungalow`];

/* Число гостей */
const GUESTS = Array.from(document.querySelector(`#housing-guests`).children).map((el) => el.value);

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
    const valueLocationX = window.util.getRandomIntInclusive(0, 1200);
    const valueLocationY = window.util.getRandomIntInclusive(130, 630);
    const address = `${valueLocationX}, ${valueLocationY}`;
    let newObject = {
      'author': {
        'avatar': `img/avatars/user0` + i + `.png`,
      },
      'offer': {
        'title': TEXT,
        'address': address,
        'price': window.util.getRandomIntInclusive(0, 60000),
        'type': window.util.getRandomElement(PREMISES_TYPES),
        'rooms': window.util.getRandomElement(roomOptionElementsValue),
        'guests': window.util.getRandomElement(GUESTS),
        'checkin': window.util.getRandomElement(timesIn),
        'checkout': window.util.getRandomElement(timesOut),
        'features': window.util.getRandomElements(FEATURES),
        'description': TEXT,
        'photos': window.util.getRandomElements(PHOTOS),
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

/* ГЕНЕРАЦИЯ ОБЪЕКТА */
let renderCard = (object) => {
  cardAvatar.src = object.author.avatar;
  cardTitle.textContent = object.offer.title;
  cardAvatar.src = object.author.avatar;
  cardTitle.textContent = object.offer.title;
  cardAddress.textContent = object.offer.address;
  cardPrice.textContent = `Цена ` + object.offer.price + ` ₽/ночь`;
  cardOffer.textContent = `${object.offer.rooms}` + `комнаты для ` + `${object.offer.guests}` + `гостей`;
  cardTimesInOut.textContent = `Заезд после` + `${object.offer.checkin}` + `,выезд до` + `${object.offer.checkout}`;
  cardDescription.textContent = object.offer.description;
  switch (object.offer.type) {
    case `palace`: cardPromyseType.textContent = `Дворец`;
      break;
    case `bungalow`: cardPromyseType.textContent = `Бунгало`;
      break;
    case `flat`: cardPromyseType.textContent = `Квартира`;
      break;
    case `house`: cardPromyseType.textContent = `Дом`;
  }
  while (cardPhotos.firstChild) {
    cardPhotos.removeChild(cardPhotos.lastChild);
  }
  for (let i = 0; i < object.offer.photos.length; i++) {
    let clonePhoto = cardPhoto.cloneNode(false);
    cardPhotos.append(clonePhoto);
    clonePhoto.src = object.offer.photos[i];
  }
  let valueFeatures = object.offer.features;
  features.innerHTML = ``;
  for (let j = 0; j < valueFeatures.length; j++) {
    const featuresButton = document.createElement(`li`);
    featuresButton.classList.add(`popup__feature`, `popup__feature--` + valueFeatures[j]);
    features.append(featuresButton);
  }
};

/* ОТРИСОВКА ОБЪЯВЛЕНИЯ */
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
  mapPin.addEventListener(`click`, () => renderCard(item));
});


/* Новая часть */
/* блок объявлений */
const filterContainers = document.querySelector(`.map__filters-container`);
const card = document.querySelector(`#card`).content; // шаблон объявления
const newCard = card.cloneNode(true); // клонирование шаблона
let cardTitle = newCard.querySelector(`.popup__title`); // заголовок
let cardAddress = newCard.querySelector(`.popup__text--address`); // адрес
let cardPrice = newCard.querySelector(`.popup__text--price`); // цена {{offer.price}}₽/ночь
let cardPromyseType = newCard.querySelector(`.popup__type`); // тип жилья прописать соответствие
let cardOffer = newCard.querySelector(`.popup__text--capacity`); // вместимость {{offer.rooms}} комнаты для {{offer.guests}} гостей
let features = newCard.querySelector(`.popup__features`); // фичи
let cardTimesInOut = newCard.querySelector(`.popup__text--time`); // время заезда-выезда Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}
let cardDescription = newCard.querySelector(`.popup__description`); // описание
let cardPhotos = newCard.querySelector(`.popup__photos`); // блок фото
let cardPhoto = newCard.querySelector(`.popup__photo`); // фотографии
let cardAvatar = newCard.querySelector(`.popup__avatar`); // аватар

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
cardOffer.textContent = `${newArrObjects[0].offer.rooms}` + ` комнаты для  ` + `${newArrObjects[0].offer.guests}` + ` гостей`;

/* ВРЕМЯ ЗАЕЗДА & ВЫЕЗДА */
cardTimesInOut.textContent = `Заезд после ` + `${newArrObjects[0].offer.checkin}` + `,выезд до ` + `${newArrObjects[0].offer.checkout}`;

/* ФОТКИ ОБЪЕКТА */
cardPhoto.remove();
for (let i = 0; i < newArrObjects[0].offer.photos.length; i++) {
  let clonePhoto = cardPhoto.cloneNode(false);
  cardPhotos.append(clonePhoto);
  clonePhoto.src = newArrObjects[0].offer.photos[i];
}

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

const activateMap = () => {
  mapBooking.classList.remove(`map--faded`);
  popup.hidden = false;
  form.classList.remove(`ad-form--disabled`);
  for (let i = 0; i < inputFields.length; i++) {
    fieldset[i].removeAttribute(`disabled`);
  }
  logoPin.removeEventListener(`keydown`, onLogoPinKeyDown);
  logoPin.removeEventListener(`mousedown`, onLogoPinMouseDown);
};

logoPin.addEventListener(`mousemove`, function () {
  addressForm.value = (logoPin.getBoundingClientRect().x) + `,` + (logoPin.getBoundingClientRect().y);
});

const onLogoPinMouseDown = (evt) => {
  if (evt.button !== 0) {
    return;
  }
  activateMap();
};

const onLogoPinKeyDown = (evt) => {
  if (evt.key !== `Enter`) {
    return;
  }
  activateMap();
};

logoPin.addEventListener(`mousedown`, onLogoPinMouseDown);
logoPin.addEventListener(`keydown`, onLogoPinKeyDown);

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

/* ВАЛИДАЦИЯ "Время заезда" и "Время выезда" */
const formTimeIn = form.querySelector(`#timein`);
const formTimeOut = form.querySelector(`#timeout`);
const formTimeOutValues = Array.from(formTimeOut);

formTimeIn.addEventListener(`change`, function (e) {
  for (let i = 0; i < formTimeOut.length; i++) {
    if (formTimeOutValues[i].value === e.currentTarget.value) {
      formTimeOutValues[i].setAttribute(`selected`, true);
    }
  }
});

/* ВАЛИДАЦИЯ "Тип жилья" и "Цена за ночь" */
const formHousingTypeSelect = form.querySelector(`#type`);
const formPriceOfHousingTypeSelect = form.querySelector(`#price`);

const HOUSING_TYPE = {
  flat: `flat`,
  house: `house`,
  palace: `palace`,
  bungalow: `bungalow`,
};

const PRICE = {
  flat: `1000`,
  house: `5000`,
  palace: `10000`,
  bungalow: `0`,
};

formHousingTypeSelect.addEventListener(`change`, function (e) {
  switch (e.currentTarget.value) {
    case HOUSING_TYPE.palace:
      formPriceOfHousingTypeSelect.placeholder = PRICE.palace;
      formPriceOfHousingTypeSelect.setAttribute(`min`, PRICE.palace);
      break;

    case HOUSING_TYPE.bungalow:
      formPriceOfHousingTypeSelect.placeholder = PRICE.bungalow;
      formPriceOfHousingTypeSelect.setAttribute(`min`, PRICE.bungalow);
      break;

    case HOUSING_TYPE.flat:
      formPriceOfHousingTypeSelect.placeholder = PRICE.flat;
      formPriceOfHousingTypeSelect.setAttribute(`min`, PRICE.flat);
      break;

    case HOUSING_TYPE.house:
      formPriceOfHousingTypeSelect.placeholder = PRICE.house;
      formPriceOfHousingTypeSelect.setAttribute(`min`, PRICE.house);
      break;
  }
});

/* ЗАКРЫТИЕ POPUP */
const closePopup = popup.querySelector(`.popup__close`);
closePopup.addEventListener(`click`, function () {
  popup.hidden = true;
  closePopup.removeEventListener(`click`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    popup.hidden = true;
  }
  if (evt.key === `Enter`) {
    popup.hidden = false;
  }
  document.removeEventListener(`keydown`);
});


