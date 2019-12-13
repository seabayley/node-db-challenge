const express = require('express')

const db = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
  db.getTasks()
  .then(data => {
    let newData = data.map(task => {
        return {...task, task_completed: !!task.task_completed}
    })
    res.status(200).json(newData)
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Tasks' })
  })
})


module.exports = router;