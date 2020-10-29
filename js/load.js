'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 1000;

  let main = document.querySelector(`.promo`);
  let errorMessage = document.createElement(`div`);
  main.appendChild(errorMessage);
  let errorText = document.createElement(`p`);
  errorMessage.append(errorText);
  errorMessage.style.width = `300px`;
  errorMessage.style.height = `100px`;
  errorMessage.style.borderRadius = `20px`;
  errorMessage.style.backgroundColor = `rgba(39,47,51, 0.5)`;
  errorMessage.style.hidden = true;
  errorMessage.style.visibility = `hidden`;
  errorMessage.style.position = `relative`;
  errorMessage.style.top = `390px`;
  errorText.style.padding = `10% 20%`;
  errorText.style.color = `#fcfafb`;

  window.load = function (onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, URL);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();

    xhr.addEventListener(`load`, function () {
      if (xhr.status !== 200) {
        errorText.textContent = `Ошибка ${xhr.status}: ${xhr.statusText}`;
        errorMessage.style.visibility = `visible`;
      }

      xhr.addEventListener(`timeout`, function () {
        errorText.textContent = `Запрос не успел выполниться за ` + xhr.timeout + `мс`;
        errorMessage.style.visibility = `visible`;
      });

      onSuccess(xhr.response);
    });
  };
})();

//
