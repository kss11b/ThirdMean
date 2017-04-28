var mongoose = require('mongoose');
var Bid = mongoose.model('Bid');
var User = mongoose.model('User')
module.exports = {

  bid: function(req, res){
    Bid.update({item: req.body.item, max:true}, {max:false}, function(err, doc){
      if(err){
        res.json(err)
      }
      else{



    var newBid = new Bid({
      item: req.body.item,
      bidder: req.body.bidder,
      amount: req.body.amount,
      max: true
    })
    newBid.save(function(err, doc1){
      if(err){
        console.log('could not save original')
        return res.json(err);
      }
      else{
        console.log('Create Post Successs')
        res.json(doc1);
      };
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

getMax: function(req, res) {
  Bid.find({max: true}, function(err, doc){
    if(err){
      res.json(err)
    }
    else{
      res.json(doc)
    }
  }).sort('item')
}




}
