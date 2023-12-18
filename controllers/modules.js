const {Module} = require('../models')

const index = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(await Module.find({}))
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

const create = async (req, res, next) => {
  try {
    res
    .status(201)
    .json(await Module.create(req.body));
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

const show = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(await Module.findById(req.params.id))
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

const update = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(await Module.findByIdAndUpdate(req.params.id, req.body, {new: true}))
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

const destroy = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(await Module.findByIdAndDelete(req.params.id))
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

module.exports = {
  index,
  create,
  show,
  update,
  delete: destroy,
}