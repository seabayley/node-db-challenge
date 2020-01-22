const cleaner = require('knex-cleaner')

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate', // To reset ids
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'] // Doesn't empty migration tables.
  })
}