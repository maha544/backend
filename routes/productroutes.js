const express = require("express");
const route = express.Router();
const prodcont = require('../controllers/prodcont')

route.get('/' , prodcont.Get);

//route.get('/:id', prodcont.GetById);

route.post('/' , prodcont.Post);

route.put('/:id', prodcont.Put);

route.delete('/:id', prodcont.Del);

module.exports = route;