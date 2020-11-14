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

  /* ВАЛИДАЦИЯ "Тип жилья" и "Цена за ночь" */
  const formHousingTypeSelect = host.querySelector(`#type`);
  const priceOfHousingTypeSelect = host.querySelector(`#price`);

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
    priceOfHousingTypeSelect.placeholder = price;
    priceOfHousingTypeSelect.setAttribute(`min`, price);
  });


  /* Деактивация формы */
  const deactivateForm = () => {
    document.querySelectorAll(`.map__pin[type='button']`).forEach((el) => (el.hidden = `true`));
    const formInputFields = host.querySelectorAll(`fieldset`);
    for (let i = 0; i < formInputFields.length; i++) {
      formInputFields[i].setAttribute(`disabled`, true);
    }
    host.classList.add(`ad-form--disabled`);
    window.map.deactive();
    window.map.hidePopup();
    host.reset();
    updateAddress((window.map.logoPin.getBoundingClientRect().x), (window.map.logoPin.getBoundingClientRect().y));
    window.map.logoPin.addEventListener(`mousedown`, window.map.onLogoPinMouseDown);
    window.map.logoPin.addEventListener(`keydown`, window.map.onLogoPinKeyDown);
  };

  // /* СООБЩЕНИЯ О РЕЗУЛЬТАТАХ ОТПРАВКИ ДАННЫХ*/
  const loadErrorTemplate = document.querySelector(`#error`).content;
  const customValidityMessage = document.querySelector(`#success`).content;

  const renderLoadSuccessTemplate = () => {
    const validityTemplateClone = customValidityMessage.cloneNode(true);
    const main = document.querySelector(`main`);
    main.prepend(validityTemplateClone);

    const closeTemplate = (evt) => {
      if ((evt.key === `Escape`) || (evt.which === 1)) {
        deactivateForm();
        closeLoadSuccessTemplate();
        inputs.forEach((el) => (el.style.border = ``));
      }
    };

    const closeLoadSuccessTemplate = () => {
      document.querySelector(`.success`).remove();
      document.removeEventListener(`click`, closeTemplate);
      document.removeEventListener(`keydown`, closeTemplate);
    };

    document.addEventListener(`click`, closeTemplate);
    document.addEventListener(`keydown`, closeTemplate);
  };

  const errorTemplate = () => {
    const errorTemplateClone = loadErrorTemplate.cloneNode(true);
    const main = document.querySelector(`main`);
    main.prepend(errorTemplateClone);

    const closeLoadErrorTemplate = () => {
      document.querySelector(`.error`).remove();
      document.removeEventListener(`keydown`, onDocumentEscPress);
      document.removeEventListener(`click`, onButtonCloseClick);
    };

    const onButtonCloseClick = () => closeLoadErrorTemplate();

    const onDocumentEscPress = (evt) => {
      if ((evt.key === `Escape`) || (evt.which === 1)) {
        closeLoadErrorTemplate();
      }
    };
    document.addEventListener(`keydown`, onDocumentEscPress);
    document.addEventListener(`click`, onButtonCloseClick);

  };
  /* КНОПКА СБРОСА */
  const formReset = document.querySelector(`.ad-form__reset`);
  formReset.addEventListener(`click`, deactivateForm);

  /* ВАЛИДАЦИЯ ГРАФ В ФОРМЕ */
  priceOfHousingTypeSelect.addEventListener(`change`, () => {
    const isValuePriceValid = Number(priceOfHousingTypeSelect.placeholder) > Number(priceOfHousingTypeSelect.value);
    if (isValuePriceValid) {
      priceOfHousingTypeSelect.setCustomValidity(`Введите другое значение`);
      priceOfHousingTypeSelect.style.border = `2px solid red`;
    } else {
      priceOfHousingTypeSelect.setCustomValidity(``);
      priceOfHousingTypeSelect.style.border = `2px solid green`;
    }
  });


  formTimeIn.addEventListener(`change`, () => {
    const isValueTimeValid = formTimeIn.value !== formTimeOut.value;
    if (isValueTimeValid) {
      formTimeOut.style.border = `2px solid red`;
      formTimeIn.setCustomValidity(`Введите другое значение`);
    } else {
      formTimeOut.style.border = `2px solid green`;
      formTimeIn.setCustomValidity(``);
    }
    formTimeOut.checkValidity();
  });

  /* Отоображение координат метки в графе `Адрес` */
  const addressForm = host.querySelector(`#address`);
  addressForm.setAttribute(`readonly`, true);
  const updateAddress = (x, y) => {
    addressForm.value = `${x}, ${y}`;
  };

  inputRoom.addEventListener(`change`, () => {
    const isCapacityOfTheHousingValid = inputRoom.value < inputCapacity.value;
    if (isCapacityOfTheHousingValid) {
      inputCapacity.setCustomValidity(`Введите другое значение `);
      inputCapacity.style.border = `2px solid red`;
    } else {
      inputCapacity.setCustomValidity(``);
      inputCapacity.style.border = `2px solid green`;
    }
  });

  let inputs = [priceOfHousingTypeSelect, formTimeOut, inputCapacity];

  host.addEventListener(`submit`, function (evt) {
    window.upload(new FormData(host), renderLoadSuccessTemplate, errorTemplate);
    evt.preventDefault();
  });

  window.form = {
    host,
    inputFields,
    activateTheAdCard,
    updateAddress,
    addressForm,
  };
})();
