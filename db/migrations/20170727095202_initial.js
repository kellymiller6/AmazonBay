exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('store', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.string('src');
      table.string('alt_tag');
      table.integer('price')
      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('store'),
  ]);
};
