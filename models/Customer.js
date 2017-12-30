/**
 * Created by Tauqeer on 05-08-2016.
 */

// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var CustomerSchema = new mongoose.Schema({
    Email:String,
    FullName:String,
    ContactNumber:String,
    Address:String,
    UserGender:Number,
    DateOfBirth:Number,
    OnCreationDateUTC:Number,
    OnUpdatetedUTC:Number,
    ReferanceId :  {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}
});

// Export the Mongoose model
module.exports = mongoose.model('Customer', CustomerSchema);