"use strict";

(function () {

  /* ФОРМА ОБЪЯВЛЕНИЯ */
  const adForm = document.querySelector(`.ad-form`);

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

  /* ВАЛИДАЦИЯ "Время Заезда" и "Время Выезда" */
  const formTimeIn = adForm.querySelector(`#timein`);
  const formTimeOut = adForm.querySelector(`#timeout`);
  const formTimeOutValues = Array.from(formTimeOut);

  formTimeIn.addEventListener(`change`, function (e) {
    for (let i = 0; i < formTimeOut.length; i++) {
      if (formTimeOutValues[i].value === e.currentTarget.value) {
        formTimeOutValues[i].setAttribute(`selected`, true);
      }
    }
  });

  /* НЕАКТИВНЫЕ ЭЛЕМЕНТЫ ФОРМЫ  (ДОЛЖНЫ БЫТЬ) */
  const inputFields = adForm.querySelectorAll(`fieldset`);
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].setAttribute(`disabled`, true);
  }

  /* АКТИВАЦИЯ ФОРМЫ */
  const mapBooking = document.querySelector(`.map`);
  const activateMap = () => {
    mapBooking.classList.remove(`map--faded`);
    window.map.showPopup();
    window.form.adForm.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].removeAttribute(`disabled`);
    }
    const allPins = Array.from(document.querySelectorAll(`.map__pin`)); // пробовал через map,но ESLint не пропускает.Почему-то.
    for (let i = 0; i < allPins.length; i++) {
      allPins[i].hidden = false;
    }
    window.map.logoPin.removeEventListener(`keydown`, window.map.onLogoPinKeyDown);
    window.map.logoPin.removeEventListener(`mousedown`, window.map.onLogoPinMouseDown);
  };

  /* ВАЛИДАЦИЯ "Тип жилья" и "Цена за ночь" */
  const formHousingTypeSelect = adForm.querySelector(`#type`);
  const formPriceOfHousingTypeSelect = adForm.querySelector(`#price`);

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
    let price;
    switch (e.currentTarget.value) {
      case HOUSING_TYPE.palace:
        price = PRICE.palace;
        break;
      case HOUSING_TYPE.bungalow:
        price = PRICE.bungalow;
        break;
      case HOUSING_TYPE.flat:
        price = PRICE.flat;
        break;
      case HOUSING_TYPE.house:
        price = PRICE.house;
        break;
    }
    formPriceOfHousingTypeSelect.placeholder = price;
    formPriceOfHousingTypeSelect.setAttribute(`min`, price);
  });
  window.form = {
    adForm,
    activateMap,

  };
})();
