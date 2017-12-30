/**
 * Created by Tauqeer on 05-08-2016.
 */
var Customer=require('./Customer');
var Employee = require('./Employee');
// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var MeasurementSchema = new mongoose.Schema({
    ShalwarKameezLength:Number,
    Chest:Number,
    Waist:Number,
    Hip:Number,
    Sleeve:Number,
    Shoulder:Number,
    Neck:Number,
    Bysep:Number,
    SLength:Number,
    ShalwarKameezBottom:Number,
    Hb:Number,
    Cb:Number,
    CoatLength:Number,
    Knee:Number,
    PentBottom:Number,
    Inside:Number,
    CustomerId :  {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    MeasurementTakenBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}
});

// Export the Mongoose model
module.exports = mongoose.model('Measurement', MeasurementSchema);