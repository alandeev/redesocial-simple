const express = require('express');
const cors = require('cors');
require('dotenv').config();
//Stating Database;
require('./database');

const routes = require('./routers');

const app = express();

app.use(express.static(__dirname+'/public'));

app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running into port: ${process.env.PORT} 🚀`);
})