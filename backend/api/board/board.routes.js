const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getBoard, getBoards, deleteBoard, updateBoard, addBoard,searchBoard} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.get('/:id', getBoard)
router.get('/:id/search', searchBoard)
router.post('/',addBoard)
router.put('/:id',  updateBoard)
router.delete('/:id',  deleteBoard)


module.exports = router