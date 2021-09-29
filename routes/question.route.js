const router = require('express').Router()
const questionController = require('../controllers/questionController')
const auth = require('../middleware/auth')

router.post('', auth, questionController.addQuestion)
router.get('', questionController.allQuestions)
router.put('/:id/upVote', auth, questionController.upVote)
router.put('/:id/downVote', auth, questionController.downVote)
router.get('/:id', questionController.singleQuestion)
router.post('/:id/answer', auth, questionController.submitAnswer)


module.exports = router