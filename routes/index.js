const router = require('express').Router();
const userRouter = require('./users')
const cardRouter = require('./cards')
const NotFoundError = require('../utils/errors/NotFoundError')
const { celebrate, Joi, errors } = require('celebrate');
const { URL_VALIDATE } = require('../utils/constants')
const auth = require('../middlewares/auth');


const { createUser, login } = require('../controllers/users');


router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_VALIDATE),
  })
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}), login);
// роуты, которым авторизация нужна
router.use('/users', auth, userRouter)
router.use('/cards', auth, cardRouter)
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Переданы некорректные данные'))
})

router.use(errors())

module.exports = router;