const express = require('express');
const app = express();
const database = require('./db/knex')
const bodyParser = require('body-parser');

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

app.get('/api/v1/store', (req, res) => {
  database('store').select()
  .then(items => {
    res.status(200).json(items);
  })
  .catch(error => {
    res.status(500).json({error})
  })
})

app.get('/api/v1/orders', (req, res) => {
  database('orders').select()
  .then(orders => {
    res.status(200).json(orders);
  })
  .catch(error => {
    res.status(500).json({error})
  })
})

app.post('/api/v1/orders', (req,res) => {
  const order = req.body;
  database('orders').insert(order, 'id')
  .then(order => {
    res.status(201).json({id: order[0]})
  })
  .catch(error => res.status(500).json({error}))
})

app.listen(app.get('port'), () => {
  console.log(`YOU DID IT! Server is running on localhost:${app.get('port')}`);
});

module.exports = app
