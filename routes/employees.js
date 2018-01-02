var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Password = require('./../utilities/Password');
var Customer = require('./../models/Customer');
var Employee = require('./../models/Employee');
var OrderItem = require('./../models/OrderItem');
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
var addSystemUser = router.route('/addSystemUser');
var getAllEmployees = router.route('/getAllEmployees');
var login = router.route('/login');
var getMyOrderItems = router.route('/getMyOrderItems');

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
            employee.CNIC = req.body.CNIC;
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

addSystemUser.post(function(req,res){
    Employee.findById(req.body.EmployeeId,function(err,employee){
        employee.UserName=req.body.UserName;
        employee.Password = password.createHash(req.body.Password);
        employee.save(function(err,employee){
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
    });
});

login.post(function(req, res){
    Employee.findOne({ UserName: req.body.UserName }, function (err, employee) {
      if (employee == undefined) {
        response.code = codes.getDoesNotExistCode();
        response.message = messages.getDoesNotExistCode();
        response.data = null;
        console.log(response);
        res.json(response);
      }
      else {
        var validate = password.validateHash(employee.Password, req.body.Password);
        if(validate==true){
          response.message = messages.getSuccessMessage();
          response.code = codes.getSuccessCode();
          response.data = employee;
          res.json(response);
        }
        else{
          response.message = messages.getFailureMessage();
          response.code = codes.getFailureCode();
          response.data = null;
          res.json(response);
        }
      }
    });
  });

  getMyOrderItems.post(function(req,res){
    OrderItem.find({AssignedTo:req.body.AssignedTo},function(err,orderItems){
        if (err) {
            console.log(err);
            response.message = messages.getFailureMessage();
            response.code = codes.getFailureCode();
            response.data = null;
            res.json(err);
        }
        else {
            console.log(orderItems);
            response.message = messages.getSuccessMessage();
            response.code = codes.getSuccessCode();
            response.data = orderItems;
            res.json(response);
        }
    }).populate('AssignedTo');
  });

module.exports = router;
