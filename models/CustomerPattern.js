/**
 * Created by Tauqeer on 05-08-2016.
 */

// Load required packages
var mongoose = require('mongoose');
var Customer = require('./Customer');

// Define our beer schema
var CustomerPatternSchema = new mongoose.Schema({
    CustomerId : {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    DressType : Number
});

// Export the Mongoose model
module.exports = mongoose.model('CustomerPattern', CustomerPatternSchema);