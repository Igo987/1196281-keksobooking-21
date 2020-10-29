"use strict";

(function () {
  /* Добавление Объявления с данными из массива*/
  const mapPins = document.querySelector(`.map__pin`);
  const PIN_HEIGHT = 84;
  const PIN_HALF_WIDTH = 32;
  const pinsContainer = document.createDocumentFragment();

  /* ЗАКРЫТИЕ POPUP */
  const popup = document.querySelector(`.map__card`);
  const closePopup = popup.querySelector(`.popup__close`);

  const hidePopup = () => { // закрытие
    popup.hidden = true;
    closePopup.removeEventListener(`click`, onPopupClosePopupClick);
    document.removeEventListener(`keydown`, onPopupEscPress);
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

  /* ОТРИСОВКА ОБЪЯВЛЕНИЯ */
  let renderPins = (objects) => {
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
      mapPins.after(pinsContainer);
      mapPin.addEventListener(`click`, () => {
        mapPin.classList.add(`map__pin--main`); // элемент с мэйн только один, надо с остальных удалить
        window.card.render(item);
        showPopup();
      });
      mapPin.hidden = true;
    });
  };
  // renderPins(window.data.objects);
  window.load(renderPins); // пока без второго параметра


  /* НЕАКТИВНЫЕ ЭЛЕМЕНТЫ ФОРМЫ  (ДОЛЖНЫ БЫТЬ) */
  const inputFields = window.form.form.querySelectorAll(`fieldset`);
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].setAttribute(`disabled`, true);
  }

  /* АКТИВАЦИЯ ФОРМЫ ПО ENTER И MOUSEDOWN */
  let logoPin = document.querySelector(`.map__pin--main`);
  let mapBooking = document.querySelector(`.map`);
  let addressForm = window.form.form.querySelector(`#address`);
  const MAP_PIN_SIZE = 31; // половина ширины и высоты main pin (получаем её центр);
  addressForm.value = (logoPin.getBoundingClientRect().x - MAP_PIN_SIZE) + `,` + (logoPin.getBoundingClientRect().y - MAP_PIN_SIZE);
  popup.hidden = true;


  const activateMap = () => {
    mapBooking.classList.remove(`map--faded`);
    showPopup();
    window.form.form.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].removeAttribute(`disabled`);
    }
    const allPins = Array.from(document.querySelectorAll(`.map__pin`)); // пробовал через map,но ESLint не пропускает.Почему-то.
    for (let i = 0; i < allPins.length; i++) {
      allPins[i].hidden = false;
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


  window.map = {
    logoPin,
    popup
  };
})();
