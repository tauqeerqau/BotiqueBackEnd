/**
 * Created by Tauqeer on 05-08-2016.
 */

// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var EmployeeSchema = new mongoose.Schema({
    Email:String,
    FullName:String,
    ContactNumber:String,
    Address:String,
    UserName:String,
    Password:String,
    EmployeeRole:Number,
    OnCreationDateUTC:Number,
    OnUpdatetedUTC:Number
});

// Export the Mongoose model
module.exports = mongoose.model('Employee', EmployeeSchema);