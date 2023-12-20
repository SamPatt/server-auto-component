const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

// GET module - user
router.get("/", userCtrl.index)

module.exports = router