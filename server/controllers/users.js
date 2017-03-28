var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require("bcryptjs")
module.exports = {
  show: function(req, res){
    User.findById(req.params.id).exec(function(err, doc){
      if(err){
        return res.json(err)
      }
      else{
        res.json(doc);
      }
    })
  },
  create: function(req, res){
    console.log('server create fired')
    if(req.body.password != req.body.confirmation){
      return res.json({
        "errors": {
          "password": {
            "message": "Password Confirmation Error"
          }
        }
      })
    }
    var newUser = new User(req.body)
    newUser.save(function(err, doc){
      if(err){
        return res.json(err);
      }
      else{
        console.log('Create User Successs')
        res.json(doc);
      };
    })
  },
  login: function(req, res){
    var isValid = true;
    User.findOne({email: req.body.email}).exec(function(err, doc){
      if(err){
        return res.json(err);
      }
      if(!doc){
        isValid = false;
      }
      else{
        if(bcrypt.compareSync(req.body.password, doc.password)){
          return res.json(doc);
        }
        else{
          isValid = false;
        }
      }

      if(!isValid){
        return res.json({
          "errors": {
            "login": {
              "message" : "Invalid credentials"
            }
          }
        })
      }

    })
  },
  getUsers: function(req, res){
    User.find({}, function(err, doc){
      if(err){
        res.json(err)
      }
      else{
        res.json(doc);
      }
    })
  }

}
