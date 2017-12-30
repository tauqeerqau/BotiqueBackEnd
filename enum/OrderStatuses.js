var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var OrderStatuses = function Constructor() {
    
    };
    
    OrderStatuses.prototype.AdvancePaid = function()
    {
        return 100;
    }
    OrderStatuses.prototype.ReceivedForDelivery= function()
    {
        return 200;
    }
    OrderStatuses.prototype.DeliveredAndPaid = function()
    {
        return 300;
    }

    OrderStatuses.prototype.DeliveredButNotPaid = function()
    {
        return 400;
    }
    module.exports = OrderStatuses;  