const db = require('../data/dbConfig')

const getResources = () => db('resources')

const getResourcesByProject = id => {
    return db('project_resources')
    .join('resources', 'project_resources.resource_id', 'resources.id')
    .select('resources.id', 'resources.resource_name as name', 'resources.resource_description as description')
    .where('project_resources.project_id', id)
}

const addResource = resource => {
    return db('resources').insert(resource)
    .then(() => {
        return getResources()
    })
}

module.exports = {
    getResources,
    addResource,
    getResourcesByProject
}