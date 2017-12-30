var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Password = require('./../utilities/Password');
var Customer = require('./../models/Customer');
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

var addCustomer = router.route('/addCustomer');
var getAllCustomers = router.route('/getAllCustomers');
var addMeasurements = router.route('/addMeasurement');
var getAllCustomersByReferanceId = router.route('/getAllCustomersByReferanceId');
var getMeasurementByCustomerId = router.route('/getMeasurementByCustomerId');
var getCustomerAndReferancesByContactNumber = router.route('/getCustomerAndReferancesByContactNumber');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

addCustomer.post(function (req, res) {
  var customer;
  Customer.findOne({ ContactNumber: req.body.ContactNumber }, function (err, user) {
    if (user != undefined) {
      response.code = codes.getAlreadyExistCode();
      response.message = messages.getAlreadyExistMessage();
      response.data = null;
      console.log(response);
      res.json(response);
    }
    else {
      customer = new Customer();
      customer.Email = req.body.Email;
      customer.FullName = req.body.FullName;
      customer.ContactNumber = req.body.ContactNumber;
      customer.Address = req.body.Address;
      customer.UserGender = req.body.UserGender;
      customer.DateOfBirth = req.body.DateOfBirth;
      var referanceContactNumber = req.body.ReferanceContactNumber;
      if (referanceContactNumber != undefined && referanceContactNumber != "") {
        Customer.findOne({ContactNumber:referanceContactNumber},function(err,customerFromDB){
          if (err) {
            console.log(err);
            response.message = messages.getFailureMessage();
            response.code = codes.getFailureCode();
            response.data = null;
            res.json(response);
          }
          else if(customerFromDB==null)
          {
            console.log(err);
            response.message = messages.getDoesNotExistMessage();
            response.code = codes.getDoesNotExistCode();
            response.data = null;
            res.json(response);
          }
          else
          {
            customer.ReferanceId = customerFromDB._id;
            customer.save(function (err, user) {
              if (err) {
                console.log(err);
                response.message = messages.getFailureMessage();
                response.code = codes.getFailureCode();
                response.data = null;
                res.json(response);
              }
              else {
                console.log(customer);
                response.message = messages.getSuccessMessage();
                response.code = codes.getSuccessCode();
                response.data = customer;
                res.json(response);
              }
            });
          }
        });
      }
      else {
        customer.save(function (err, user) {
          if (err) {
            console.log(err);
            response.message = messages.getFailureMessage();
            response.code = codes.getFailureCode();
            res.json(response);
          }
          else {
            console.log(customer);
            response.message = messages.getSuccessMessage();
            response.code = codes.getSuccessCode();
            response.data = customer;
            res.json(response);
          }
        });
      }
    }
  });
});

getAllCustomers.get(function (req, res) {
  Customer.find(function (err, customers) {
    if (err) {
      console.log(err);
      response.message = messages.getFailureMessage();
      response.code = codes.getFailureCode();
      res.json(err);
    }
    else {
      console.log(customers);
      response.message = messages.getSuccessMessage();
      response.code = codes.getSuccessCode();
      response.data = customers;
      res.json(response);
    }
  });
});

addMeasurements.post(function (req, res) {
  var measurment = new Measurement();
  measurment.ShalwarKameezLength = req.body.ShalwarKameezLength;
  measurment.Chest = req.body.Chest;
  measurment.Waist = req.body.Chest;
  measurment.Hip = req.body.Hip;
  measurment.Sleeve = req.body.Sleeve;
  measurment.Shoulder = req.body.Shoulder;
  measurment.Neck = req.body.Neck;
  measurment.Bysep = req.body.Bysep;
  measurment.SLength = req.body.SLength;
  measurment.ShalwarKameezBottom = req.body.ShalwarKameezBottom;
  measurment.Hb = req.body.Hb;
  measurment.Cb = req.body.Cb;
  measurment.CoatLength = req.body.CoatLength;
  measurment.Knee = req.body.Knee;
  measurment.PentBottom = req.body.PentBottom;
  measurment.Inside = req.body.Inside;
  measurment.CustomerId = req.body.CustomerId;
  measurment.MeasurementTakenBy = req.body.MeasurementTakenBy;
  console.log("Measurement before saving is ");
  console.log(measurment);
  measurment.save(function (err, measurment) {
    if (err) {
      console.log(err);
      response.message = messages.getFailureMessage();
      response.code = codes.getFailureCode();
      response.data = err;
      res.json(err);
    }
    else {
      response.message = messages.getSuccessMessage();
      response.code = codes.getSuccessCode();
      console.log("Measurement is");
      console.log(measurment);
      response.data = measurment;
      res.json(response);
    }
  });
});

getAllCustomersByReferanceId.get(function (req, res) {
  Customer.find({ ReferanceId: req.query.ReferanceId }, function (err, customers) {
    if (err) {
      console.log(err);
      response.message = messages.getFailureMessage();
      response.code = codes.getFailureCode();
      response.data = err;
      res.json(err);
    }
    else {
      response.message = messages.getSuccessMessage();
      response.code = codes.getSuccessCode();
      response.data = customers;
      res.json(response);
    }
  }).populate('ReferanceId');
});

getMeasurementByCustomerId.get(function (req, res) {
  Measurement.find({ CustomerId: req.query.CustomerId }, function (err, measurment) {
    if (err) {
      console.log(err);
      response.message = messages.getFailureMessage();
      response.code = codes.getFailureCode();
      response.data = err;
      res.json(err);
    }
    else {
      response.message = messages.getSuccessMessage();
      response.code = codes.getSuccessCode();
      response.data = measurment;
      res.json(response);
    }
  }).populate('CustomerId')
    .populate('MeasurementTakenBy');
});

getCustomerAndReferancesByContactNumber.get(function(req,res){
  Customer.findOne({ ContactNumber: req.query.ContactNumber }, function (err, customer) {
    if (customer == undefined) {
      response.code = codes.getDoesNotExistCode();
      response.message = messages.getDoesNotExistMessage();
      response.data = null;
      console.log(response);
      res.json(response);
    }
    else
    {
      Customer.find({ ReferanceId: customer._id }, function (err, customers) {
        if (err) {
          console.log(err);
          response.message = messages.getFailureMessage();
          response.code = codes.getFailureCode();
          response.data = err;
          res.json(err);
        }
        else
        {
          response.message = messages.getSuccessMessage();
          response.code = codes.getSuccessCode();
          customers.push(customer);
          response.data = customers;
          res.json(response);     
        }
      });
    }
  }).populate('ReferanceId');
});

module.exports = router;
