var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var OrderItemStatuses = function Constructor() {
    
    };
    
    OrderItemStatuses.prototype.Pending = function()
    {
        return 100;
    }

    OrderItemStatuses.prototype.AssignedToWearhouse= function()
    {
        return 200;
    }

    OrderItemStatuses.prototype.ReceivedForTry= function()
    {
        return 300;
    }
    OrderItemStatuses.prototype.ReceivedForDelivery= function()
    {
        return 400;
    }
    module.exports = OrderItemStatuses;  