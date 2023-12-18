const express = require('express')
const router = express.Router()
const apiCtrl = require('../controllers/api')

// GET module - index
router.get("/", apiCtrl.index);

// // POST module - create
// router.post("/", apiCtrl.create);

// // GET module/:id - show
// router.get('/:id', apiCtrl.show);

// // UPDATE module/:id - update
// router.put('/:id', apiCtrl.update);

// // DELETE module/:id - destroy
// router.delete('/:id', apiCtrl.delete);


module.exports = router