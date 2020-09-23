'use strict';

function getRandomInt(min, max) {
	return console.log (Math.floor(Math.random() * (max - min + 1)) + min); // функция получения случайного целого числа в диапозоне
};




const rooms = document.querySelector('#housing-rooms'); // получение массива возможного количества комнат
let roomsArray = [];                                    //
for (let i=0;i<rooms.length;i++) {                      //
roomsArray.push(rooms[i].value);                        //
console.log(roomsArray);                                //
};                                                      //




const times = document.querySelector('#timein'); // получение массива возможного времени заселения
let timesArray = [];                                    //
for (let i=0;i<times.length;i++) {                      //
timesArray.push(times[i].value);                        //
console.log(timesArray);                                //
};




 for (let i = 1; i <= 8; i++) {           // Добавление 8-ми объектов
let newAdd = [];

let newObject = {
  "author": {
    "avatar": "img/avatars/user0" + i + ".png";
  },

  "offer": {
    "title":
    "address":
    "price": число, стоимость;
    "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow;
    "rooms": число, количество комнат; // нашёл
    "guests": число, количество гостей, которое можно разместить;
    "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,; // нашёл
    "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00; // можно по аналогии
    "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",;
    "description": строка с описанием,;
    "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
},
"location": {
  "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
  "y": getRandomInt(130,160);
}
}



newAdd.push(newObject);

}











/*const template = document.querySelectorAll('#card').content; // находим все сгенерированные объявления;*/



/*
{
    "author": {
        "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },
    "offer": {
        "title": строка, заголовок предложения
        "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        "price": число, стоимость
        "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
        "rooms": число, количество комнат
        "guests": число, количество гостей, которое можно разместить
        "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        "description": строка с описанием,
        "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    "location": {
        "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        "y": случайное число, координата y метки на карте от 130 до 630.
    }
}

*/
