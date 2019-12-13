exports.seed = function(knex) {

  return knex('projects').insert([
    {id: 1, project_name: 'Do your sprint', project_description: "This is where you do your lambda sprint.", project_completed: false},
    {id: 2, project_name: 'Clean the house', project_description: "Get up and clean your house.", project_completed: false},
    {id: 3, project_name: 'Find a job', project_description: "Get out and find a job making some real money.", project_completed: false}
  ]);
};