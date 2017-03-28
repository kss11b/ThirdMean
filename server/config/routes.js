var mongoose = require('mongoose');
var users = require('../controllers/users.js');
var bid = require('../controllers/bid.js');
module.exports = function(app) {
  app.post('/create', function(req, res) {
    console.log('routes reached')
    users.create(req, res);
  });
  app.post('/login', function(req, res) {
    users.login(req, res);
  });
  app.post('/bid', function(req, res) {
    bid.bid(req, res)
})
  app.get('/pull', function(req, res){
    bid.pull(req, res)
  })
  app.get('/users/:id', function(req, res){
    users.show(req, res)
  })
  app.get('/getUsers', function(req, res){
    users.getUsers(req, res)
  })
  app.post('/end', function(req, res){
    bid.end(req, res)
  })
  app.post('/max', function(req, res){
    poll.max(req, res)
  })
  app.put('/vote/:id', function(req, res){
    poll.vote(req, res)
  })
}
