const express = require('express')

const db = require('./model')

const router = express.Router()

const {validate } = require('../validator')

const {ValidationRules} = require('./validation')



router.get('/', (req, res) => {
  db.getResources()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' })
  })
})

router.post('/', ValidationRules(), validate, (req, res) => {
  db.addResource(req.body)
  .then(data => {
    res.status(201).json(data);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new resource.' });
  });
});

module.exports = router;