var express = require('express');
var router = express.Router();

// GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respuesta a GET desde el archivo USERS que sí que funciona!!!');
});

module.exports = router; 


