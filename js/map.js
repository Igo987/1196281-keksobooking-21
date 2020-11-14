"use strict";

(function () {
  /* Добавление Объявления с данными из массива*/
  const mapPins = document.querySelector(`.map__pin`);
  const PIN_HEIGHT = 84;
  const PIN_HALF_WIDTH = 31;
  const pinsContainer = document.createDocumentFragment();
  const pinActiveClass = `map-pin--active`; // active pin
  /* ЗАКРЫТИЕ POPUP */
  const popup = document.querySelector(`.map__card`);
  const closePopup = popup.querySelector(`.popup__close`);
  const hidePopup = () => { // закрытие
    popup.hidden = true;
    closePopup.removeEventListener(`click`, onPopupClosePopupClick);
    document.removeEventListener(`keydown`, onPopupEscPress);
    document.querySelectorAll(`.map__pin`).forEach((el) => el.classList.remove(pinActiveClass));
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
        document.querySelectorAll(`.map__pin`).forEach((el) => el.classList.remove(pinActiveClass));
        mapPin.classList.add(`map-pin--active`);
        window.card.render(item);
        showPopup();
      });
      mapPins.after(pinsContainer);
    });
  };

  let objects = [];
  const onLoad = (data) => {
    objects = data;
    renderPins(objects);
  };

  const filterHousingType = (evt) => {
    let selectedСategory = [];
    let MAX_LENGTH = 5;
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].offer.type === evt.currentTarget.value) {
        selectedСategory.push(objects[i]);
        if (selectedСategory.length <= MAX_LENGTH) {
          document.querySelectorAll(`.map__pin[type='button']`).forEach((el) => (el.remove()));
          renderPins(selectedСategory);
        } else {
          let maxLength = selectedСategory.slice(0, MAX_LENGTH);
          renderPins(maxLength);
        }
      } else if (evt.currentTarget.value === `any`) {
        renderPins(objects);
      }
    }
  };

  const selectHousingType = document.querySelector(`#housing-type`); // Тип жилья
  // const selectHousingPrice = document.querySelector(`#housing-price`);
  // const selectHousingRooms = document.querySelector(`#housing-rooms`);
  // const selectHousinGuests = document.querySelector(`#housing-guests`);

  selectHousingType.addEventListener(`change`, filterHousingType);

  /* АКТИВАЦИЯ ФОРМЫ */
  const mapBooking = document.querySelector(`.map`);

  const fadeMap = () => {
    mapBooking.classList.add(`map--faded`);
  };

  const activateMap = () => {
    window.load(onLoad);
    mapBooking.classList.remove(`map--faded`);
    window.map.showPopup();
    window.form.activateTheAdCard();
    logoPin.removeEventListener(`keydown`, onLogoPinKeyDown);
    logoPin.removeEventListener(`mousedown`, onLogoPinMouseDown);
  };

  /* АКТИВАЦИЯ ФОРМЫ ПО ENTER И MOUSEDOWN */
  const logoPin = document.querySelector(`.map__pin--main`);
  const MAP_PIN_SIZE = 31; // половина ширины и высоты main pin (получаем её центр);
  const pinBoundingRect = logoPin.getBoundingClientRect();
  window.form.updateAddress(pinBoundingRect.x - MAP_PIN_SIZE, pinBoundingRect.y - MAP_PIN_SIZE);
  popup.hidden = true;

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
      window.form.updateAddress((logoPin.getBoundingClientRect().x), (logoPin.getBoundingClientRect().y));

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      /* Ограничение передвижения метки */
      /* Вертикаль*/

      const logoPinStyleX = logoPin.style.left;
      const logoPinStyleY = logoPin.style.top;

      let logoPinCoordinatesX = Number(logoPinStyleX.slice(0, -2)) - shift.x;
      let logoPinCoordinatesY = Number(logoPinStyleY.slice(0, -2)) - shift.y;

      const UPPER_LIMIT_Y_LOGOPIN = 130;
      const LOWER_LIMIT_Y_LOGOPIN = 630;
      if (logoPinCoordinatesY < UPPER_LIMIT_Y_LOGOPIN) {
        logoPinCoordinatesY = `${UPPER_LIMIT_Y_LOGOPIN}px`;
      } else if (logoPinCoordinatesY > LOWER_LIMIT_Y_LOGOPIN) {
        logoPinCoordinatesY = `${LOWER_LIMIT_Y_LOGOPIN}px`;
      }
      logoPin.style.top = `${logoPinCoordinatesY}px`;
      /* Горизонталь */
      const LEFT_LIMIT_X_LOGOPIN = -31;
      const RIGTH_LIMIT_X_LOGOPIN = 1169;

      if (logoPinCoordinatesX < LEFT_LIMIT_X_LOGOPIN) {
        logoPinCoordinatesX = LEFT_LIMIT_X_LOGOPIN;

      } else if (logoPinCoordinatesX > RIGTH_LIMIT_X_LOGOPIN) {
        logoPinCoordinatesX = RIGTH_LIMIT_X_LOGOPIN;
      }

      logoPin.style.left = `${logoPinCoordinatesX}px`;
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
    onLogoPinKeyDown,
    deactive: fadeMap,
    hidePopup,
    activateMap,
  };
})();
