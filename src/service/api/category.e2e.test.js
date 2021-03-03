"use strict";

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);

const { HttpCode } = require(`../constants`);

const mockData = [
  {
    id: "XGDLif",
    category: ["Еда", "Кино", "За жизнь", "Деревья", "Разное"],
    announce:
      "Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
    title: "Обзор новейшего смартфона",
    fullText:
      "Только преобретя их, я чувствую себя чудочеловеком. Еду надо примимать как минимум три раза. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    createdDate: "2020-12-09 22:00:59",
    comments: [],
  },
  {
    id: "VqCb8O",
    category: ["Музыка", "Разное", "Еда", "Железо", "Программирование", "IT"],
    announce:
      "Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
    title: "Как достигнуть успеха не вставая с кресла",
    fullText:
      "Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Еду надо примимать как минимум три раза. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Только преобретя их, я чувствую себя чудочеловеком. Из под его пера вышло 8 платиновых альбомов. Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Золотое сечение — соотношение двух величин, гармоническая пропорция. Это один из лучших рок-музыкантов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.",
    createdDate: "2020-12-12 14:31:51",
    comments: [
      {
        text: "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
        id: "SOuNl9",
      },
      {
        text: "Хочу такую же футболку :-)",
        id: "Ty8PQI",
      },
      {
        text: "Согласен с автором!",
        id: "jHTbUN",
      },
      {
        text: "Совсем немного...Хочу такую же футболку :-)",
        id: "IdUTZp",
      },
      {
        text: "",
        id: "HNLRw8",
      },
      {
        text:
          "Планируете записать видосик на эту тему?Хочу такую же футболку :-)Это где ж такие красоты?",
        id: "IOUvOX",
      },
      {
        text:
          "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.Плюсую, но слишком много буквы!",
        id: "RexH-z",
      },
      {
        text: "Планируете записать видосик на эту тему?",
        id: "A8r9_q",
      },
    ],
  },
  {
    id: "ukz4mr",
    category: ["Кино", "Рисование", "Программирование", "За жизнь"],
    announce:
      "Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Ёлки — это не просто красивое дерево. Это прочная древесина. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
    title: "С этими карандашами вы сможете нарисавать всё",
    fullText:
      "Первая большая ёлка была установлена только в 1938 году. Он написал больше 30 хитов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.",
    createdDate: "2020-12-07 05:33:03",
    comments: [
      {
        text: "Совсем немного...",
        id: "lBens6",
      },
      {
        text:
          "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.Это где ж такие красоты?",
        id: "3bUXoo",
      },
      {
        text: "Совсем немного...",
        id: "3PR_-a",
      },
      {
        text:
          "Согласен с автором!Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.",
        id: "gfm4nd",
      },
    ],
  },
  {
    id: "XALsDu",
    category: [
      "Музыка",
      "Еда",
      "Рисование",
      "За жизнь",
      "Железо",
      "Разное",
      "Без рамки",
      "Деревья",
      "Кино",
      "IT",
    ],
    announce:
      "Простые ежедневные упражнения помогут достичь успеха. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.",
    title: "Ложка-поварёшка — нужный инструмент",
    fullText:
      "Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция. Еду надо примимать как минимум три раза. Он написал больше 30 хитов. Из под его пера вышло 8 платиновых альбомов. Это один из лучших рок-музыкантов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
    createdDate: "2020-12-21 10:53:50",
    comments: [],
  },
  {
    id: "rwGAii",
    category: [
      "Кино",
      "Рисование",
      "Программирование",
      "Без рамки",
      "За жизнь",
      "IT",
      "Разное",
      "Железо",
      "Еда",
    ],
    announce:
      "Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Только преобретя их, я чувствую себя чудочеловеком. Как начать действовать? Для начала просто соберитесь. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    title: "Учим HTML и CSS",
    fullText:
      "Из под его пера вышло 8 платиновых альбомов. Только преобретя их, я чувствую себя чудочеловеком. Он написал больше 30 хитов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
    createdDate: "2020-11-30 04:43:48",
    comments: [
      {
        text:
          "Совсем немного...Хочу такую же футболку :-)Планируете записать видосик на эту тему?",
        id: "MI6YY_",
      },
      {
        text: "Плюсую, но слишком много буквы!",
        id: "o6d0Q7",
      },
      {
        text:
          "Мне кажется или я уже читал это где-то?Это где ж такие красоты?Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.",
        id: "frfFFZ",
      },
      {
        text:
          "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.",
        id: "ai-K7y",
      },
      {
        text:
          "Хочу такую же футболку :-)Мне кажется или я уже читал это где-то?",
        id: "37zume",
      },
    ],
  },
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 3 categories`, () =>
    expect(response.body.length).toBe(3));

  test(`Category names are
        "Еда",
        "Кино",
        "Музыка",
        `, () =>
    expect(response.body).toEqual(
      expect.arrayContaining([
        `Еда`,
        `Кино`,
        `Музыка`,
      ])
    ));
});