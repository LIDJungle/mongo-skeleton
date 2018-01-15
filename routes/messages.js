var express = require('express');
var router = express.Router();
var messageModel = require('../models/Messages');

/*Get the last message 
  This shows basic syntax for sorting a mongo query
*/
router.get('/latest', function(req, res, next) {
  messageModel.findOne({},{},{sort: {_id: -1}},function(err, item){
      res.render('latest_message', {
        message: item,
        err: (err === null) ?  'No errors!'  :  err
      });
  });
});

/* Get only active messages. 
  This hows basic syntax for filtering a mongo query
*/
router.get('/active', function(req, res, next) {
  messageModel.find({active: true},{},{sort: {_id: -1}},function(err, items){
    res.render('messages', {
      messages: items,
      err: (err === null) ?  'No errors!'  :  err
      });
  });
});

/* Get all messages */
router.get('/', function(req, res, next) {
  messageModel.find({},{},{sort: {_id: -1}},function(err, items){
    res.render('messages', {
      messages: items,
      err: (err === null) ?  'No errors!'  :  err
      });
  });
});

/**
 * Accept and store a message from post values
 * this shows basic "body-parser" usage.
 */
router.post('/', function(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  console.log("Active: ", req.body.active);
  var myMessage = new messageModel({
    message: req.body.message,
    active: req.body.active === 'on' ? true : false,
    username: typeof(req.body.username) === 'string' ?req.body.username : 'Anonymous',
    message_type: req.body.message_type === 'on' ? 'urgent' : 'normal'
  });
  myMessage.talk();
  myMessage.save(function (err, myMessage) {
      if (err) {
        return res.send({status: err});
      } else {
        res.redirect('/messages');
      }
  });
});

/**
 * For testing we insert a fixed message.
 */
router.post('/test', function(req, res, next) {
  var myMessage = new messageModel({
    message: "Hello from Mongoose - Database test was successful at "+new Date()+".",
    active: true,
    username: 'Administrator',
    message_type: 'urgent'
  });
  myMessage.talk();
  myMessage.save(function (err, myMessage) {
      if (err) {
        return res.send({status: err});
      } else {
        res.redirect('/messages/latest');
      }
      myMessage.talk();
  });
});

module.exports = router;