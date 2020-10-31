"use strict";

(function () {
  /* Добавление Объявления с данными из массива*/
  const mapPins = document.querySelector(`.map__pin`);
  const PIN_HEIGHT = 84;
  const PIN_HALF_WIDTH = 31;
  const pinsContainer = document.createDocumentFragment();

  /* ЗАКРЫТИЕ POPUP */
  const popup = document.querySelector(`.map__card`);
  const closePopup = popup.querySelector(`.popup__close`);
  // const allMapPins = document.querySelectorAll(`.map__pin`);

  const hidePopup = () => { // закрытие
    popup.hidden = true;
    closePopup.removeEventListener(`click`, onPopupClosePopupClick);
    document.removeEventListener(`keydown`, onPopupEscPress);
    document.querySelectorAll(`.map__pin`).forEach((el) => el.classList.remove(`map-pin--active`));
  };

  const showPopup = () => { // открытие
    popup.hidden = false;
    document.addEventListener(`keydown`, onPopupEscPress);
    closePopup.addEventListener(`click`, onPopupClosePopupClick);
  };

  const onPopupEscPress = document.addEventListener(`keydown`, function (evt) { // закрытие по Esc
    if (evt.key === `Escape`) {
      hidePopup();
    }
  });

  const onPopupClosePopupClick = closePopup.addEventListener(`click`, function () { // закрытие по клику на крестик
    hidePopup();
  });

  const renderPins = (objects) => {
    objects.forEach((item) => {
      const pin = document.querySelector(`#pin`).content;
      const newPin = pin.cloneNode(true);
      const image = newPin.querySelector(`img`);
      const mapPin = newPin.querySelector(`.map__pin`);
      image.src = item.author.avatar;
      mapPin.style.left = item.location.x + PIN_HALF_WIDTH + `px`;
      mapPin.style.top = item.location.y + PIN_HEIGHT + `px`;
      image.alt = item.offer.title;
      pinsContainer.append(mapPin);
      mapPin.addEventListener(`click`, () => {
        document.querySelectorAll(`.map__pin`).forEach((el) => el.classList.remove(`map-pin--active`));
        mapPin.classList.add(`map-pin--active`);
        window.card.render(item);
        showPopup();
      });
      mapPins.after(pinsContainer);
      mapPin.hidden = true;
    });
  };
  window.load(renderPins); // пока без второго параметра


  /* АКТИВАЦИЯ ФОРМЫ ПО ENTER И MOUSEDOWN */
  const logoPin = document.querySelector(`.map__pin--main`);
  const addressForm = window.form.adForm.querySelector(`#address`);
  const MAP_PIN_SIZE = 31; // половина ширины и высоты main pin (получаем её центр);
  addressForm.value = (logoPin.getBoundingClientRect().x - MAP_PIN_SIZE) + `,` + (logoPin.getBoundingClientRect().y - MAP_PIN_SIZE);
  popup.hidden = true;

  const onLogoPinMouseDown = (evt) => {
    if (evt.button !== 0) {
      return;
    }
    window.form.activateMap();
  };

  const onLogoPinKeyDown = (evt) => {
    if (evt.key !== `Enter`) {
      return;
    }
    window.form.activateMap();
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
      addressForm.value = (logoPin.getBoundingClientRect().x) + `,` + (logoPin.getBoundingClientRect().y);

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

      const UPPER_LIMIT_Y_LOGOPIN = `130px`;
      const LOWER_LIMIT_Y_LOGOPIN = `630px`;
      if (logoPin.style.top < UPPER_LIMIT_Y_LOGOPIN) {
        logoPin.style.top = UPPER_LIMIT_Y_LOGOPIN;
      }
      if (logoPin.style.top > LOWER_LIMIT_Y_LOGOPIN) {
        logoPin.style.top = LOWER_LIMIT_Y_LOGOPIN;
      }

      // const LEFT_LIMIT_X_LOGOPIN = `0px`; // ТЗ: Значение X-координаты адреса должно быть ограничено размерами блока, в котором перемещается метка. Размер блока 1200px;
      // const RIGTH_LIMIT_X_LOGOPIN = `1169px`; // 1200 - 31 (PIN_HALF_WIDTH). По идее, это центр метки, т.к. её ширина 62px.
      // if (logoPin.style.left < LEFT_LIMIT_X_LOGOPIN) {
      //   logoPin.style.left = LEFT_LIMIT_X_LOGOPIN;
      // }
      // if (logoPin.style.left > RIGTH_LIMIT_X_LOGOPIN) {
      //   logoPin.style.left = RIGTH_LIMIT_X_LOGOPIN;
      // }
    };
    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.map = {
    logoPin,
    popup,
    showPopup,
    onLogoPinMouseDown,
    onLogoPinKeyDown
  };
})();
