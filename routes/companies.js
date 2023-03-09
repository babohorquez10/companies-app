const express = require('express');

const router = express.Router();
const { userAuth, adminAuth } = require('../middleware/auth');

const Company = require('../models/Company');

router.get('/', userAuth, async (req, res) => {
  try {
    const companies = await Company.query();

    return res.json(companies);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/inventory/:companyId', userAuth, async (req, res) => {
  const { companyId } = req.params;

  if (!companyId) {
    return res.status(500).send('Data missing.');
  }

  try {
    const inventory = await Company.relatedQuery('inventory').for(companyId);

    return res.json(inventory);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', adminAuth, async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { nit, name, address, phone } = req.body;

  if (!nit || !name || !address || !phone) {
    return res.status(500).send('Data missing.');
  }

  try {
    const newCompany = await Company.query().insert({
      nit,
      name,
      address,
      phone,
    });

    return res.json(newCompany);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put('/', adminAuth, async (req, res) => {
  const { nit, update } = req.body;

  if (!nit || !update) return res.status(500).send('Data missing.');

  try {
    const updatedCompany = await Company.query().findById(nit).patch(update);

    return res.json(updatedCompany);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/', adminAuth, async (req, res) => {
  const { nit } = req.body;

  if (!nit) return res.status(500).send('Data missing.');

  try {
    const deletedCompany = await Company.query().deleteById(nit);

    return res.json(deletedCompany);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
