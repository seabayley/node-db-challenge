const express = require('express')

const Projects = require('./model')
const Tasks = require('../tasks/model')
const Resources = require('../resources/model')

const router = express.Router()

const {validate } = require('../validator')

const {ValidationRules} = require('./validation')
const {taskValidationRules} = require('../tasks/validation')

router.get('/', (req, res) => {
  Projects.getProjects()
  .then(data => {
      let newData = data.map(project => {
          return {...project, project_completed: !!project.project_completed}
      })
    res.status(200).json(newData)
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' })
  })
})

router.get('/:id/tasks', (req, res) => {
  const {id} = req.params
  Projects.getTasks(id)
  .then(data => {
    let taskList = data
    Projects.findById(id)
    .then(data => {
      let newData = {project_name: data.project_name,
                     project_description: data.project_description,
                     tasks: taskList.map(task => {
                      return {...task, task_completed: !!task.task_completed}
                    })}
        res.status(200).json(newData)
    })
  })
  .catch(err => {
    res.status(404).json({message: "Unable to locate project with that id."})
  })
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  Projects.findById(id)
  .then(project => {
    Projects.getTasks(id)
      .then(tasks => {
        Resources.getResourcesByProject(id)
          .then(resources => {
            res.status(200).json({
              id: project.id,
              name: project.project_name,
              description: project.project_description,
              completed: !!project.projected_completed,
              tasks: tasks.map(task => {
                return {...task, completed: !!task.task_completed}
              }),
              resources: resources
            })
          })
      })
  })
})

router.post('/', ValidationRules(), validate, (req, res) => {
  Projects.addProject({
    project_name: req.body.project_name,
    project_description: req.body.project_description || "",
    project_completed: false
  })
  .then(data => {
    res.status(201).json(data);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project.' })
  })
})

router.post('/:id/tasks', taskValidationRules(), validate, (req, res) => {
  const {task_description, task_notes} = req.body
  const { id } = req.params; 

  Projects.findById(id)
  .then(project => {
    if (project) {
      Tasks.addTask({
        project_id: id,
        task_description: task_description,
        task_notes: task_notes || "",
        task_completed: 0
      })
      .then(data => {
        res.status(201).json(data);
      })
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new task' });
  });
});

module.exports = router;