"use strict";

(function () {
  window.util = {
    /* Функция получения случайного целого числа в диапозоне */
    getRandomIntInclusive: function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /* Функция получения случайного элемента */
    getRandomElement: function getRandomElement(arr) {
      return arr[window.util.getRandomIntInclusive(0, arr.length - 1)];
    },
    /* Функция получения определенного количества случайных элементов массива */
    getRandomElements: function getRandomElements(arr) {
      let arrCopy = [...arr];
      let result = [];
      let randomElementCount = window.util.getRandomIntInclusive(1, arr.length);
      for (let i = 0; i < randomElementCount; i++) {
        let randomIndex = window.util.getRandomIntInclusive(0, arrCopy.length - 1);
        let elementToAdd = arrCopy.splice(randomIndex, 1);
        result.push(elementToAdd);
      }
      return result;
    }
  };
})();
