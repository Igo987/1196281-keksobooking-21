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

  const activateForm = () => {
    host.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].removeAttribute(`disabled`);
    }
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


  /* Деактивация формы */
  const getFormNotActive = () => {
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
  // /* ВАЛИДАЦИЯ ФОРМЫ ПРИ ОТПРАВКЕ */
  const buttonSubmit = host.querySelector(`.ad-form__submit`); // кнопка отправки формы объявлений
  // const loadSuccessTemplate = document.querySelector(`#error`).content;
  // const customValidityMessage = document.querySelector(`#success`).content;

  // const renderSuccessMessage = () => {
  //   const cloneValidityTemplate = customValidityMessage.cloneNode(true);
  //   const main = document.querySelector(`main`);
  //   main.prepend(cloneValidityTemplate);
  //   resetForm();
  // };

  // const renderErrorMessage = () => {
  //   const cloneErrorTemplate = loadSuccessTemplate.cloneNode(true);
  //   const main = document.querySelector(`main`);
  //   main.prepend(cloneErrorTemplate);

  // const closeErrorMessage = () => {
  //   document.querySelector(`.error`).hidden = `false`;
  //   const buttonClose = cloneErrorTemplate.querySelector(`.error__button`);
  //   buttonClose.addEventListener(`click`, onButtonCloseClick);
  //   buttonClose.removeEventListener(`click`, onButtonCloseClick);
  //   document.removeEventListener(`keydown`, onDocumentEscPress);
  // };

  //   const onButtonCloseClick = () => closeErrorMessage();

  //   const onDocumentEscPress = (evt) => {
  //     if (evt.key === `Escape`) {
  //       closeErrorMessage();
  //     }
  //   };
  //   document.addEventListener(`keydown`, onDocumentEscPress);
  // };

  /* КНОПКА СБРОСА */
  const formReset = document.querySelector(`.ad-form__reset`);
  formReset.addEventListener(`click`, getFormNotActive);


  /* ВАЛИДАЦИЯ ГРАФ В ФОРМЕ */

  formPriceOfHousingTypeSelect.addEventListener(`change`, () => {
    const isValuePriceValid = Number(formPriceOfHousingTypeSelect.placeholder) > Number(formPriceOfHousingTypeSelect.value);
    if (isValuePriceValid) {
      formPriceOfHousingTypeSelect.setCustomValidity(`Введите другое значение`);
      formPriceOfHousingTypeSelect.style.border = `2px solid red`;
    } else {
      (formPriceOfHousingTypeSelect.setCustomValidity(``));
      formPriceOfHousingTypeSelect.style.border = `2px solid green`;
    }
    formPriceOfHousingTypeSelect.checkValidity();
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

  inputRoom.addEventListener(`change`, () => {
    const isCapacityOfTheHousingValid = inputRoom.value < inputCapacity.value;
    if (isCapacityOfTheHousingValid) {
      inputCapacity.setCustomValidity(`Введите другое значение `);
      inputCapacity.style.border = `2px solid red`;
    } else {
      inputCapacity.setCustomValidity(``);
      inputCapacity.style.border = `2px solid green`;
    }
    isCapacityOfTheHousingValid.checkValidity(); // ФЛАГ
  });

  let massiveInputsForm = [formPriceOfHousingTypeSelect, formTimeIn, inputRoom];

  // host.addEventListener(`submit`, function (evt) {

  //   // if (massiveInputsForm.map((el) => el.checkValidity()).some((item) => (item === false))) {

  //   // }


  // });


  /* Отоображение координат метки в графе `Адрес` */
  const addressForm = host.querySelector(`#address`);
  addressForm.setAttribute(`disabled`, true);
  const updateAddress = (x, y) => {
    addressForm.value = `${x}, ${y}`;
  };

  window.form = {
    host,
    inputFields,
    activateForm,
    updateAddress,
    addressForm,
    formPriceOfHousingTypeSelect,
    inputCapacity,
    inputRoom,
    getFormNotActive,
    formReset,
    massiveInputsForm

  };
})();
