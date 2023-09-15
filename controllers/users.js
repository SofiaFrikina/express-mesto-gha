const mongoose = require("mongoose");
const User = require('../models/user')


const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch(next)
}

const getUserId = (req, res, next) => {
  let userId;
  if (req.params.userId) userId = req.params.userId;
  else userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      return res.send(user)
    })
    .catch(next)
}

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user)
    })
    .catch(next)
}
module.exports = {
  getAllUsers, getUserId, createUser
}