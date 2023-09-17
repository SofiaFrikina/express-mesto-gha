// app.js — входной файл

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index')

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6506e498619df9ac589ddd67'
  }

  next();
})

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});


// подключаем мидлвары, роуты и всё остальное...

app.use(router)


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});