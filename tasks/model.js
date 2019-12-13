const db = require('../data/dbConfig')

const getTasks = () => {
    return db('tasks')
    .join('projects', 'tasks.project_id', '=', 'projects.id')
    .select('tasks.task_description',
            'tasks.task_notes',
            'tasks.task_completed',
            'projects.project_name',
            'projects.project_description')
}

const addTask = (task) => {
    return db('tasks').insert(task)
    .then(() => {
        return task
    })
}


module.exports = {
    getTasks,
    addTask
}