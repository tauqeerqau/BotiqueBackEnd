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
    ShalwarKameezChest:Number,
    ShalwarKameezWaist:Number,
    ShalwarKameezHip:Number,
    ShalwarKameezSleeve:Number,
    ShalwarKameezShoulder:Number,
    ShalwarKameezNeck:Number,
    ShalwarKameezBysep:Number,
    ShalwarKameezSLength:Number,
    ShalwarKameezBottom:Number,
    CoatLength:Number,
    CoatChest:Number,
    CoatWaist:Number,
    CoatHip:Number,
    CoatSleeve:Number,
    CoatShoulder:Number,
    CoatNeck:Number,
    CoatBysep:Number,
    CoatHB:Number,
    CoatCB:Number,
    SherwaniLength:Number,
    SherwaniChest:Number,
    SherwaniWaist:Number,
    SherwaniHip:Number,
    SherwaniSleeve:Number,
    SherwaniShoulder:Number,
    SherwaniNeck:Number,
    SherwaniBysep:Number,
    SherwaniHB:Number,
    SherwaniCB:Number,
    WaistCoatLength:Number,
    WaistCoatChest:Number,
    WaistCoatWaist:Number,
    WaistCoatHip:Number,
    WaistCoatShoulder:Number,
    WaistCoatNeck:Number,
    WaistCoatHB:Number,
    WaistCoatCB:Number,
    PentWaist:Number,
    PentHip:Number,
    PentLength:Number,
    PentKnee:Number,
    PentBottom:Number,
    PentInside:Number,
    TrouserWaist:Number,
    TrouserHip:Number,
    TrouserLength:Number,
    TrouserKnee:Number,
    TrouserBottom:Number,
    TrouserInside:Number,
    CustomerId :  {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    MeasurementTakenBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}
});

// Export the Mongoose model
module.exports = mongoose.model('Measurement', MeasurementSchema);