exports.up = function(knex) {
    return knex.schema
    .createTable('projects', tbl => {
        tbl.increments()
        tbl.string('project_name', 128)
        .notNullable()
        tbl.text('project_description')
        tbl.boolean('project_completed')
        .notNullable()
        .defaultTo(false)
    })
    .createTable('resources', tbl => {
      tbl.increments()
      tbl.string('resource_name', 128)
      .notNullable()
      .unique()
      tbl.text('resource_description')
  })
    .createTable('tasks', tbl => {
        tbl.increments()
        tbl.text('task_description')
        .notNullable()
        tbl.text('task_notes')
        tbl.boolean('task_completed')
        .notNullable()
        .defaultTo(false)
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('project_resources', tbl => {
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        tbl.primary(['project_id', 'resource_id'])
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
  };
  
