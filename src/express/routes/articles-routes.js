"use strict";

const { Router } = require(`express`);
const articlesRoutes = new Router();
const api = require(`../api`).getAPI();
const { changeDateFormat, ensureArray } = require(`../../service/utils`);

const multer = require(`multer`);
const path = require(`path`);
const { nanoid } = require(`nanoid`);

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({ storage });

articlesRoutes.get(`/category/:id`, (req, res) =>
  res.render(`articles-by-category`)
);

articlesRoutes.get(`/add`, async (req, res) => {
  const { error } = req.query;
  const categories = await api.getCategories();
  res.render(`new-post`, { categories, error });
});

articlesRoutes.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const { body } = req;
  const { user } = req.session;
  const articleData = {
    title: body.title,
    createdDate: changeDateFormat(body.date),
    categories: ensureArray(body.category),
    announce: body.announcement,
    fullText: body[`full-text`],
    userId: user.id
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
    res.redirect(`/articles/add?error=${encodeURIComponent(error.response.data)}`);
  }
});

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const { id } = req.params;
  const { error } = req.query;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories(),
  ]);
  res.render(`edit-post`, { id, article, categories, error });
});

articlesRoutes.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const { body, file } = req;
  const { id } = req.params;
  const articleData = {
    title: body.title,
    createdDate: changeDateFormat(body.date),
    categories: ensureArray(body.category),
    announce: body.announcement,
    fullText: body[`full-text`],
    userId: user.id
  };

  try {
    await api.editArticle(id, articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`/articles/edit/${id}?error=${encodeURIComponent(error.response.data)}`);
  }
});

articlesRoutes.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const { error } = req.query;
  const article = await api.getArticle(id, true);
  res.render(`articles/post`, { article, id, error });
});

articlesRoutes.post(`/:id/comments`, async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    await api.createComment(id, { text: comment });
    res.redirect(`/articles/${id}`);
  } catch (error) {
    res.redirect(`/articles/${id}?error=${encodeURIComponent(error.response.data)}`);
  }
});

module.exports = articlesRoutes;
