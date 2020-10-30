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

    const showErrorMessage = () => {
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
      main.appendChild(errorMessage);
      errorMessage.append(errorText);
      errorText.textContent = `Ошибка ${xhr.status}: ${xhr.statusText}`;
    };

    const showErrorMessageTimeOut = () => {
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
      main.appendChild(errorMessage);
      errorMessage.append(errorText);
      errorText.textContent = `Запрос не успел выполниться за ` + xhr.timeout + `мс`;
    };


    xhr.addEventListener(`timeout`, function () {
      showErrorMessageTimeOut();
    });

    xhr.addEventListener(`load`, function () {
      if (xhr.status !== 200) {
        showErrorMessage();
      }

      onSuccess(xhr.response);
    });
  };
})();
