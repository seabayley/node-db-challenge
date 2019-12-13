exports.seed = function(knex) {

  return knex('tasks').insert([
    {
      id: 1,
      task_description: 'Fork the github repo.',
      task_notes: 'Find the project on github and fork it.',
      project_id: 1,
      completed: false
    },
    {
      id: 2,
      task_description: 'Clone the repo.',
      task_notes: 'Clone the repo down to your local machine.',
      project_id: 1,
      completed: false
    },
  ]);
};