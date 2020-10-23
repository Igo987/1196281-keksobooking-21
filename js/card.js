'use strict';
(function () {
  /* блок объявлений */
  const filterContainers = document.querySelector(`.map__filters-container`);
  const card = document.querySelector(`#card`).content; // шаблон объявления
  const newCard = card.cloneNode(true); // клонирование шаблона
  let cardTitle = newCard.querySelector(`.popup__title`); // заголовок
  let cardAddress = newCard.querySelector(`.popup__text--address`); // адрес
  let cardPrice = newCard.querySelector(`.popup__text--price`); // цена {{offer.price}}₽/ночь
  let cardPromyseType = newCard.querySelector(`.popup__type`); // тип жилья прописать соответствие
  let cardOffer = newCard.querySelector(`.popup__text--capacity`); // вместимость {{offer.rooms}} комнаты для {{offer.guests}} гостей
  let features = newCard.querySelector(`.popup__features`); // фичи
  let cardTimesInOut = newCard.querySelector(`.popup__text--time`); // время заезда-выезда Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}
  let cardDescription = newCard.querySelector(`.popup__description`); // описание
  let cardPhotos = newCard.querySelector(`.popup__photos`); // блок фото
  let cardPhoto = newCard.querySelector(`.popup__photo`); // фотографии
  let cardAvatar = newCard.querySelector(`.popup__avatar`); // аватар
  /* ВСТАВКА КАРТОЧКИ ОБЪЯВЛЕНИЯ */
  filterContainers.prepend(newCard);

  /* ГЕНЕРАЦИЯ ОБЪЕКТА */
  let renderCard = (object) => {
    cardAvatar.src = object.author.avatar;
    cardTitle.textContent = object.offer.title;
    cardAvatar.src = object.author.avatar;
    cardTitle.textContent = object.offer.title;
    cardAddress.textContent = object.offer.address;
    cardPrice.textContent = `Цена ` + object.offer.price + ` ₽/ночь`;
    cardOffer.textContent = `${object.offer.rooms}` + ` комнаты для ` + `${object.offer.guests}` + ` гостей`;
    cardTimesInOut.textContent = `Заезд после ` + `${object.offer.checkin}` + ` ,выезд до ` + `${object.offer.checkout}`;
    cardDescription.textContent = object.offer.description;
    switch (object.offer.type) {
      case `palace`: cardPromyseType.textContent = `Дворец`;
        break;
      case `bungalow`: cardPromyseType.textContent = `Бунгало`;
        break;
      case `flat`: cardPromyseType.textContent = `Квартира`;
        break;
      case `house`: cardPromyseType.textContent = `Дом`;
    }
    while (cardPhotos.firstChild) {
      cardPhotos.removeChild(cardPhotos.lastChild);
    }
    for (let i = 0; i < object.offer.photos.length; i++) {
      let clonePhoto = cardPhoto.cloneNode(false);
      cardPhotos.append(clonePhoto);
      clonePhoto.src = object.offer.photos[i];
    }
    let valueFeatures = object.offer.features;
    features.innerHTML = ``;
    for (let j = 0; j < valueFeatures.length; j++) {
      const featuresButton = document.createElement(`li`);
      featuresButton.classList.add(`popup__feature`, `popup__feature--` + valueFeatures[j]);
      features.append(featuresButton);
    }
  };
  window.card = {renderCard};
})();


