exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.table('orders', (table) => {
  		table.timestamps(true, true);
  	})
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', (table) => {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    })
  ]);
};
