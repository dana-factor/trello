const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const boardController = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', boardController.getBoards)
router.get('/:id', boardController.getBoard)
router.get('/:id/search', boardController.searchBoard)
router.post('/',boardController.addBoard)
router.put('/:id',  boardController.updateBoard)
router.delete('/:id',  boardController.deleteBoard)


module.exports = router