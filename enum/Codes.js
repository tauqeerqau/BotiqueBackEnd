var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Codes = function Constructor() {
    
    };
    
    Codes.prototype.getSuccessCode = function()
    {
        return 200;
    }

    Codes.prototype.getFailureCode= function()
    {
        return 300;
    }
    Codes.prototype.getAlreadyExistCode= function()
    {
        return 400;
    }

    Codes.prototype.getInvalidPasswordCode= function()
    {
        return 500;
    }
    Codes.prototype.getDoesNotExistCode= function()
    {
        return 600;
    }
    module.exports = Codes;  