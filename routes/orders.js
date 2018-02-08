var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Customer = require('./../models/Customer');
var OrderStatuses = require('./../enum/OrderStatuses');
var OrderItemStatuses = require('./../enum/OrderItemStatuses');
var CustomerOrder = require('./../models/CustomerOrder');
var OrderItem = require('./../models/OrderItem');
var Measurement = require('./../models/Measurement');
var Database = require('./../utilities/Database');
var Messages = require('./../enum/Messages');
var Codes = require('./../enum/Codes');
var Response = require('./../utilities/Response');

var db = new Database({});
var messages = new Messages();
var codes = new Codes();
var orderItemStatuses = new OrderItemStatuses();
var orderStatuses = new OrderStatuses();
var response = new Response();
db.connectDatabase();

var addOrderItem = router.route('/addOrderItem');
var getOrderItems = router.route('/getOrderItems');
var addCustomerOrder = router.route('/addCustomerOrder');
var getOrderByOrderId = router.route('/getOrderByOrderId');
var getOrderItemsByOrderId = router.route('/getOrderItemsByOrderId');
var changeOrderStatus = router.route('/changeOrderStatus');
var changeOrderItemAsignee = router.route('/changeOrderItemAsignee');
var getOrdersByStatus = router.route('/getOrdersByStatus');
var getOrderItemsByStatus = router.route('/getOrderItemsByStatus');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

addOrderItem.post(function (req, res) {
  var orderItem = new OrderItem();
  orderItem.ProductName = req.body.ProductName;
  orderItem.ProductType = req.body.ProductType;
  orderItem.SpecialInstructions = req.body.SpecialInstructions;
  orderItem.Price = req.body.Price;
  orderItem.Quantity = req.body.Quantity;
  orderItem.CustomerId = req.body.CustomerId;
  orderItem.OnCreationDateUTC = req.body.OnCreationDateUTC;
  orderItem.OnUpdatetedUTC = req.body.OnUpdatetedUTC;
  orderItem.OrderItemStatus = orderItemStatuses.Pending();
  orderItem.save(function (err, orderItem) {
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
      console.log("OrderItem is");
      console.log(orderItem);
      response.data = orderItem;
      res.json(response);
    }
  });
});

getOrderItems.get(function (req, res) {
  OrderItem.find({}, function (err, orderItems) {
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
      console.log("OrderItem is");
      console.log(orderItems);
      response.data = orderItems;
      res.json(response);
    }
  }).populate('CustomerId');
});

addCustomerOrder.post(function (req, res) {
  var orderItems = req.body.orderItems;
  var orderItems = req.body.OrderItemId;
  var contactNumber = req.body.CustomerContactNumber;
  var customerOrder = new CustomerOrder();
  customerOrder.AdvanceReceived = req.body.AdvanceReceived;
  customerOrder.DeliveryDate = req.body.DeliveryDate;
  customerOrder.TryDate = req.body.TryDate;
  customerOrder.OrderTotal = req.body.OrderTotal;
  customerOrder.OrderStatus = orderStatuses.AdvancePaid();
  customerOrder.OnCreationDateUTC = req.body.OnCreationDateUTC;
  customerOrder.OnUpdatetedUTC = req.body.OnUpdatetedUTC;
  customerOrder.OrderTakenBy = req.body.OrderTakenBy;
  customerOrder.SpecialInstructions = req.body.SpecialInstructions;
  Customer.findOne({ ContactNumber: contactNumber }, function (err, customer) {
    if (customer == undefined) {
      response.code = codes.getDoesNotExistCode();
      response.message = messages.getDoesNotExistMessage();
      response.data = null;
      console.log(response);
      res.json(response);
    }
    else {
      customerOrder.CustomerId = customer._id;
      console.log("Customer Id is " + customerOrder.CustomerId);
      if (orderItems != undefined) {
        for (var i = 0; i < orderItems.length; i++) {
          var orderItem = new OrderItem();
          orderItem.ProductName = orderItems[i].ProductName;
          orderItem.ProductType = orderItems[i].ProductType;
          orderItem.SpecialInstructions = orderItems[i].SpecialInstructions;
          orderItem.Price = orderItems[i].Price;
          orderItem.Quantity = orderItems[i].Quantity;
          orderItem.CustomerId = orderItems[i].CustomerId;
          orderItem.OrderItemStatus = orderItemStatuses.Pending();
          orderItem.DeliveryDate = req.body.DeliveryDate;
          orderItem.TryDate = req.body.TryDate;
          orderItem.save();
          customerOrder.OrderItemId.push(orderItem._id);
        }
      }
      customerOrder.save(function (err, customerOrder) {
        if (err) {
          response.message = messages.getFailureMessage();
          response.code = codes.getFailureCode();
          response.data = err;
          console.log(response);
          res.json(response);
        }
        else {
          console.log("After Saving");
          console.log(customerOrder);
          response.message = messages.getSuccessMessage();
          response.code = codes.getSuccessCode();
          response.data = customerOrder;
          res.json(response);
        }
      });
    }
  });
});

getOrderByOrderId.get(function (req, res) {
  var orderId = req.query.orderId;
  CustomerOrder.findById(orderId, function (err, customerOrder) {
    res.json(customerOrder);
  })
    .populate('OrderItemId')
    .populate('OrderItemId.CustomerId')
    .populate('CustomerId');
});

getOrderItemsByOrderId.get(function (req, res) {
  CustomerOrder.findById(req.query.OrderId, function (err, orderItems) {
    res.json(orderItems);
  })
    .select('OrderItemId');
});

changeOrderStatus.post(function (req, res) {
  CustomerOrder.findById(req.body.OrderId, function (err, order) {
    order.OrderStatus = req.body.OrderStatus;
    order.save(function (err, order) {
      if (err) {
        response.message = messages.getFailureMessage();
        response.code = codes.getFailureCode();
        response.data = err;
        console.log(response);
        res.json(response);
      }
      else {
        response.message = messages.getSuccessMessage();
        response.code = codes.getSuccessCode();
        response.data = order;
        console.log(response);
        res.json(response);
      }
    });
  });
});

changeOrderItemAsignee.post(function (req, res) {
  OrderItem.findById(req.body.OrderItemId, function (err, orderItem) {
    if (req.body.SticherName != undefined && req.body.SticherName != "")
      orderItem.SticherName = req.body.SticherName;
    if (req.body.MasterName != undefined && req.body.MasterName != "")
      orderItem.MasterName = req.body.MasterName;
    if (req.body.OrderItemStatus != undefined && req.body.OrderItemStatus != "")
      orderItem.OrderItemStatus = req.body.OrderItemStatus;
    orderItem.save(function (err, orderItem) {
      if (err) {
        response.message = messages.getFailureMessage();
        response.code = codes.getFailureCode();
        response.data = err;
        console.log(response);
        res.json(response);
      }
      else {
        response.message = messages.getSuccessMessage();
        response.code = codes.getSuccessCode();
        response.data = orderItem;
        console.log(response);
        res.json(response);
      }
    });
  });
});

getOrdersByStatus.get(function (req, res) {
  CustomerOrder.find({ OrderStatus: req.query.OrderStatus }, function (err, orders) {
    if (err) {
      response.message = messages.getFailureMessage();
      response.code = codes.getFailureCode();
      response.data = err;
      console.log(response);
      res.json(response);
    }
    else {
      response.message = messages.getSuccessMessage();
      response.code = codes.getSuccessCode();
      response.data = orders;
      console.log(response);
      res.json(response);
    }
  }).populate('CustomerId');
});

getOrderItemsByStatus.get(function(req,res){
OrderItem.find({OrderItemStatus:req.query.OrderItemStatus},function(err,orderItems){
  if (err) {
    response.message = messages.getFailureMessage();
    response.code = codes.getFailureCode();
    response.data = err;
    console.log(response);
    res.json(response);
  }
  else {
    response.message = messages.getSuccessMessage();
    response.code = codes.getSuccessCode();
    response.data = orderItems;
    console.log(response);
    res.json(response);
  }
}).populate('CustomerId').populate('SticherName').populate('MasterName');
});

module.exports = router;
