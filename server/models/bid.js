var mongoose = require('mongoose');
var BidSchema = new mongoose.Schema({
 item:{type: Number, required: true},
 bidder: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 amount: {type: Number, min: 1, required:true}




}, {timestamps: true})
var Bid = mongoose.model('Bid', BidSchema);
