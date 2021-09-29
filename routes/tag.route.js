const router = require('express').Router()
const tagController = require('../controllers/tagController')

router.post('', tagController.addTag)
router.get('', tagController.allTags)
router.get('/:id/questions', tagController.tagQuestions)

module.exports = router