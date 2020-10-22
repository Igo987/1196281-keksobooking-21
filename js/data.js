`use strict`;

(function () {
  window.data = {
    TEXT: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`,
    valueLocationX: window.util.getRandomIntInclusive(0, 1200),
    valueLocationY: window.util.getRandomIntInclusive(130, 630),
    getSomeObjects: getSomeObjects = () => {
      let newAdd = [];
      for (let i = 1; i <= 8; i++) {
        const valueLocationX = window.util.getRandomIntInclusive(0, 1200);
        const valueLocationY = window.util.getRandomIntInclusive(130, 630);
        const address = `${window.data.valueLocationX}, ${valueLocationY}`;
        let newObject = {
          'author': {
            'avatar': `img/avatars/user0` + i + `.png`,
          },
          'offer': {
            'title': window.data.TEXT,
            'address': address,
            'price': window.util.getRandomIntInclusive(0, 60000),
            'type': window.util.getRandomElement(PREMISES_TYPES),
            'rooms': window.util.getRandomElement(roomOptionElementsValue),
            'guests': window.util.getRandomElement(GUESTS),
            'checkin': window.util.getRandomElement(timesIn),
            'checkout': window.util.getRandomElement(timesOut),
            'features': window.util.getRandomElements(FEATURES),
            'description': window.data.TEXT,
            'photos': window.util.getRandomElements(PHOTOS),
          },
          'location': {
            'x': valueLocationX,
            'y': valueLocationY,
          },
        };
        newAdd.push(newObject);
      }
      return newAdd;
    },
    newArrObjects: getSomeObjects(),

    newPin: newArrObjects.forEach(function (item) {
      const pin = document.querySelector(`#pin`).content;
      const newPin = pin.cloneNode(true);
      const image = newPin.querySelector(`img`);
      const mapPin = newPin.querySelector(`.map__pin`);
      image.src = item.author.avatar;
      mapPin.style.left = item.location.x + PIN_HALF_WIDTH + `px`;
      mapPin.style.top = item.location.y + PIN_HEIGHT + `px`;
      image.alt = item.offer.title;
      mapPins.append(mapPin);
    }),
  };
})();
