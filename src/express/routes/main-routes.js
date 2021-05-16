"use strict";

const { Router } = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();

const ARTICLES_PER_PAGE = 8;

mainRoutes.get(`/`, async (req, res) => {
  // получаем номер страницы
  let { page = 1 } = req.query;
  page = +page;

  // количество запрашиваемых публикаций равно количеству публикаций на странице
  const limit = ARTICLES_PER_PAGE;

  // количество публикаций, которое нам нужно пропустить - это количество публикаций на предыдущих страницах
  const offset = (page - 1) * ARTICLES_PER_PAGE;

  const [{ count, articles }, categories] = await Promise.all([
    api.getArticles({ limit, offset }),
    api.getCategories(true),
  ]);

  // количество страниц — это общее количество публикаций, поделённое на количество публикаций на странице (с округлением вверх)
  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  // передадим все эти данные в шаблон
  res.render(`main`, { articles, page, totalPages, categories });
});
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/search`, async (req, res) => {
  try {
    const { search } = req.query;
    const results = await api.search(search);

    res.render(`search`, {
      results,
    });
  } catch (error) {
    res.render(`search`, {
      results: [],
    });
  }
});

mainRoutes.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRoutes;
