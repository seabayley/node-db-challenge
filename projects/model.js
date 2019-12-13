const db = require('../data/dbConfig')

const getProjects = () => db('projects')

const findById = id => {
    return db('projects').where({id}).first()
}

const addProject = project => {
    return db('projects').insert(project)
    .then(() => {
        return getProjects()
    })
}

const getTasks = id => {
    return db('tasks')
    .select('tasks.id',
            'tasks.task_description as description',
            'tasks.task_notes as notes',
            'tasks.task_completed as completed')
    .where('tasks.project_id', id)
}



module.exports = {
    getProjects,
    addProject,
    findById,
    getTasks
}