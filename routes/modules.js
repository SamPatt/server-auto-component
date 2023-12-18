const express = require('express')
const router = express.Router()
const modulesCtrl = require('../controllers/modules')

// GET module - index
router.get("/", modulesCtrl.index);

// POST module - create
router.post("/", modulesCtrl.create);

// GET module/:id - show
router.get('/:id', modulesCtrl.show);

// UPDATE module/:id - update
router.put('/:id', modulesCtrl.update);

// DELETE module/:id - destroy
router.delete('/:id', modulesCtrl.delete);


module.exports = router