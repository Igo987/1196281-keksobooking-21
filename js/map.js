"use strict";

(function () {
  /* Добавление объявления с данными из массива*/
  const mapPins = document.querySelector(`.map__pin`);
  const PIN_HEIGHT = 84;
  const PIN_HALF_WIDTH = 32;
  const pinsContainer = document.createDocumentFragment();

  /* ОТРИСОВКА ОБЪЯВЛЕНИЯ */ // В МОДУЛЬ MAP
  window.data.objects.forEach(function (item) {
    const pin = document.querySelector(`#pin`).content;
    const newPin = pin.cloneNode(true);
    const image = newPin.querySelector(`img`);
    const mapPin = newPin.querySelector(`.map__pin`);
    image.src = item.author.avatar;
    mapPin.style.left = item.location.x + PIN_HALF_WIDTH + `px`;
    mapPin.style.top = item.location.y + PIN_HEIGHT + `px`;
    image.alt = item.offer.title;
    pinsContainer.append(mapPin);
    mapPins.after(pinsContainer);
    mapPin.addEventListener(`click`, () => window.card.render(item));

  });

  /* НЕАКТИВНЫЕ ЭЛЕМЕНТЫ ФОРМЫ  (ДОЛЖНЫ БЫТЬ) */
  const inputFields = window.form.form.querySelectorAll(`fieldset`);
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].setAttribute(`disabled`, true);
  }

  /* АКТИВАЦИЯ ФОРМЫ ПО ENTER И MOUSEDOWN */
  let logoPin = document.querySelector(`.map__pin--main`);
  let mapBooking = document.querySelector(`.map`);
  const popup = document.querySelector(`.map__card`);
  let addressForm = window.form.form.querySelector(`#address`);
  const MAP_PIN_SIZE = 31; // половина ширины и высоты main pin (получаем её центр);
  addressForm.value = (logoPin.getBoundingClientRect().x - MAP_PIN_SIZE) + `,` + (logoPin.getBoundingClientRect().y - MAP_PIN_SIZE);
  popup.hidden = true;

  const activateMap = () => {
    mapBooking.classList.remove(`map--faded`);
    popup.hidden = false;
    window.form.form.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].removeAttribute(`disabled`);
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

  /* ПЕРЕМЕЩЕНИЕ МЕТКИ */

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
  });

  /* ЗАКРЫТИЕ POPUP */
  const closePopup = popup.querySelector(`.popup__close`);

  const closePin = () => { // закрытие hidden = true;
    popup.hidden = true;
    closePopup.removeEventListener(`click`, onPopupClosePopupClick);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const openNewPin = () => { // открытие
    popup.hidden = false;
    mapPins.removeEventListener(`keydown`, onPopupEnterPress);
  };

  const onPopupEnterPress = mapPins.addEventListener(`keydown`, function (evt) { // открытие по Enter
    if (evt.key === `Enter`) {
      openNewPin();
    }
  });

  const onPopupEscPress = document.addEventListener(`keydown`, function (evt) { // закрытие по Esc
    if (evt.key === `Escape`) {
      closePin();
    }
  });

  const onPopupClosePopupClick = closePopup.addEventListener(`click`, function () { // закрытие по клику на крестик
    closePin();
  });

  window.map = {
    logoPin,
    popup
  };
})();
