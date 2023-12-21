const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// GET module - user
router.get("/", userCtrl.index);

// POST module - save user component
router.post("/", userCtrl.saveComponent);

module.exports = router;
