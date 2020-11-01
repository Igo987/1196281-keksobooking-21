'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 1000;

  window.load = (onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, URL);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();

    const showErrorMessage = (message) => {
      const main = document.querySelector(`.promo`);
      const errorMessage = document.createElement(`div`);
      let errorText = document.createElement(`p`);
      errorMessage.style.width = `300px`;
      errorMessage.style.height = `100px`;
      errorMessage.style.borderRadius = `20px`;
      errorMessage.style.backgroundColor = `rgba(39,47,51, 0.5)`;
      errorMessage.style.hidden = true;
      errorMessage.style.visibility = `visible`;
      errorMessage.style.position = `relative`;
      errorMessage.style.top = `390px`;
      errorText.style.padding = `10% 20%`;
      errorText.style.color = `#fcfafb`;
      errorText.textContent = message;
      errorMessage.append(errorText);
      main.appendChild(errorMessage);
    };

    xhr.addEventListener(`timeout`, () => {
      let message = `За ${xhr.timeout} мс не удалось получить данные. Перезвоните позже.`;
      showErrorMessage(message);
    });

    xhr.addEventListener(`load`, () => {
      if (xhr.status !== 200) {
        let message = `Ошибка ${xhr.status}: ${xhr.statusText}`;
        showErrorMessage(message);
      }
      onSuccess(xhr.response);
    });
  };
})();
