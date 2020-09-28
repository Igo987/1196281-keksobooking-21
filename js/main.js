'use strict';
/* Удаление класса неактивного состояния у карты */
let Map = document.querySelector('.map');
Map.classList.remove('map--faded');


/* Функция получения случайного целого числа в диапозоне */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* получение случайного значения из массива возможного количества комнат */
const rooms = document.querySelector('#housing-rooms');
let roomsArray = [];
  for (let i = 0; i <= getRandomIntInclusive(0, rooms.length); i++) {
roomsArray = rooms[i].textContent;
};


/* получение случайного значения из массива возможного времени заселения */
const times = document.querySelector('#timein');
let timesArray = [];
  for (let i = 0; i <= getRandomIntInclusive(0, times.length); i++) {
timesArray = times[i].textContent;
};

/* получение случайного значения из массива возможного времени выселения */
const timesOut = document.querySelector('#timeout');
let timesArrayOut = [];
  for (let i = 0; i < getRandomIntInclusive(0,timesOut.length); i++) {
timesArrayOut = timesOut[i].textContent;
};


const templateAdd = document.querySelector('#card').content;
const address = templateAdd.querySelector('.popup__text--address').textContent;
const price = templateAdd.querySelector('.popup__text--price').textContent;


/* Фичи */
const featuresArr = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const newFeaturesArr = [];
  for (let i = 0; i <= getRandomIntInclusive(1,featuresArr.length); i++) {
newFeaturesArr.push(featuresArr[i]);
}

/* Массив фотографий объекта */
const photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const newPhotoArr = [];
for (let i = 0; i < getRandomIntInclusive(1,photos.length); i++) {
  newPhotoArr.push(photos[i]);
  }

/* Тип помещения */
const ArrType = ['palace', 'flat', 'house', 'bungalow'];
let newArrType = [];
for (let i = 0; i < getRandomIntInclusive(1,ArrType.length); i++) {
  newArrType = ArrType[i];
}

/* Число гостей */
const guests = ['Любое число гостей', 'Два гостя', 'Один гость', 'Не для гостей'];
let newArrGuests = [];
for (let i = 0; i < getRandomIntInclusive(1,guests.length); i++) {
  newArrGuests = guests[i];
}

/* текст ( свойство: описание объекта) */
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

/* Добавление объявления с данными из массива*/
const MapPins = document.querySelector('.map__pin');
const Pin = document.querySelector('#pin').content;
let newPin = Pin.cloneNode(true);

/* Генерация данных восьми объектов (объявлений) */
const newAdd = [];

for (let i = 1; i <= 8; i++) {
let newObject = {
"author": {
    "avatar": "img/avatars/user0" + i + ".png",
},

"offer": {
    "title": text,
    "address": address,
    "price": price,
    "type": newArrType,
    "rooms": roomsArray,
    "guests": newArrGuests,
    "checkin": timesArray,
    "checkout": timesArrayOut,
    "features": newFeaturesArr,
    "description": text,
    "photos": newPhotoArr,
},
"location": {
  "x": getRandomIntInclusive(0,700),
  "y": getRandomIntInclusive(130,630),
},
};
newAdd.push(newObject);

}

const massiveAdd = newAdd;
/*Здесь должна быть функция по созданию DOM-элементов из данных из массива с объектами. Но пока есть только вот это( */
for (let j = 0; j <= 7; j++) {


  const pin = document.querySelector('#pin').content;
  const NewPin = pin.cloneNode(true);

  const Image = NewPin.querySelector('img');
  const MapPin = NewPin.querySelector('.map__pin');
  Image.src = massiveAdd[j].author.avatar;
  MapPin.style.left = massiveAdd[j].location.x + 32 + "px";
  MapPin.style.top = massiveAdd[j].location.y + 82 + "px";
  Image.alt = massiveAdd[j].offer.title;
  MapPins.append(MapPin);
}


// Мне кажется становится всё очевидней,что я в дестве ел мало витаминов.
// Пока у меня не получилось создать необходимую функцию по созданию DOM-элементов на основе массива объектов.
// В голове не складывается: я понимаю,что примерно нужно сделать,но как реализовать не понимаю.
// Могу предположить, что её (функцию) надо было поселить в первый цикл и в качестве параметра мог выступать только массив с объектами.
// Сложность по моему мнению в следующем (сейчас речь о блоке по генерации обяъвлений с аватарками): вместо конкретного массива надо указать любой,это возможно,
// но как без цикла подставлять номер j-того элемента этого массива? Зачем здесь функция? Конечно, с формулировками у меня туговато) Если в двух словах,
// то я реализации задачи, без цикла, не вижу(
// и иконки ещё какие-то корявые получились. И размещаются вне зоны видимости (не все,конечно, но часть). При этом координаты заданы на мой взгляд верные.
//__________________________

