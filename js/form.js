"use strict";

(function () {

  /* ФОРМА ОБЪЯВЛЕНИЯ */
  const host = document.querySelector(`.ad-form`);

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
  const formTimeIn = host.querySelector(`#timein`);
  const formTimeOut = host.querySelector(`#timeout`);
  const formTimeOutValues = Array.from(formTimeOut);

  formTimeIn.addEventListener(`change`, function (e) {
    for (let i = 0; i < formTimeOut.length; i++) {
      if (formTimeOutValues[i].value === e.currentTarget.value) {
        formTimeOutValues[i].setAttribute(`selected`, true);
      }
    }
  });

  /* НЕАКТИВНЫЕ ЭЛЕМЕНТЫ ФОРМЫ  (ДОЛЖНЫ БЫТЬ) */
  const inputFields = host.querySelectorAll(`fieldset`);
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].setAttribute(`disabled`, true);
  }

  const activateTheAdCard = () => {
    host.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].removeAttribute(`disabled`);
    }
  };
  const addressMapPin = host.querySelector(`#address`);
  addressMapPin.setAttribute(`readonly`, true);
  const updateAddress = (x, y) => {
    addressMapPin.value = `${x}, ${y}`;

  };

  /* ВАЛИДАЦИЯ "Тип жилья" и "Цена за ночь" */
  const formHousingTypeSelect = host.querySelector(`#type`);
  const formPriceOfHousingTypeSelect = host.querySelector(`#price`);

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
    host,
    inputFields,
    activateTheAdCard,
    updateAddress,
  };
})();
