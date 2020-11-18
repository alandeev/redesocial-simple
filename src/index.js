const express = require('express');
require('dotenv').config();
//Stating Database;
require('./database');

const routes = require('./routers');

const app = express();

app.use(express.json());

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running into port: ${process.env.PORT} 🚀`);
})