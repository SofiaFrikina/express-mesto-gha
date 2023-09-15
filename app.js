// app.js — входной файл

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index')
const app = express();
// подключаемся к серверу mongo
mongoose.connect('mongodb://0.0.0.0:27017/mestodb')

const { PORT = 3000 } = process.env

// подключаем мидлвары, роуты и всё остальное...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});