const express = require('express');

const router = express.Router();
const { userAuth, adminAuth } = require('../middleware/auth');
const Inventory = require('../models/Inventory');

router.get('/', userAuth, async (req, res) => {
  try {
    const articles = await Inventory.query().orderBy('articleName');

    return res.json(articles);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post('/', adminAuth, async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { articleName, companyId, quantity } = req.body;

  if (!articleName || !companyId || !quantity) {
    return res.status(500).json({ error: 'Data missing.' });
  }

  try {
    const newArticle = await Inventory.query().insert({
      articleName,
      companyId,
      quantity,
    });

    return res.json(newArticle);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.put('/', adminAuth, async (req, res) => {
  const { articleName, companyId, update } = req.body;

  if (!articleName || !companyId || !update) {
    return res.status(500).json({ error: 'Data missing.' });
  }

  try {
    const updatedArticle = await Inventory.query()
      .findById([articleName, companyId])
      .patch(update);

    return res.json(updatedArticle);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.delete('/', adminAuth, async (req, res) => {
  const { articleName, companyId } = req.body;

  if (!articleName || !companyId) {
    return res.status(500).json({ error: 'Data missing.' });
  }

  try {
    const deletedArticle = await Inventory.query().deleteById([
      articleName,
      companyId,
    ]);

    return res.json(deletedArticle);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
