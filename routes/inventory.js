const express = require('express');

const router = express.Router();

const Inventory = require('../models/Inventory');

router.get('/', async (req, res) => {
  try {
    const articles = await Inventory.query();

    return res.json(articles);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { articleName, companyId, quantity } = req.body;

  if (!articleName || !companyId || !quantity) {
    return res.status(500).send('Data missing.');
  }

  try {
    const newArticle = await Inventory.query().insert({
      articleName,
      companyId,
      quantity,
    });

    return res.json(newArticle);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put('/', async (req, res) => {
  const { articleName, companyId, update } = req.body;

  if (!articleName || !companyId || !update) {
    return res.status(500).send('Data missing.');
  }

  try {
    const updatedArticle = await Inventory.query()
      .findById([articleName, companyId])
      .patch(update);

    return res.json(updatedArticle);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/', async (req, res) => {
  const { articleName, companyId } = req.body;

  if (!articleName || !companyId) {
    return res.status(500).send('Data missing.');
  }

  try {
    const deletedArticle = await Inventory.query().deleteById([
      articleName,
      companyId,
    ]);

    return res.json(deletedArticle);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
