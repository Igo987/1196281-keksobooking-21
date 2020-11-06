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

  /* ВАЛИДАЦИЯ ФОРМЫ ПРИ ОТПРАВКЕ */
  const inputsForm = host.querySelectorAll(`input`);
  const buttonSubmit = host.querySelector(`.ad-form__submit`); // кнопка отправки формы объявлений
  const customValidityMessageError = document.querySelector(`#error`).content;
  const customValidityMessage = document.querySelector(`#success`).content;

  const successMessage = () => {
    const cloneValidityTemplate = customValidityMessage.cloneNode(true);
    const main = document.querySelector(`main`);
    main.prepend(cloneValidityTemplate);
    resetForm();
  };

  const errorMessage = () => {
    const cloneErrorTemplate = customValidityMessageError.cloneNode(true);
    const main = document.querySelector(`main`);
    main.prepend(cloneErrorTemplate);
  };

  // const onButtonCloseClick = () => closeErrorMessage();

  // const onDocumentEscPress = (evt) =>{
  //   if (evt.key === `Escape`) {
  //     closeErrorMessage();
  //   }
  // };
  // document.addEventListener(`keydown`, onDocumentEscPress);

  // const closeErrorMessage = () => {
  //   const cloneErrorTemplate = customValidityMessageError.cloneNode(true);
  //   document.querySelector(`.error`).hidden = `false`;
  //   const buttonClose = cloneErrorTemplate.querySelector(`.error__button`);
  //   buttonClose.addEventListener(`click`, onButtonCloseClick);
  //   buttonClose.removeEventListener(`click`, onButtonCloseClick);
  //   document.removeEventListener(`keydown`, onDocumentEscPress);
  // };

  /* КНОПКА СБРОСА */
  const formReset = document.querySelector(`.ad-form__reset`);
  const resetForm = () => {
    formReset.addEventListener(`click`, () => {
      host.reset();
      updateAddress((window.map.logoPin.getBoundingClientRect().x), (window.map.logoPin.getBoundingClientRect().y));
    });
  };

  buttonSubmit.addEventListener(`click`, function () {
    const validValuePrice = Number(formPriceOfHousingTypeSelect.placeholder) <= Number(formPriceOfHousingTypeSelect.value);
    const validValueTime = formTimeIn.value === formTimeOut.value;
    const capacityOfTheHousing = inputCapacity.value <= inputRoom.value;
    inputsForm.forEach((input) => {
      input.addEventListener(`change`, () => {
        if (validValuePrice !== true || validValueTime !== true || capacityOfTheHousing !== true) {
          input.style.border = `2px solid red`;
          errorMessage();

          const closeErrorMessage = () => {
            const cloneErrorTemplate = customValidityMessageError.cloneNode(true);
            document.querySelector(`.error`).hidden = `false`;
            const buttonClose = cloneErrorTemplate.querySelector(`.error__button`);
            buttonClose.addEventListener(`click`, onButtonCloseClick);
            buttonClose.removeEventListener(`click`, onButtonCloseClick);
            document.removeEventListener(`keydown`, onDocumentEscPress);
          };

          const onButtonCloseClick = () => closeErrorMessage();

          const onDocumentEscPress = (evt) => {
            if (evt.key === `Escape`) {
              closeErrorMessage();
            }
          };
          document.addEventListener(`keydown`, onDocumentEscPress);


          window.map.hidePopup();
        } else {
          host.preventDefault();
          window.map.hidePopup();
          successMessage();
        }
      });
    });
  });

  /* Деактивация формы */
  const getFormNotActive = () => {
    const FormInputFields = host.querySelectorAll(`fieldset`);
    for (let i = 0; i < FormInputFields.length; i++) {
      FormInputFields[i].setAttribute(`disabled`, true);
    }
    host.classList.add(`ad-form--disabled`);
    window.map.mapBooking.classList.add(`map--faded`);
    window.map.hidePopup();
    host.reset();
    updateAddress((window.map.logoPin.getBoundingClientRect().x), (window.map.logoPin.getBoundingClientRect().y));
  };

  /* Отоображение координат метки в графе `Адрес` */
  const addressForm = host.querySelector(`#address`);
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
    inputsForm,

  };
})();
