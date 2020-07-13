"use strict";

const { getRandomInt, shuffle, getRandomDate } = require(`../utils`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const COUNT_MAX = 1000;
const ANNOUNCE_SENTENCES_RESTRICT = {
  min: 1,
  max: 5,
};

const pathCategories = './data/categories.txt';
const pathSentences = './data/sentences.txt';
const pathTitles = './data/titles.txt';

const readFiles = async (path) => {
  try {
    const result = await fs.readFile(path, `utf8`);
    return result.split(`\n`);
  } catch (err) {
    console.error(err);
  }
}

const generateOffers = (count, CATEGORIES, SENTENCES, TITLES) =>
  Array(count)
    .fill({})
    .map(() => ({
      category: shuffle(CATEGORIES.slice()).slice(
        0,
        getRandomInt(0, CATEGORIES.length - 1)
      ),
      announce: shuffle(SENTENCES.slice())
        .slice(ANNOUNCE_SENTENCES_RESTRICT.min, ANNOUNCE_SENTENCES_RESTRICT.max)
        .join(` `),
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      fullText: shuffle(SENTENCES.slice())
        .slice(0, getRandomInt(0, SENTENCES.length - 1))
        .join(` `),
      createdDate: getRandomDate(),
    }));

const makeMockData = async (filename, content) => {
  await fs.writeFile(filename, content);
  try {
    return console.info(chalk.green(`Operation success. File created.`));
  } catch (err) {
    return console.error(chalk.red(`Can't write data to file...`));
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const CATEGORIES = await readFiles(pathCategories);
    const SENTENCES = await readFiles(pathSentences);
    const TITLES = await readFiles(pathTitles);

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, CATEGORIES, SENTENCES, TITLES));

    if (count > COUNT_MAX) {
      console.error(chalk.red(`Не больше ${COUNT_MAX} публикаций`));
      return true;
    }

    makeMockData(FILE_NAME, content);
  },
};
