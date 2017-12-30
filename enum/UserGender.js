var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var UserGender = function Constructor() {
    
    };
    
    UserGender.prototype.Male = function()
    {
        return 1;
    }

    UserGender.prototype.Female= function()
    {
        return 2;
    }
    module.exports = UserGender;  