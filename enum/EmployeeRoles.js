var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var UserRoles = function Constructor() {
    
    };
    
    UserRoles.prototype.Admin = function()
    {
        return 1;
    }

    UserRoles.prototype.Wearhouse= function()
    {
        return 2;
    }
    UserRoles.prototype.Master = function()
    {
        return 3;
    }

    UserRoles.prototype.Sticher= function()
    {
        return 4;
    }
    UserRoles.prototype.ShoeMaker = function()
    {
        return 5;
    }

    UserRoles.prototype.EmborishmentWork= function()
    {
        return 6;
    }
    module.exports = UserRoles;  