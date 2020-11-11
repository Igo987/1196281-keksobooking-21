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

  const bringingToTheActiveState = () => {
    host.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].removeAttribute(`disabled`);
    }
  };

  /* ВАЛИДАЦИЯ "Тип жилья" и "Цена за ночь" */
  const formHousingTypeSelect = host.querySelector(`#type`);
  const PriceOfHousingTypeSelect = host.querySelector(`#price`);

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
    PriceOfHousingTypeSelect.placeholder = price;
    PriceOfHousingTypeSelect.setAttribute(`min`, price);
  });


  /* Деактивация формы */
  const toEnableADisabledState = () => {
    document.querySelectorAll(`.map__pin[type='button']`).forEach((el) => (el.hidden = `true`));
    const FormInputFields = host.querySelectorAll(`fieldset`);
    for (let i = 0; i < FormInputFields.length; i++) {
      FormInputFields[i].setAttribute(`disabled`, true);
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
  // const buttonSubmit = host.querySelector(`.ad-form__submit`); // кнопка отправки формы объявлений
  const loadErrorTemplate = document.querySelector(`#error`).content;
  const customValidityMessage = document.querySelector(`#success`).content;

  const loadSuccessTemplate = () => {
    const cloneValidityTemplate = customValidityMessage.cloneNode(true);
    const main = document.querySelector(`main`);
    main.prepend(cloneValidityTemplate);

    const closeTemplate = (evt) => {
      if ((evt.key === `Escape`) || (evt.which === 1)) {
        toEnableADisabledState();
        closeLoadSuccessTemplate();
        massiveInputs.forEach((el) => (el.style.border = ``));
      }
    };

    const closeLoadSuccessTemplate = () => {
      document.querySelector(`.success`).hidden = `true`;
      document.removeEventListener(`click`, closeTemplate);
      document.removeEventListener(`keydown`, closeTemplate);
    };

    document.addEventListener(`click`, closeTemplate);
    document.addEventListener(`keydown`, closeTemplate);
  };

  const errorTemplate = () => {
    const cloneErrorTemplate = loadErrorTemplate.cloneNode(true);
    const main = document.querySelector(`main`);
    main.prepend(cloneErrorTemplate);
    const buttonCloseErrorTemplate = document.querySelector(`.error__button`);

    const closeLoadErrorTemplate = () => {
      document.querySelector(`.error`).hidden = `true`;
      document.removeEventListener(`keydown`, onDocumentEscPress);
      buttonCloseErrorTemplate.removeEventListener(`click`, onButtonCloseClick);
    };

    const onButtonCloseClick = () => closeLoadErrorTemplate();


    const onDocumentEscPress = (evt) => {
      if ((evt.key === `Escape`) || (evt.which === 1)) {
        closeLoadErrorTemplate();
      }
    };
    document.addEventListener(`keydown`, onDocumentEscPress);
    buttonCloseErrorTemplate.addEventListener(`click`, onButtonCloseClick);

  };
  /* КНОПКА СБРОСА */
  const formReset = document.querySelector(`.ad-form__reset`);
  formReset.addEventListener(`click`, toEnableADisabledState);

  /* ВАЛИДАЦИЯ ГРАФ В ФОРМЕ */
  PriceOfHousingTypeSelect.addEventListener(`change`, () => {
    const isValuePriceValid = Number(PriceOfHousingTypeSelect.placeholder) > Number(PriceOfHousingTypeSelect.value);
    if (isValuePriceValid) {
      PriceOfHousingTypeSelect.setCustomValidity(`Введите другое значение`);
      PriceOfHousingTypeSelect.style.border = `2px solid red`;
    } else {
      (PriceOfHousingTypeSelect.setCustomValidity(``));
      PriceOfHousingTypeSelect.style.border = `2px solid green`;
    }
    PriceOfHousingTypeSelect.checkValidity();
  });


  formTimeIn.addEventListener(`change`, () => {
    const isValueTimeValid = formTimeIn.value !== formTimeOut.value;
    if (isValueTimeValid) {
      formTimeOut.style.border = `2px solid red`;
    } else {
      formTimeOut.style.border = `2px solid green`;
    }
    formTimeOut.checkValidity();
  });

  /* Отоображение координат метки в графе `Адрес` */
  const addressForm = host.querySelector(`#address`);
  const updateAddress = (x, y) => {
    addressForm.value = `${x}, ${y}`;
    addressForm.setAttribute(`readonly`, true);

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
    inputCapacity.checkValidity();
  });

  let massiveInputs = [PriceOfHousingTypeSelect, formTimeOut, inputCapacity];

  host.addEventListener(`submit`, function (evt) {
    window.upload(new FormData(host), loadSuccessTemplate, errorTemplate);
    evt.preventDefault();
  });

  window.form = {
    host,
    inputFields,
    bringingToTheActiveState,
    updateAddress,
    addressForm,
    PriceOfHousingTypeSelect,
    inputCapacity,
    inputRoom,
    toEnableADisabledState,
    formReset,
    massiveInputs,
  };
})();
