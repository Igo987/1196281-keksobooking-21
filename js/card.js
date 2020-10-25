'use strict';
(function () {
  /* блок объявлений */
  const filterContainers = document.querySelector(`.map__filters-container`);
  const card = document.querySelector(`#card`).content; // шаблон объявления
  const newCard = card.cloneNode(true); // клонирование шаблона
  const cardTitle = newCard.querySelector(`.popup__title`); // заголовок
  const cardAddress = newCard.querySelector(`.popup__text--address`); // адрес
  const cardPrice = newCard.querySelector(`.popup__text--price`); // цена {{offer.price}}₽/ночь
  const cardPromyseType = newCard.querySelector(`.popup__type`); // тип жилья прописать соответствие
  const cardOffer = newCard.querySelector(`.popup__text--capacity`); // вместимость {{offer.rooms}} комнаты для {{offer.guests}} гостей
  const features = newCard.querySelector(`.popup__features`); // фичи
  const cardTimesInOut = newCard.querySelector(`.popup__text--time`); // время заезда-выезда Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}
  const cardDescription = newCard.querySelector(`.popup__description`); // описание
  const cardPhotos = newCard.querySelector(`.popup__photos`); // блок фото
  const cardPhoto = newCard.querySelector(`.popup__photo`); // фотографии
  const cardAvatar = newCard.querySelector(`.popup__avatar`); // аватар

  /* ВСТАВКА КАРТОЧКИ ОБЪЯВЛЕНИЯ */
  filterContainers.prepend(newCard);

  const getGuestsText = (param) => {
    const GUESTS_COUNT_TEXT_RU = {
      any: `любое число`,
      2: `двоих`,
      1: `одного`,
      0: `не для`,
    };
    return GUESTS_COUNT_TEXT_RU[param];
  };

  const getRoomsText = (param) => {
    const ROOMS_COUNT_TEXT_RU = {
      any: `любое число`,
      1: `одна`,
      2: `две`,
      3: `три`,
    };
    return ROOMS_COUNT_TEXT_RU[param];
  };

  /* ГЕНЕРАЦИЯ ОБЪЕКТА */
  let renderCard = (object) => {
    cardAvatar.src = object.author.avatar;
    cardTitle.textContent = object.offer.title;
    cardAvatar.src = object.author.avatar;
    cardTitle.textContent = object.offer.title;
    cardAddress.textContent = object.offer.address;
    cardPrice.textContent = `Цена ` + object.offer.price + ` ₽/ночь`;
    cardOffer.textContent = getRoomsText(`${object.offer.rooms.toString()}`) + ` комнаты для ` + getGuestsText(`${object.offer.guests.toString()}`) + ` гостей`;
    cardTimesInOut.textContent = `Заезд после ` + `${object.offer.checkin}` + ` ,выезд до ` + `${object.offer.checkout}`;
    cardDescription.textContent = object.offer.description;

    switch (object.offer.type) {
      case `palace`:
        cardPromyseType.textContent = `Дворец`;
        break;
      case `bungalow`:
        cardPromyseType.textContent = `Бунгало`;
        break;
      case `flat`:
        cardPromyseType.textContent = `Квартира`;
        break;
      case `house`:
        cardPromyseType.textContent = `Дом`;
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

  window.card = {
    render: renderCard,
  };
})();


