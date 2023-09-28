// app.js — входной файл

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routes/index')


const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

/*app.use((req, res, next) => {
  req.user = {
    _id: '6506e498619df9ac589ddd67'
  }

  next();
})*/

// подключаемся к серверу mongo
mongoose.connect(DB_URL)


// подключаем мидлвары, роуты и всё остальное...

app.use(router)


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});