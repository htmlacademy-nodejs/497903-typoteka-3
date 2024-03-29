"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const user = require(`./user`);
const DataService = require(`../data-service/user`);

const { HttpCode } = require(`../constants`);

const mockCategories = [`Животные`, `Журналы`, `Игры`];

const mockUsers = [
  {
    name: `Иван Иванов`,
    email: `ivanov@example.com`,
    passwordHash: await passwordUtils.hash(`ivanov`),
    avatar: `avatar01.jpg`,
  },
  {
    name: `Пётр Петров`,
    email: `petrov@example.com`,
    passwordHash: await passwordUtils.hash(`petrov`),
    avatar: `avatar02.jpg`,
  },
];

const mockData = [
  {
    user: `ivanov@example.com`,
    id: "ohgKVY",
    title: "Что такое золотое сечение",
    createdDate: "2020-09-16 09:29:49",
    announce:
      "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    fullText:
      "Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Еду надо примимать как минимум три раза. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
    category: ["Рисование", "Кино"],
    comments: [
      {
        user: `petrov@example.com`,
        text: "Совсем немного... Хочу такую же футболку :-)",
        id: "51Nz-E",
      },
      {
        user: `ivanov@example.com`,
        text: "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
        id: "FURmIl",
      },
      {
        user: `petrov@example.com`,
        text: "Плюсую, но слишком много буквы!",
        id: "HGPrY0",
      },
    ],
  },
  {
    user: `petrov@example.com`,
    id: "u0Vb3N",
    title: "Лучшие рок-музыканты 20-века",
    createdDate: "2020-09-31 05:51:44",
    announce:
      "Из под его пера вышло 8 платиновых альбомов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь.",
    fullText:
      "Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Только преобретя их, я чувствую себя чудочеловеком. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Он написал больше 30 хитов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь.",
    category: ["Еда", "Железо"],
    comments: [
      {
        user: `ivanov@example.com`,
        text: "Планируете записать видосик на эту тему? Совсем немного...",
        id: "ItHjUU",
      },
      {
        user: `petrov@example.com`,
        text: "Плюсую, но слишком много буквы!",
        id: "ns1vf-",
      },
    ],
  },
  {
    user: `ivanov@example.com`,
    id: "G4O6lY",
    title: "Ёлки. История деревьев",
    createdDate: "2020-09-14 03:13:34",
    announce:
      "Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Это один из лучших рок-музыкантов.",
    fullText:
      "Программировать не настолько сложно, как об этом говорят. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Еду надо примимать как минимум три раза. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Только преобретя их, я чувствую себя чудочеловеком. Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    category: ["Без рамки", "Деревья"],
    comments: [
      {
        user: `petrov@example.com`,
        text: "Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!",
        id: "tGWMNL",
      },
      {
        user: `ivanov@example.com`,
        text: "Мне кажется или я уже читал это где-то?",
        id: "Tw_bES",
      },
    ],
  },
  {
    user: `petrov@example.com`,
    id: "6VAidP",
    title: "Ложка-поварёжка — нужный инструмент",
    createdDate: "2020-10-13 12:33:06",
    announce:
      "Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Ёлки — это не просто красивое дерево. Это прочная древесина. Программировать не настолько сложно, как об этом говорят.",
    fullText:
      "Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Еду надо примимать как минимум три раза. Золотое сечение — соотношение двух величин, гармоническая пропорция. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Собрать камни бесконечности легко, если вы прирожденный герой. Это один из лучших рок-музыкантов. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Из под его пера вышло 8 платиновых альбомов. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.",
    category: ["Программирование", "Деревья"],
    comments: [
      {
        user: `ivanov@example.com`,
        text: "Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.",
        id: "5MATMD",
      },
      {
        user: `petrov@example.com`,
        text: "Согласен с автором! Мне кажется или я уже читал это где-то?",
        id: "4GWkGB",
      },
      {
        user: `ivanov@example.com`,
        text: "Хочу такую же футболку :-) Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.",
        id: "MFvb-G",
      },
    ],
  },
  {
    user: `ivanov@example.com`,
    id: "QjcSqJ",
    title: "Как перестать беспокоиться и начать жить",
    createdDate: "2020-09-05 09:02:13",
    announce:
      "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Только преобретя их, я чувствую себя чудочеловеком.",
    fullText:
      "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Ёлки — это не просто красивое дерево. Это прочная древесина. Еду надо примимать как минимум три раза. Только преобретя их, я чувствую себя чудочеловеком. Первая большая ёлка была установлена только в 1938 году. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Это один из лучших рок-музыкантов. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Золотое сечение — соотношение двух величин, гармоническая пропорция. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
    category: ["Программирование", "За жизнь"],
    comments: [
      {
        user: `petrov@example.com`,
        text: "Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
        id: "abZOZV",
      },
    ],
  },
];

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, { logging: false });
  await initDB(mockDB, {
    categories: mockCategories,
    articles: mockArticles,
    users: mockUsers,
  });
  const app = express();
  app.use(express.json());
  user(app, new DataService(mockDB));
  return app;
};

describe(`API creates user if data is valid`, () => {
  const validUserData = {
    name: `Сидор Сидоров`,
    email: `sidorov@example.com`,
    password: `sidorov`,
    passwordRepeated: `sidorov`,
    avatar: `sidorov.jpg`,
  };

  let response;

  beforeAll(async () => {
    let app = await createAPI();
    response = await request(app).post(`/user`).send(validUserData);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));
});

describe(`API refuses to create user if data is invalid`, () => {
  const validUserData = {
    name: `Сидор Сидоров`,
    email: `sidorov@example.com`,
    password: `sidorov`,
    passwordRepeated: `sidorov`,
    avatar: `sidorov.jpg`,
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(validUserData)) {
      const badUserData = { ...validUserData };
      delete badUserData[key];
      await request(app)
        .post(`/user`)
        .send(badUserData)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`When field type is wrong response code is 400`, async () => {
    const badUsers = [
      { ...validUserData, firstName: true },
      { ...validUserData, email: 1 },
    ];
    for (const badUserData of badUsers) {
      await request(app)
        .post(`/user`)
        .send(badUserData)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`When field value is wrong response code is 400`, async () => {
    const badUsers = [
      { ...validUserData, password: `short`, passwordRepeated: `short` },
      { ...validUserData, email: `invalid` },
    ];
    for (const badUserData of badUsers) {
      await request(app)
        .post(`/user`)
        .send(badUserData)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`When password and passwordRepeated are not equal, code is 400`, async () => {
    const badUserData = { ...validUserData, passwordRepeated: `not sidorov` };
    await request(app)
      .post(`/user`)
      .send(badUserData)
      .expect(HttpCode.BAD_REQUEST);
  });

  test(`When email is already in use status code is 400`, async () => {
    const badUserData = { ...validUserData, email: `ivanov@example.com` };
    await request(app)
      .post(`/user`)
      .send(badUserData)
      .expect(HttpCode.BAD_REQUEST);
  });
});

describe(`API authenticate user if data is valid`, () => {
  const validAuthData = {
    email: `ivanov@example.com`,
    password: `ivanov`,
  };

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app).post(`/user/auth`).send(validAuthData);
  });

  test(`Status code is 200`, () =>
    expect(response.statusCode).toBe(HttpCode.OK));

  test(`User name is Иван Иванов`, () =>
    expect(response.body.name).toBe(`Иван Иванов`));
});

describe(`API refuses to authenticate user if data is invalid`, () => {
  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`If email is incorrect status is 401`, async () => {
    const badAuthData = {
      email: `not-exist@example.com`,
      password: `petrov`,
    };
    await request(app)
      .post(`/user/auth`)
      .send(badAuthData)
      .expect(HttpCode.UNAUTHORIZED);
  });

  test(`If password doesn't match status is 401`, async () => {
    const badAuthData = {
      email: `petrov@example.com`,
      password: `ivanov`,
    };
    await request(app)
      .post(`/user/auth`)
      .send(badAuthData)
      .expect(HttpCode.UNAUTHORIZED);
  });
});
