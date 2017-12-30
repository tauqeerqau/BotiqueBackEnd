var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var DressTypes = function Constructor() {
    
    };
    
    DressTypes.prototype.ShalwarKameez = function()
    {
        return 100;
    }

    DressTypes.prototype.Coat= function()
    {
        return 200;
    }
    DressTypes.prototype.Sherwani = function()
    {
        return 300;
    }

    DressTypes.prototype.WaistCoat= function()
    {
        return 400;
    }
    DressTypes.prototype.Pent = function()
    {
        return 500;
    }

    DressTypes.prototype.Trouser= function()
    {
        return 600;
    }
    
    module.exports = DressTypes;  