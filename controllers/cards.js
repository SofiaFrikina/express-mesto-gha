const Card = require('../models/card')
const { ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_SERVER } = require('../errors/errors')

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
};

module.exports.deleteCardId = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => new Error('NotFoundError'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else if (err.message === 'NotFoundError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' })
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new Error('NotFoundError'))
    .then((card) => {
      res.send(card)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else if (err.message === 'NotFoundError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' })
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new Error('NotFoundError'))
    .then((card) => {
      res.send(card)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else if (err.message === 'NotFoundError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' })
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
}