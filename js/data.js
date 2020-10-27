'use strict';
(function () {

  /* количество комнат */
  const roomOptionElementsValue = Array.from(document.querySelector(`#housing-rooms`).children).map((el) => el.value);

  /* время заселения */
  const timesIn = Array.from(document.querySelector(`#timein`).children).map((el) => el.value);

  /*  время выселения */
  const timesOut = Array.from(document.querySelector(`#timeout`).children).map((el) => el.value);

  /* Фичи */
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

  /* Массив фотографий объекта */
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  /* Тип помещения */
  const PREMISES_TYPES = [`palace`, `flat`, `house`, `bungalow`];

  /* Число гостей */
  const GUESTS = Array.from(document.querySelector(`#housing-guests`).children).map((el) => el.value);

  /* текст ( свойство: описание объекта) */
  const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

  /* Генерация данных  объекта (объявления) */
  const getSomeObjects = () => {
    let result = [];
    for (let i = 1; i <= 8; i++) {
      const valueLocationX = window.util.getRandomIntInclusive(0, 1200);
      const valueLocationY = window.util.getRandomIntInclusive(0, 700);
      const address = `${valueLocationX}, ${valueLocationY}`;
      let newObject = {
        'author': {
          'avatar': `img/avatars/user0` + i + `.png`,
        },
        'offer': {
          'title': TEXT,
          'address': address,
          'price': window.util.getRandomIntInclusive(0, 60000),
          'type': window.util.getRandomElement(PREMISES_TYPES),
          'rooms': window.util.getRandomElement(roomOptionElementsValue),
          'guests': window.util.getRandomElement(GUESTS),
          'checkin': window.util.getRandomElement(timesIn),
          'checkout': window.util.getRandomElement(timesOut),
          'features': window.util.getRandomElements(FEATURES),
          'description': TEXT,
          'photos': window.util.getRandomElements(PHOTOS),
        },
        'location': {
          'x': valueLocationX,
          'y': valueLocationY,
        },
      };
      result.push(newObject);
    }
    return result;
  };
  const objects = getSomeObjects();
  window.data = {objects};
})();
