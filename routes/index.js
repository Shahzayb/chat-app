var express = require('express');
var router = express.Router();
const {getMessages} = require("../lib/messages");

router.get('/', function(req, res, next) {
  res.render('index', { messages: getMessages() });
});

module.exports = router;
