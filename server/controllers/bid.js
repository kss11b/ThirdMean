var mongoose = require('mongoose');
var Bid = mongoose.model('Bid');
var User = mongoose.model('User')
module.exports = {

  bid: function(req, res){
    var newBid = new Bid({
      item: req.body.item,
      bidder: req.body.bidder,
      amount: req.body.amount
    })
    newBid.save(function(err, doc){
      if(err){
        console.log('could not save original')
        return res.json(err);
      }
      else{
        console.log('Create Post Successs')
        res.json(doc);
      };
    })
  },
  option: function(req,res){
    var option = new Option({
      _question : req.body.author,
      text : req.body.text
    })
    option.save(function(err, doc){
      if(err){
        return res.json(err)
      }
      else{
        Question.findById(req.body.author).exec(function(err, question){
          if(err){
            res.json(err)
          }
          else{
            question.options.push(option);
          }

          question.save(function(err, doc){
            if(err){
              console.log('could not save')
              return res.json(err);
            }
            else{
              console.log('Create Post Successs')
              res.json(doc);
            };
          })
      })
    }
  })
},


  pull: function(req,res){
    console.log("pull")
    Bid.find({}, function(err, doc){
      if(err){
        res.json(err)
      }
      else{
        res.json(doc);
      }
    }).populate("bidder").sort('-amount')


  },



end: function(req, res){
  Bid.remove({}, function(err, doc) {
    if(err){
      res.json(err)
    }
    else{
      console.log('collection removed')
      res.json(doc)
    }

  });
},

show: function(req, res){
  console.log('backend hit')
  Question.findById(req.params.id, function(err, doc){
    if(err){
      res.json(err)
    }
    else{
      res.json(doc)
    }
  }).populate('options')
},





}
