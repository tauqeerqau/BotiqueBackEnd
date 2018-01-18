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
var addCustomerPattern = router.route('/addCustomerPattern');
var getAllCustomers = router.route('/getAllCustomers');
var addMeasurements = router.route('/addMeasurement');
var getAllCustomersByReferanceId = router.route('/getAllCustomersByReferanceId');
var getMeasurementByCustomerId = router.route('/getMeasurementByCustomerId');
var getCustomerAndReferancesByContactNumber = router.route('/getCustomerAndReferancesByContactNumber');
var getCustomersByName = router.route('/getCustomersByName');

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
        Customer.findOne({ ContactNumber: referanceContactNumber }, function (err, customerFromDB) {
          if (err) {
            console.log(err);
            response.message = messages.getFailureMessage();
            response.code = codes.getFailureCode();
            response.data = null;
            res.json(response);
          }
          else if (customerFromDB == null) {
            console.log(err);
            response.message = messages.getDoesNotExistMessage();
            response.code = codes.getDoesNotExistCode();
            response.data = null;
            res.json(response);
          }
          else {
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
  Measurement.findOne({ CustomerId: req.body.CustomerId }, function (err, measurment) {
    if (measurment == null)
      measurment = new Measurement();
    if (req.body.ShalwarKameezLength != undefined && req.body.ShalwarKameezLength != "")
      measurment.ShalwarKameezLength = req.body.ShalwarKameezLength;
    if (req.body.ShalwarKameezChest != undefined && req.body.ShalwarKameezChest != "")
      measurment.ShalwarKameezChest = req.body.ShalwarKameezChest;
    if (req.body.ShalwarKameezWaist != undefined && req.body.ShalwarKameezWaist != "")
      measurment.ShalwarKameezWaist = req.body.ShalwarKameezWaist;
    if (req.body.ShalwarKameezHip != undefined && req.body.ShalwarKameezHip != "")
      measurment.ShalwarKameezHip = req.body.ShalwarKameezHip;
    if (req.body.ShalwarKameezSleeve != undefined && req.body.ShalwarKameezSleeve != "")
      measurment.ShalwarKameezSleeve = req.body.ShalwarKameezSleeve;
    if (req.body.ShalwarKameezShoulder != undefined && req.body.ShalwarKameezShoulder != "")
      measurment.ShalwarKameezShoulder = req.body.ShalwarKameezShoulder;
    if (req.body.ShalwarKameezNeck != undefined && req.body.ShalwarKameezNeck != "")
      measurment.ShalwarKameezNeck = req.body.ShalwarKameezNeck;
    if (req.body.ShalwarKameezBysep != undefined && req.body.ShalwarKameezBysep != "")
      measurment.ShalwarKameezBysep = req.body.ShalwarKameezBysep;
    if (req.body.ShalwarKameezSLength != undefined && req.body.ShalwarKameezSLength != "")
      measurment.ShalwarKameezSLength = req.body.ShalwarKameezSLength;
    if (req.body.ShalwarKameezBottom != undefined && req.body.ShalwarKameezBottom != "")
      measurment.ShalwarKameezBottom = req.body.ShalwarKameezBottom;
    if (req.body.CoatLength != undefined && req.body.CoatLength != "")
      measurment.CoatLength = req.body.CoatLength;
    if (req.body.CoatChest != undefined && req.body.CoatChest != "")
      measurment.CoatChest = req.body.CoatChest;
    if (req.body.CoatWaist != undefined && req.body.CoatWaist != "")
      measurment.CoatWaist = req.body.CoatWaist;
    if (req.body.CoatHip != undefined && req.body.CoatHip != "")
      measurment.CoatHip = req.body.CoatHip;
    if (req.body.CoatSleeve != undefined && req.body.CoatSleeve != "")
      measurment.CoatSleeve = req.body.CoatSleeve;
    if (req.body.CoatShoulder != undefined && req.body.CoatShoulder != "")
      measurment.CoatShoulder = req.body.CoatShoulder;
    if (req.body.CoatNeck != undefined && req.body.CoatNeck != "")
      measurment.CoatNeck = req.body.CoatNeck;
    if (req.body.CoatBysep != undefined && req.body.CoatBysep != "")
      measurment.CoatBysep = req.body.CoatBysep;
    if (req.body.CoatHB != undefined && req.body.CoatHB != "")
      measurment.CoatHB = req.body.CoatHB;
    if (req.body.CoatCB != undefined && req.body.CoatCB != "")
      measurment.CoatCB = req.body.CoatCB;
    if (req.body.SherwaniLength != undefined && req.body.SherwaniLength != "")
      measurment.SherwaniLength = req.body.SherwaniLength;
    if (req.body.SherwaniChest != undefined && req.body.SherwaniChest != "")
      measurment.SherwaniChest = req.body.SherwaniChest;
    if (req.body.SherwaniWaist != undefined && req.body.SherwaniWaist != "")
      measurment.SherwaniWaist = req.body.SherwaniWaist;
    if (req.body.SherwaniHip != undefined && req.body.SherwaniHip != "")
      measurment.SherwaniHip = req.body.SherwaniHip;
    if (req.body.SherwaniSleeve != undefined && req.body.SherwaniSleeve != "")
      measurment.SherwaniSleeve = req.body.SherwaniSleeve;
    if (req.body.SherwaniShoulder != undefined && req.body.SherwaniShoulder != "")
      measurment.SherwaniShoulder = req.body.SherwaniShoulder;
    measurment.SherwaniNeck = req.body.SherwaniNeck;
    if (req.body.SherwaniBysep != undefined && req.body.SherwaniBysep != "")
      measurment.SherwaniBysep = req.body.SherwaniBysep;
    if (req.body.SherwaniHB != undefined && req.body.SherwaniHB != "")
      measurment.SherwaniHB = req.body.SherwaniHB;
    if (req.body.SherwaniCB != undefined && req.body.SherwaniCB != "")
      measurment.SherwaniCB = req.body.SherwaniCB;
    if (req.body.WaistCoatLength != undefined && req.body.WaistCoatLength != "")
      measurment.WaistCoatLength = req.body.WaistCoatLength;
    if (req.body.WaistCoatChest != undefined && req.body.WaistCoatChest != "")
      measurment.WaistCoatChest = req.body.WaistCoatChest;
    if (req.body.WaistCoatWaist != undefined && req.body.WaistCoatWaist != "")
      measurment.WaistCoatWaist = req.body.WaistCoatWaist;
    if (req.body.WaistCoatHip != undefined && req.body.WaistCoatHip != "")
      measurment.WaistCoatHip = req.body.WaistCoatHip;
    if (req.body.WaistCoatShoulder != undefined && req.body.WaistCoatShoulder != "")
      measurment.WaistCoatShoulder = req.body.WaistCoatShoulder;
    if (req.body.WaistCoatNeck != undefined && req.body.WaistCoatNeck != "")
      measurment.WaistCoatNeck = req.body.WaistCoatNeck;
    if (req.body.WaistCoatHB != undefined && req.body.WaistCoatHB != "")
      measurment.WaistCoatHB = req.body.WaistCoatHB;
    if (req.body.WaistCoatCB != undefined && req.body.WaistCoatCB != "")
      measurment.WaistCoatCB = req.body.WaistCoatCB;
    if (req.body.PentWaist != undefined && req.body.PentWaist != "")
      measurment.PentWaist = req.body.PentWaist;
    if (req.body.PentHip != undefined && req.body.PentHip != "")
      measurment.PentHip = req.body.PentHip;
    if (req.body.PentLength != undefined && req.body.PentLength != "")
      measurment.PentLength = req.body.PentLength;
    if (req.body.PentKnee != undefined && req.body.PentKnee != "")
      measurment.PentKnee = req.body.PentKnee;
    if (req.body.PentBottom != undefined && req.body.PentBottom != "")
      measurment.PentBottom = req.body.PentBottom;
    if (req.body.PentInside != undefined && req.body.PentInside != "")
      measurment.PentInside = req.body.PentInside;
    if (req.body.TrouserWaist != undefined && req.body.TrouserWaist != "")
      measurment.TrouserWaist = req.body.TrouserWaist;
    if (req.body.TrouserHip != undefined && req.body.TrouserHip != "")
      measurment.TrouserHip = req.body.TrouserHip;
    if (req.body.TrouserLength != "" && req.body.TrouserLength != "")
      measurment.TrouserLength = req.body.TrouserLength;
    if (req.body.TrouserKnee != undefined && req.body.TrouserKnee != "")
      measurment.TrouserKnee = req.body.TrouserKnee;
    if (req.body.TrouserBottom != undefined && req.body.TrouserBottom != "")
      measurment.TrouserBottom = req.body.TrouserBottom;
    if (req.body.TrouserInside != undefined && req.body.TrouserInside != "")
      measurment.TrouserInside = req.body.TrouserInside;
    measurment.CustomerId = req.body.CustomerId;
    if (req.body.ShalwarKameezMeasurementTakenBy != undefined && req.body.ShalwarKameezMeasurementTakenBy != "")
      measurment.ShalwarKameezMeasurementTakenBy = req.body.ShalwarKameezMeasurementTakenBy;
    if (req.body.CoatMeasurementTakenBy != undefined && req.body.CoatMeasurementTakenBy != "")
      measurment.CoatMeasurementTakenBy = req.body.CoatMeasurementTakenBy;
    if (req.body.SherwaniMeasurementTakenBy != undefined && req.body.SherwaniMeasurementTakenBy != "")
      measurment.SherwaniMeasurementTakenBy = req.body.SherwaniMeasurementTakenBy;
    if (req.body.WaistCoatMeasurementTakenBy != undefined && req.body.WaistCoatMeasurementTakenBy != "")
      measurment.WaistCoatMeasurementTakenBy = req.body.WaistCoatMeasurementTakenBy;
    if (req.body.PentMeasurementTakenBy != undefined && req.body.PentMeasurementTakenBy != "")
      measurment.PentMeasurementTakenBy = req.body.PentMeasurementTakenBy;
    if (req.body.TrouserMeasurementTakenBy != undefined && req.body.TrouserMeasurementTakenBy != "")
      measurment.TrouserMeasurementTakenBy = req.body.TrouserMeasurementTakenBy;
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

getCustomerAndReferancesByContactNumber.get(function (req, res) {
  Customer.findOne({ ContactNumber: req.query.ContactNumber }, function (err, customer) {
    if (customer == undefined) {
      response.code = codes.getDoesNotExistCode();
      response.message = messages.getDoesNotExistMessage();
      response.data = null;
      console.log(response);
      res.json(response);
    }
    else {
      Customer.find({ ReferanceId: customer._id }, function (err, customers) {
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
          customers.push(customer);
          response.data = customers;
          res.json(response);
        }
      });
    }
  }).populate('ReferanceId');
});

getCustomersByName.get(function (req, res) {
  Customer.find({ FullName: { $regex: '.*' + req.query.FullName + '.*' } }, function (err, customers) {
    if(err)
    {
      console.log(err);
      response.message = messages.getFailureMessage();
      response.code = codes.getFailureCode();
      response.data = err;
      res.json(response); 
    }
    else
    {
      response.message = messages.getSuccessMessage();
      response.code = codes.getSuccessCode();
      response.data = customers;
      res.json(response);
    }
  });
});

addCustomerPattern.post(function(req,res){
  Customer.findById(req.body.id,function(err,customer){
    if(customer==null)
    {
      console.log(err);
      response.message = messages.getFailureMessage();
      response.code = codes.getFailureCode();
      response.data = err;
      res.json(response); 
    }
    else
    {
      customer.HasPattern=true;
      customer.save(function(err,customer){
        response.message = messages.getSuccessMessage();
        response.code = codes.getSuccessCode();
        response.data = customer;
        res.json(response);
      });
    }
  });
});

module.exports = router;
