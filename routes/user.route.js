const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const upload = require('../middleware/uploadFile')

router.post('/register', userController.register)
router.get('/verify', userController.verify)
router.post('/login', userController.login)
router.get('/logout', auth, userController.logout)
router.patch('/update',auth, userController.update)
router.get('/profile',auth, userController.profile)
router.post('/upload-image', auth, upload.single('image'), userController.uploadImage)


module.exports = router