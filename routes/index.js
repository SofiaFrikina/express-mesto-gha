const router = require('express').Router();
const userRouter = require('./users')
const cardRouter = require('./cards')
const ERROR_NOT_FOUND = require('../errors/errors')

router.use('/users', userRouter)
router.use('/cards', cardRouter)
router.use('/', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Переданы некорректные данные' })
})

module.exports = router;