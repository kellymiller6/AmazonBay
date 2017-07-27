const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

app.listen(app.get('port'), () => {
  console.log(`YOU DID IT! Server is running on localhost:${app.get('port')}`);
});
