/**
 * Created by Tauqeer on 05-08-2016.
 */

// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var OrderItemSchema = new mongoose.Schema({
    ProductName:String,
    ProductType:Number,
    SpecialInstructions:String,
    Price:Number,
    Quantity:Number,
    OnCreationDateUTC:Number,
    OnUpdatetedUTC:Number,
    OrderItemStatus:Number,
    CustomerId :  {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    AssignedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    AssignedTo : {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}
});

// Export the Mongoose model
module.exports = mongoose.model('OrderItem', OrderItemSchema);