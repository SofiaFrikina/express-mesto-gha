const router = require('express').Router();
const { getCards, createCard, deleteCardId, likeCard, dislikeCard } = require('../controllers/cards')

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardId);
router.delete('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;