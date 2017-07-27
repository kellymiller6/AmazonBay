exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return knex('orders').insert([
        {id: 1, created_at: '2017-07-10', total_price: '1800'},
        {id: 2, created_at: '2017-07-11', total_price: '800'},
        {id: 3, created_at: '2017-07-12', total_price: '100'}
      ]);
    });
};
