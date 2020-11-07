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

  // /* ВАЛИДАЦИЯ ФОРМЫ */
  // const inputsForm = host.querySelectorAll(`input`);
  // const buttonSubmit = host.querySelector(`.ad-form__submit`); // кнопка отправки формы объявлений
  // let customValidityMessage = document.querySelector(`#error`).content;

  // buttonSubmit.addEventListener(`click`, function () {
  //   const a = formPriceOfHousingTypeSelect.placeholder < formPriceOfHousingTypeSelect.value;
  //   for (let i = 0; inputsForm.length > i; i++) {
  //     const inputForm = inputsForm[i]; // все инпуты в форме
  //     if (inputForm.checkValidity() === false || a) { // если поле не проходит валидацию или если введенное значение цены за ночь меньше минимального (оно содержится в placeholder)
  //     // host.reportValidity();
  //       const clone = customValidityMessage.cloneNode(true);
  //       const main = document.querySelector(`main`);
  //       const buttonClose = clone.querySelector(`.error__button`);
  //       main.prepend(clone); // беру такой и показываю сообщение об ошибке (взятое из шаблона)

  //       const closeMessage = () => {
  //         document.querySelector(`.error`).hidden = `false`; // здесь закрытие сообщения об ошибке
  //         buttonClose.removeEventListener(`click`, onButtonCloseClick);
  //         document.removeEventListener(`keydown`, onDocumentEscPress);
  //       };

  //       const onButtonCloseClick = () => closeMessage();

  //       buttonClose.addEventListener(`click`, onButtonCloseClick);

  //       const onDocumentEscPress = (evt) => { // закрытие по Esc
  //         if (evt.key === `Escape`) {
  //           closeMessage();
  //         }

  //       };
  //       document.addEventListener(`keydown`, onDocumentEscPress);
  //       window.map.hidePopup(); // закрываю и popup
  //       host.preventDefault(); // прерываю отправку формы
  //     }
  //   }
  // });

  /* Деактивация формы */
  const deactivateForm = () => {
    const formInputFields = host.querySelectorAll(`fieldset`);
    for (let i = 0; i < formInputFields.length; i++) {
      formInputFields[i].setAttribute(`disabled`, true);
    }
    host.classList.add(`ad-form--disabled`);
    window.map.mapBooking.classList.add(`map--faded`);
    window.map.hidePopup();
    host.reset();
    updateAddress(window.map.pinBoundingRect.x, window.map.pinBoundingRect.y);
  };

  /* Отоображение координат метки в графе `Адрес` */
  const addressForm = host.querySelector(`#address`);
  const updateAddress = (x, y) => {
    addressForm.value = `${x}, ${y}`;
  };

  /* КНОПКА СБРОСА */
  const formReset = document.querySelector(`.ad-form__reset`);
  formReset.addEventListener(`click`, () => {
    deactivateForm();
  });

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
    activateForm,
    updateAddress,
    addressForm,
    getFormNotActive: deactivateForm,

  };
})();
