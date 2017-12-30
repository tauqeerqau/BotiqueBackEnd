var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Password = require('./../utilities/Password');
var Customer = require('./../models/Customer');
var Employee = require('./../models/Employee');
var Measurement = require('./../models/Measurement');
var Database = require('./../utilities/Database');
var Messages = require('./../enum/Messages');
var Codes = require('./../enum/Codes');
var UserGender = require('./../enum/UserGender');
var Response = require('./../utilities/Response');

var db = new Database({});
var messages = new Messages();
var codes = new Codes();
var response = new Response();
var password = new Password();
var userGender = new UserGender();
db.connectDatabase();

var addEmployee = router.route('/addEmployee');
var getAllEmployees = router.route('/getAllEmployees');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

addEmployee.post(function (req, res) {
    var employee;
    Employee.findOne({ ContactNumber: req.body.ContactNumber }, function (err, employee) {
        if (employee != undefined) {
            response.code = codes.getAlreadyExistCode();
            response.message = messages.getAlreadyExistMessage();
            response.data = null;
            console.log(response);
            res.json(response);
        }
        else {
            employee = new Employee();
            employee.Email = req.body.Email;
            employee.FullName = req.body.FullName;
            employee.ContactNumber = req.body.ContactNumber;
            employee.Address = req.body.Address;
            employee.EmployeeRole = req.body.EmployeeRole;
            employee.save(function (err, employee) {
                if (err) {
                    console.log(err);
                    response.message = messages.getFailureMessage();
                    response.code = codes.getFailureCode();
                    response.data = null;
                    res.json(err);
                }
                else {
                    console.log(employee);
                    response.message = messages.getSuccessMessage();
                    response.code = codes.getSuccessCode();
                    response.data = employee;
                    res.json(response);
                }
            });
        }
    });
});

getAllEmployees.get(function(req,res){
    Employee.find({},function(err,employees){
        if (err) {
            console.log(err);
            response.message = messages.getFailureMessage();
            response.code = codes.getFailureCode();
            response.data = null;
            res.json(err);
        }
        else {
            console.log(employees);
            response.message = messages.getSuccessMessage();
            response.code = codes.getSuccessCode();
            response.data = employees;
            res.json(response);
        } 
    });
});

module.exports = router;
