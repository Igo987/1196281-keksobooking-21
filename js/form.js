"use strict";

(function () {

  /* ФОРМА ОБЪЯВЛЕНИЯ */
  const form = document.querySelector(`.ad-form`);
  const fieldset = form.querySelectorAll(`fieldset`);

  /* НЕАКТИВНЫЕ ЭЛЕМЕНТЫ ФОРМЫ  (ДОЛЖНЫ БЫТЬ) */
  const inputFields = form.querySelectorAll(`fieldset`);

  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].setAttribute(`disabled`, true);
  }
  /* АКТИВАЦИЯ ФОРМЫ ПО ENTER И MOUSEDOWN */ // В FORM
  let mapBooking = document.querySelector(`.map`);
  const popup = document.querySelector(`.map__card`);
  let addressForm = form.querySelector(`#address`);
  const MAP_PIN_SIZE = 31; // половина ширины и высоты main pin (получаем её центр);
  addressForm.value = (window.map.logoPin.getBoundingClientRect().x - MAP_PIN_SIZE) + `,` + (window.map.logoPin.getBoundingClientRect().y - MAP_PIN_SIZE);
  popup.hidden = true;

  const activateMap = () => {
    mapBooking.classList.remove(`map--faded`);
    popup.hidden = false;
    form.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < inputFields.length; i++) {
      fieldset[i].removeAttribute(`disabled`);
    }
    window.map.logoPin.removeEventListener(`keydown`, onLogoPinKeyDown);
    window.map.logoPin.removeEventListener(`mousedown`, onLogoPinMouseDown);
  };

  window.map.logoPin.addEventListener(`mousemove`, function () {
    addressForm.value = (window.map.logoPin.getBoundingClientRect().x) + `,` + (window.map.logoPin.getBoundingClientRect().y);
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

  window.map.logoPin.addEventListener(`mousedown`, onLogoPinMouseDown);
  window.map.logoPin.addEventListener(`keydown`, onLogoPinKeyDown);

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
    closePopup.removeEventListener(`click`, closePopup);
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      popup.hidden = true;
    }
    if (evt.key === `Enter`) {
      popup.hidden = false;
    }
    document.removeEventListener(`keydown`, closePopup);
  });
})();
