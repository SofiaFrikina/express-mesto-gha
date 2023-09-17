
const User = require('../models/user')
const { ERROR_VALIDATION, ERROR_NOTFOUND, ERROR_INTERNALSERVER } = require('../errors/errors')

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else {
        res.status(ERROR_INTERNALSERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
}

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else if (err.name === 'NotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь не найден' })
      } else {
        res.status(ERROR_INTERNALSERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else {
        res.status(ERROR_INTERNALSERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
}

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else if (err.name === 'NotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь не найден' })
      } else {
        res.status(ERROR_INTERNALSERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' })
      } else if (err.name === 'NotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь не найден' })
      } else {
        res.status(ERROR_INTERNALSERVER).send({ message: 'Произошла ошибка на сервере' })
      }
    })
}




module.exports = {
  getAllUsers, getUserId, createUser, updateProfile, updateAvatar
}