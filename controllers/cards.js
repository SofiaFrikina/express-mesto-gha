const Card = require('../models/card')
const { ValidationError, AthorizedError, ForbiddenError, NotFoundError, ConflictError, ServerError } = require('../utils/errors/errors')
const SUCCESSFUL_ANSWER = require('../utils/constants')

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return (new ValidationError('Переданы некорректные данные'))
      }
      return (new ServerError('Произошла ошибка на сервере'))
    })
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(SUCCESSFUL_ANSWER).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return (new ValidationError('Переданы некорректные данные'))
      }
      return (new ServerError('Произошла ошибка на сервере'))
    })
};

module.exports.deleteCardId = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден')
      } else if (card.owner !== req.user._id) {
        throw (new ForbiddenError('Вы не можете удалить чужую карточку'))
      } Card.findById(req.params.cardId)
        .then((deletedCard) => {
          res.send(deletedCard)
        })
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return next(err);
      }
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'))
      }
      return (new ServerError('Произошла ошибка на сервере'))
    })
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден')
      }
      return res.send(card)
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return next(err);
      }
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'))
      }
      return (new ServerError('Произошла ошибка на сервере'))
    })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден')
      }
      return res.send(card)
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return next(err);
      }
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'))
      }
      return (new ServerError('Произошла ошибка на сервере'))
    })
}