var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
 fname:{type: String, required: true, minlength: 3},
 lname:{type: String, required: true, minlength: 3},
 username:{type: String, unique:true, required: true, maxlength:20, minlength: 3},
 email:{type: String, required: true, unique:true},
 password:{type: String, required:true},
 bids:[{type: mongoose.Schema.Types.ObjectId, ref: "Bid"}],


}, {timestamps: true})
UserSchema.pre("save", function(done){
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  done();
})

var User = mongoose.model('User', UserSchema);
