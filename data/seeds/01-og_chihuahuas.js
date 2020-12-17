
exports.seed = function(knex) {
  return knex('chihuahuas').insert([
    {name: 'Robert'},
    {name: 'Jose'},
    {name: 'Carlos'},
    {name: 'Luis'},
    {name: 'Alberto'}
  ]);
};
