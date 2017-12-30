/**
 * Created by Tauqeer on 05-08-2016.
 */

// Load required packages
var mongoose = require('mongoose');
var OrderItem = require('./OrderItem');
var Customer = require('./Customer');

// Define our beer schema
var CustomerOrderSchema = new mongoose.Schema({
    SpecialInstructions:String,
    OrderTotal:Number,
    AdvanceReceived:Number,
    DeliveryDate:Number,
    TryDate:Number,
    OrderStatus:Number,
    OrderItemId :  [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}],
    CustomerId : {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    OrderTakenBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    OnCreationDateUTC:Number,
    OnUpdatetedUTC:Number
});

// Export the Mongoose model
module.exports = mongoose.model('CustomerOrder', CustomerOrderSchema);