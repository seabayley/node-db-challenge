exports.seed = function(knex) {

  return knex('resources').insert([
    {id: 1, resource_name: 'Computer', resource_description: "It's a computer man."},
    {id: 2, resource_name: 'Pen', resource_description: "You write with it."},
    {id: 3, resource_name: 'Smartphone', resource_description: "It's for playing games during your sprint."},
    {id: 4, resource_name: 'Desk', resource_description: "You put your pen and computer on this."},
    {id: 5, resource_name: 'Trashbag', resource_description: "Put it in the can when you take out the trash."},
    {id: 6, resource_name: 'Dish Soap', resource_description: "You know what to do with this."},
  ]);
};