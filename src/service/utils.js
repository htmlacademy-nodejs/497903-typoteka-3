'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [
      someArray[randomPosition],
      someArray[i],
    ];
  }
  const someArrayMut = someArray;
  return someArrayMut;
};


// Функция для генерации даты
const today = new Date();
const dayInThePast = new Date(
    today.getFullYear(),
    today.getMonth() - 2,
    today.getDate()
);

const pad = (number) => `${number}`.padStart(2, `0`);

const format = (date) =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((num) => pad(num))
    .join(`-`) +
  ` ` +
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((num) => pad(num))
    .join(`:`);

const getRandomDate = () => {
  const dt = new Date(getRandomInt(dayInThePast, today));
  return format(dt);
};

module.exports = {
  getRandomDate,
  getRandomInt,
  shuffle
};
