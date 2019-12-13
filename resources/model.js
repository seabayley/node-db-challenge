const db = require('../data/dbConfig')

const getResources = () => db('resources')

const addResource = resource => {
    return db('resources').insert(resource)
    .then(() => {
        return getResources()
    })
}

module.exports = {
    getResources,
    addResource
}