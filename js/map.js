"use strict";

(function () {
  /* Добавление объявления с данными из массива*/
  const mapPins = document.querySelector(`.map__pin`);
  const PIN_HEIGHT = 84;
  const PIN_HALF_WIDTH = 32;

  /* ОТРИСОВКА ОБЪЯВЛЕНИЯ */ // В МОДУЛЬ MAP
  window.data.newArrObjects.forEach(function (item) {
    const pin = document.querySelector(`#pin`).content;
    const newPin = pin.cloneNode(true);
    const image = newPin.querySelector(`img`);
    const mapPin = newPin.querySelector(`.map__pin`);
    image.src = item.author.avatar;
    mapPin.style.left = item.location.x + PIN_HALF_WIDTH + `px`;
    mapPin.style.top = item.location.y + PIN_HEIGHT + `px`;
    image.alt = item.offer.title;
    mapPins.append(mapPin);
    mapPin.addEventListener(`click`, () => window.card.renderCard(item));
  });

  /* ПЕРЕМЕЩЕНИЕ МЕТКИ */ // В MAP
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
  window.map = {
    logoPin};
})();
