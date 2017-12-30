var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Messages = function Constructor() {
    
    };
    
    Messages.prototype.getSuccessMessage = function()
    {
        return "SUCCESS";
    }

    Messages.prototype.getFailureMessage= function()
    {
        return "FAILURE";
    }
    Messages.prototype.getAlreadyExistMessage= function()
    {
        return "USER ALREADY EXISTS";
    }
    Messages.prototype.getDoesNotExistMessage= function()
    {
        return "USER DOES NOT EXIST";
    }
    Messages.prototype.getInvalidPassword = function()
    {
        return "INVALID PASSWORD";
    }
    module.exports = Messages;  