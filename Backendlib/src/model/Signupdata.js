const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Products');
const Schema = mongoose.Schema;

var NewSignupSchema = new Schema({
    name: String,
    email : String,
    username:String,
    password : String,
    confirmPassword : String,
    
});

var Signupdata = mongoose.model('signup', NewSignupSchema);                        

module.exports = Signupdata;