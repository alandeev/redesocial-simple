const express = require('express');

//Stating Database;
require('./database');

const [ extension, routes ] = require('./routers');

const app = express();

const port = 3333;

app.use(express.json());

app.use(extension, routes);

app.listen(port, () => {
  console.log(`Server running into port: ${port} 🚀`);
})