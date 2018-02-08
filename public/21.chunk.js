webpackJsonpac__name_([21],{

/***/ "./node_modules/rxjs/add/operator/do.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var do_1 = __webpack_require__("./node_modules/rxjs/operator/do.js");
Observable_1.Observable.prototype.do = do_1._do;
Observable_1.Observable.prototype._do = do_1._do;
//# sourceMappingURL=do.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/do.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link map}
 * @see {@link subscribe}
 *
 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
 * callback for `next`.
 * @param {function} [error] Callback for errors in the source.
 * @param {function} [complete] Callback for the completion of the source.
 * @return {Observable} An Observable identical to the source, but runs the
 * specified Observer or callback(s) for each item.
 * @method do
 * @name do
 * @owner Observable
 */
function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
}
exports._do = _do;
var DoOperator = (function () {
    function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DoSubscriber = (function (_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, nextOrObserver, error, complete) {
        _super.call(this, destination);
        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        this.add(safeSubscriber);
        this.safeSubscriber = safeSubscriber;
    }
    DoSubscriber.prototype._next = function (value) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.next(value);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.next(value);
        }
    };
    DoSubscriber.prototype._error = function (err) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.error(err);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.error(err);
        }
    };
    DoSubscriber.prototype._complete = function () {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.complete();
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.complete();
        }
    };
    return DoSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=do.js.map

/***/ },

/***/ "./src/app/customers/CustomerMeasurementForm.style.css":
/***/ function(module, exports) {

module.exports = ".add-btn{\r\n    border:none;\r\n    height:46px;\r\n    padding:10px 2px;\r\n    min-width:250px;\r\n    margin:0 auto;\r\n  }\r\n\r\n  fieldset{\r\n    border: 1px solid #ccc;\r\n    padding: 10px;\r\n  }\r\n\r\n  legend{\r\n    color: black;\r\n    font-size: 22px;\r\n    border-bottom: none;\r\n    padding-left: 30px;\r\n  }\r\n.customername\r\n{\r\n  \r\n  width: 174px;\r\n  height: 40px;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0;\r\n  padding-left: 5px;\r\n  color: #555555;\r\n  padding: 10px;\r\n  margin: 25px auto;\r\n}\r\n  #selectEmployee{\r\n    display:none;\r\n  }\r\n\r\n  .common-form{\r\n    -webkit-box-shadow: 0 10px 6px -6px #777;\r\n\t   -moz-box-shadow: 0 10px 6px -6px #777;\r\n\t        box-shadow: 0 10px 6px -6px #777;\r\n  }\r\n\r\n  .row{\r\n    margin-top:20px;\r\n  }\r\n  .row-2{\r\n    margin-top:100px;\r\n  }\r\n\r\n  .measurementsType{\r\n    width:350px;\r\n    height:40px;\r\n    border:1px solid #ccc;\r\n    border-radius: 0;\r\n    padding-left:5px;\r\n    color:#555555;\r\n    padding:10px;\r\n    margin:25px auto;\r\n  }\r\n\r\n  .record-text{\r\n    margin:25px auto;\r\n    text-align: center;\r\n    columns: #222222;\r\n    text-transform: uppercase;\r\n  }\r\n\r\n\r\n\r\n  /* The snackbar - position it at the bottom and in the middle of the screen */\r\n#snackbar {\r\n  visibility: hidden; /* Hidden by default. Visible on click */\r\n  min-width: 250px; /* Set a default minimum width */\r\n  margin-left: -125px; /* Divide value of min-width by 2 */\r\n  background-color: #333; /* Black background color */\r\n  color: #fff; /* White text color */\r\n  text-align: center; /* Centered text */\r\n  border-radius: 2px; /* Rounded borders */\r\n  padding: 16px; /* Padding */\r\n  position: fixed; /* Sit on top of the screen */\r\n  z-index: 1; /* Add a z-index if needed */\r\n  left: 50%; /* Center the snackbar */\r\n  bottom: 30px; /* 30px from the bottom */\r\n}\r\n\r\n/* Show the snackbar when clicking on a button (class added with JavaScript) */\r\n#snackbar.show {\r\n  visibility: visible; /* Show the snackbar */\r\n\r\n/* Add animation: Take 0.5 seconds to fade in and out the snackbar. \r\nHowever, delay the fade out process for 2.5 seconds */\r\n  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\r\n  animation: fadein 0.5s, fadeout 0.5s 2.5s;\r\n}\r\n\r\n/* Animations to fade the snackbar in and out */\r\n@-webkit-keyframes fadein {\r\n  from {bottom: 0; opacity: 0;} \r\n  to {bottom: 30px; opacity: 1;}\r\n}\r\n\r\n@keyframes fadein {\r\n  from {bottom: 0; opacity: 0;}\r\n  to {bottom: 30px; opacity: 1;}\r\n}\r\n\r\n@-webkit-keyframes fadeout {\r\n  from {bottom: 30px; opacity: 1;} \r\n  to {bottom: 0; opacity: 0;}\r\n}\r\n\r\n@keyframes fadeout {\r\n  from {bottom: 30px; opacity: 1;}\r\n  to {bottom: 0; opacity: 0;}\r\n}\r\n\r\n#selectType{\r\n  display:none;\r\n  text-align: center;\r\n}"

/***/ },

/***/ "./src/app/customers/CustomerMeasurementForm.template.html":
/***/ function(module, exports) {

module.exports = "<h1>Add Measurement Form</h1>\r\n<div id=\"snackbar\"></div>\r\n\r\n<div class=\"container\">\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6 col-lg-6 col-sm-6 offset-lg-3 offset-md-3 offset-sm-3 common-form\">\r\n      <div class=\"form-group\">\r\n        \r\n                <label for=\"normal-field\" class=\"col-form-label\">Enter Contact Name</label>\r\n        \r\n                <input type=\"text\"  [(ngModel)]=\"newMeasurement.FullName\" id=\"normal-field\" class=\"form-control custom-inputs\"\r\n                  placeholder=\"Please Enter Customer Contact Name\">\r\n        \r\n              </div>\r\n              <div class=\"form-group\">\r\n                <button (click)=\"searchByName()\" class=\"btn btn-primary\">Search</button>\r\n              </div>\r\n      <div class=\"form-group\">\r\n\r\n        <label for=\"normal-field\" class=\"col-form-label\">Enter Contact Number</label>\r\n\r\n        <input type=\"text\" [(ngModel)]=\"newMeasurement.CustomerContactNumber\" id=\"normal-field\" class=\"form-control custom-inputs\"\r\n          placeholder=\"Please Enter Customer Contact Number\">\r\n\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <button (click)=\"search()\" class=\"btn btn-primary\">Search</button>\r\n      </div>\r\n\r\n\r\n      <div class=\"form-group\">\r\n        <select class=\"customername\"(change)=\"onChange($event.target.value)\">\r\n          <option disabled selected>Select Customers</option>\r\n          <option *ngFor='let customer of customers' value={{customer._id}}>\r\n            {{customer.FullName}}\r\n          </option>\r\n        </select>\r\n      </div>\r\n\r\n      <div class=\"row\" id=\"selectType\">\r\n        <h1 class=\"record-text\">Record Measurements for:</h1>\r\n        <select class=\"measurementsType\" (change)=\"getForms($event.target.value)\">\r\n          <option disabled selected>Select Option</option>\r\n          <option value=\"Shalwar Kameez\">Shalwar Kameez</option>\r\n          <option value=\"Coat\">Coat</option>\r\n          <option value=\"Sherwani\">Sherwani</option>\r\n          <option value=\"Waist Coat\">Waist Coat</option>\r\n          <option value=\"Pant\">Pant</option>\r\n          <option value=\"Trouser\">Trouser</option>\r\n          <option value=\"Shawl\">Shawl</option>\r\n          <option value=\"Shoes\">Shoes</option>\r\n        </select>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"form-group\" id=\"selectEmployee\">\r\n          <select  class=\"measurementsType\" (change)=\"getEmployeesShalwarKameezId($event.target.value)\">\r\n            <option disabled selected>Select Employee</option>\r\n            <option *ngFor='let Employees of employees' value={{Employees._id}}>\r\n              {{Employees.FullName}}\r\n            </option>\r\n          </select>\r\n        </div>\r\n      </div>\r\n      \r\n\r\n    </div>\r\n  </div>\r\n  \r\n  <div class=\"row row-2\">\r\n\r\n    <div class=\"col-md-6 col-lg-6 col-sm-6 offset-md-3 offset-sm-3 offset-lg-3 col-xs-12\">\r\n\r\n\r\n      <div class=\"shalwar\" *ngIf=\"ShalwarKameez\">\r\n        <!-- Shalwar Kameez Div -->\r\n\r\n        <fieldset>\r\n\r\n          <legend>Shalwar Kameez</legend>\r\n         \r\n          \r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Length</label>\r\n\r\n            <input type=\"text\" #lengthRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezLength\" id=\"normal-field\" class=\"form-control custom-inputs\"\r\n              placeholder=\"Length Must Be Numeric\" required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"lengthRef.errors && (lengthRef.dirty || lengthRef.touched)\" class=\"alert alert-danger\">\r\n              <div [hidden]=\"!lengthRef.errors.required\">\r\n                Length Must Be Required\r\n              </div>\r\n              <div [hidden]=\"!lengthRef.errors.pattern\">\r\n                  Please Input Only Numeric Value\r\n                </div>\r\n              \r\n              </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\"> Please Enter Chest </label>\r\n\r\n            <input type=\"text\" #chestRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezChest\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"chestRef.errors && (chestRef.dirty || chestRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!chestRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  <div [hidden]=\"!chestRef.errors.pattern\">\r\n                      Please Input Only Numeric Value\r\n                    </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Waist</label>\r\n\r\n            <input type=\"text\" #waistRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezWaist\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Waist Must Be Numeric\"\r\n              required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"waistRef.errors && (waistRef.dirty || waistRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waistRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  <div [hidden]=\"!waistRef.errors.pattern\">\r\n                      Please Input Only Numeric Value\r\n                    </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\"> Please Enter Hip Measurement</label>\r\n\r\n            <input type=\"text\" #hipRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezHip\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Hip Measurement Must Be Numeric\" \r\n              required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"hipRef.errors && (hipRef.dirty || hipRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!hipRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  <div [hidden]=\"!hipRef.errors.pattern\">\r\n                      Please Input Only Numeric Value\r\n                    </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Sleeve Length</label>\r\n\r\n            <input type=\"text\" #sleeveRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezSleeve\" id=\"normal-field\" class=\"form-control custom-inputs\"\r\n              placeholder=\"Length Must Be Numeric\" required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"sleeveRef.errors && (sleeveRef.dirty || sleeveRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!sleeveRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  <div [hidden]=\"!sleeveRef.errors.pattern\">\r\n                      Please Input Only Numeric Value\r\n                    </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Shoulder Length</label>\r\n\r\n            <input type=\"text\" #shRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezShoulder\" id=\"normal-field\" class=\"form-control custom-inputs\"\r\n              placeholder=\"Length Must Be Numeric\" required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"shRef.errors && (shRef.dirty || shRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!shRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  <div [hidden]=\"!shRef.errors.pattern\">\r\n                      Please Input Only Numeric Value\r\n                    </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Neck Measurement</label>\r\n\r\n            <input type=\"text\" #neckRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezNeck\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Neck Measurement Must Be Numeric\"\r\n              required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"neckRef.errors && (neckRef.dirty || neckRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!neckRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  <div [hidden]=\"!neckRef.errors.pattern\">\r\n                      Please Input Only Numeric Value\r\n                    </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Bysep Length</label>\r\n\r\n            <input type=\"text\" #bysepRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezBysep\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"bysepRef.errors && (bysepRef.dirty || bysepRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!bysepRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  <div [hidden]=\"!bysepRef.errors.pattern\">\r\n                      Please Input Only Numeric Value\r\n                    </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter S. Length</label>\r\n\r\n            <input type=\"text\" #sRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezSLength\" id=\"normal-field\" class=\"form-control custom-inputs\"\r\n              placeholder=\"Length Must Be Numeric\" required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"sRef.errors && (sRef.dirty || sRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!sRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  <div [hidden]=\"!sRef.errors.pattern\">\r\n                      Please Input Only Numeric Value\r\n                    </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Bottom</label>\r\n\r\n            <input type=\"text\" #bottomRef=\"ngModel\" [(ngModel)]=\"newMeasurement.ShalwarKameezBottom\" id=\"normal-field\" class=\"form-control custom-inputs\"\r\n              placeholder=\"Bottom Must Be Numeric\" required pattern=\"[0-9]*\" ngModel>\r\n              <div *ngIf=\"bottomRef.errors && (bottomRef.dirty || bottomRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!bottomRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  <div [hidden]=\"!bottomRef.errors.pattern\">\r\n                      Please Input Only Numeric Value\r\n                    </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n          <button (click)=\"addMeasurement()\" class=\"btn btn-success add-btn\">Add Measurement</button>\r\n\r\n        </fieldset>\r\n\r\n      </div>\r\n      <!-- Shalwar Kameez div  -->\r\n\r\n\r\n\r\n\r\n      <div class=\"shalwar\" *ngIf=\"Coat\">\r\n        <!-- Coat -div -->\r\n\r\n        <fieldset>\r\n\r\n          <legend>Coat</legend>\r\n          \r\n         <!--  <div class=\"form-group\">\r\n            <select (change)=\"getEmployeesShalwarCoatId($event.target.value)\">\r\n              <option disabled selected>Select Employee</option>\r\n              <option *ngFor='let Employees of employees' value={{Employees._id}}>\r\n                {{Employees.FullName}}\r\n              </option>\r\n            </select>\r\n          </div> -->\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Coat Length</label>\r\n\r\n            <input type=\"text\" #coatRef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatLength\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatRef.errors && (coatRef.dirty || coatRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Coat Chest</label>\r\n\r\n            <input type=\"text\" #coatCRef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatChest\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatCRef.errors && (coatCRef.dirty || coatCRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatCRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter coat Waist</label>\r\n\r\n            <input type=\"text\" #coatWRef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatWaist\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Waist Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatWRef.errors && (coatWRef.dirty || coatWRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatWRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Hip Measurement</label>\r\n\r\n            <input type=\"text\" #coatHRef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatHip\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Hip Measurement Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatHRef.errors && (coatHRef.dirty || coatHRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatHRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Sleeve Length</label>\r\n\r\n            <input type=\"text\" #coatSLRef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatSleeve\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Sleeve Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatSLRef.errors && (coatSLRef.dirty || coatSLRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatSLRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Shoulder Length</label>\r\n\r\n            <input type=\"text\" #coatSORef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatShoulder\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Shoulder Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatSORef.errors && (coatSORef.dirty || coatSORef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatSORef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Neck Measurement</label>\r\n\r\n            <input type=\"text\" #coatNeckRef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatNeck\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Neck Measurement Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatNeckRef.errors && (coatNeckRef.dirty || coatNeckRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatNeckRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Bysep Length</label>\r\n\r\n            <input type=\"text\" #coatBysepRef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatBysep\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatBysepRef.errors && (coatBysepRef.dirty || coatBysepRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatBysepRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter H.B</label>\r\n\r\n            <input type=\"text\" #coatHBRef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatHB\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"H.B Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatHBRef.errors && (coatHBRef.dirty || coatHBRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatHBRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n \r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter C.B</label>\r\n\r\n            <input type=\"text\"  #coatCBRef=\"ngModel\" [(ngModel)]=\"newMeasurement.CoatCB\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"C.B Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"coatCBRef.errors && (coatCBRef.dirty || coatCBRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!coatCBRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n          <button (click)=\"addMeasurement()\" class=\"btn btn-success add-btn\">Add Measurement</button>\r\n\r\n        </fieldset>\r\n\r\n      </div>\r\n      <!-- Coat div  -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n      <div class=\"shalwar\" *ngIf=\"Sherwani\">\r\n\r\n        <fieldset>\r\n          <!-- Sherwani div  -->\r\n\r\n          <legend>Sherwani</legend>\r\n          \r\n        <!--   <div class=\"form-group\">\r\n            <select (change)=\"getEmployeesSherwaniId($event.target.value)\">\r\n              <option disabled selected>Select Employee</option>\r\n              <option *ngFor='let Employees of employees' value={{Employees._id}}>\r\n                {{Employees.FullName}}\r\n              </option>\r\n            </select>\r\n          </div> -->\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Length</label>\r\n\r\n            <input type=\"text\" #waniRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniLength\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniRef.errors && (waniRef.dirty || waniRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Sherwani Chest</label>\r\n\r\n            <input type=\"text\" #waniCRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniChest\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniCRef.errors && (waniCRef.dirty || waniCRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniCRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Sherwani Waist</label>\r\n\r\n            <input type=\"text\" #waniWRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniWaist\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Waist Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniWRef.errors && (waniWRef.dirty || waniWRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniWRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Hip Measurement</label>\r\n\r\n            <input type=\"text\" #waniHRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniHip\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Hip Measurement Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniHRef.errors && (waniHRef.dirty || waniHRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniHRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Sleeve Length</label>\r\n\r\n            <input type=\"text\" #waniHSRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniSleeve\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Sleeve Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniHSRef.errors && (waniHSRef.dirty || waniHSRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniHSRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Shoulder Length</label>\r\n\r\n            <input type=\"text\" #waniHSSRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniShoulder\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Shoulder Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniHSSRef.errors && (waniHSSRef.dirty || waniHSSRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniHSSRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Neck Measurement</label>\r\n\r\n            <input type=\"text\" #waniNeckRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniNeck\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Neck Measurement Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniNeckRef.errors && (waniNeckRef.dirty || waniNeckRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniNeckRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Bysep Length</label>\r\n\r\n            <input type=\"text\" #waniBysepRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniBysep\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\" Bysep Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniBysepRef.errors && (waniBysepRef.dirty || waniBysepRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniBysepRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter H.B</label>\r\n\r\n            <input type=\"text\" #waniHBRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniHB\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"H.B Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniHBRef.errors && (waniHBRef.dirty || waniHBRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniHBRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter C.B</label>\r\n\r\n            <input type=\"text\" #waniCBRef=\"ngModel\" [(ngModel)]=\"newMeasurement.SherwaniCB\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"C.B Length Must Be Numeric\"\r\n              required ngModel>\r\n              <div *ngIf=\"waniCBRef.errors && (waniCBRef.dirty || waniCBRef.touched)\" class=\"alert alert-danger\">\r\n                  <div [hidden]=\"!waniCBRef.errors.required\">\r\n                    Length Must Be Required\r\n                  </div>\r\n                  </div>\r\n\r\n          </div>\r\n\r\n          <button (click)=\"addMeasurement()\" class=\"btn btn-success add-btn\">Add Measurement</button>\r\n\r\n        </fieldset>\r\n\r\n      </div>\r\n      <!-- sherwani div  -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n      <div class=\"shalwar\" *ngIf=\"WaistCoat\">\r\n\r\n        <fieldset>\r\n          <!-- waist coat div  -->\r\n\r\n          <legend>Waist Coat</legend>\r\n        <!--   \r\n          <div class=\"form-group\">\r\n            <select (change)=\"getEmployeesWaistCoatId($event.target.value)\">\r\n              <option disabled selected>Select Employee</option>\r\n              <option *ngFor='let Employees of employees' value={{Employees._id}}>\r\n                {{Employees.FullName}}\r\n              </option>\r\n            </select>\r\n          </div> -->\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Coat Length</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.CoatLength\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Coat Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Coat Chest</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.CoatChest\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Coat Chest Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter coat Waist</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.CoatWaist\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"coat Waist Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Hip Measurement</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.CoatHip\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Hip Measurement Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Shoulder Length</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.CoatShoulder\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Shoulder Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Neck Measurement</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.CoatNeck\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Neck Measurement Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter H.B</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.CoatHB\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"H.B Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter C.B</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.CoatCB\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"C.B Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n          <button (click)=\"addMeasurement()\" class=\"btn btn-success add-btn\">Add Measurement</button>\r\n\r\n        </fieldset>\r\n\r\n      </div>\r\n      <!-- waist coat div  -->\r\n\r\n\r\n\r\n\r\n      <div class=\"shalwar\" *ngIf=\"Pant\">\r\n        <!-- pants div  -->\r\n\r\n        <fieldset>\r\n\r\n          <legend>Pant</legend>\r\n\r\n  <!--         <div class=\"form-group\">\r\n            <select (change)=\"getEmployeesPantId($event.target.value)\">\r\n              <option disabled selected>Select Employee</option>\r\n              <option *ngFor='let Employees of employees' value={{Employees._id}}>\r\n                {{Employees.FullName}}\r\n              </option>\r\n            </select>\r\n          </div> -->\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Pent Waist</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.PentWaist\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Waist Length Must Be Numaric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Hip Measurement</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.PentHip\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Hip Measurement Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Length</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.PentLength\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Knee Measurement</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.PentKnee\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Knee Measurement Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Bottom</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.PentBottom\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Bottom Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Inside</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.PentInside\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Inside Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n          <button (click)=\"addMeasurement()\" class=\"btn btn-success add-btn\">Add Measurement</button>\r\n\r\n        </fieldset>\r\n\r\n      </div>\r\n      <!-- pants div  -->\r\n\r\n\r\n\r\n\r\n      \r\n\r\n\r\n\r\n      <div class=\"shalwar\" *ngIf=\"Trouser\">\r\n        <!-- Trouser div  -->\r\n\r\n        <fieldset>\r\n\r\n          <legend>Trouser</legend>\r\n\r\n      <!--     <div class=\"form-group\">\r\n            <select (change)=\"getEmployeesTrouserId($event.target.value)\">\r\n              <option disabled selected>Select Employee</option>\r\n              <option *ngFor='let Employees of employees' value={{Employees._id}}>\r\n                {{Employees.FullName}}\r\n              </option>\r\n            </select>\r\n          </div>\r\n -->\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Trouser Waist</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.TrouserWaist\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Waist Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Hip Measurement</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.TrouserHip\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Hip Measurement Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Trouser Length</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.TrouserLength\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Knee Measurement</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.TrouserKnee\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Knee Measurement Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Trouser Bottom</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.TrouserBottom\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Bottom Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Trouser Inside</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.TrouserInside\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n          <button (click)=\"addMeasurement()\" class=\"btn btn-success add-btn\">Add Measurement</button>\r\n\r\n        </fieldset>\r\n\r\n      </div>\r\n      <!-- Trouser div  -->\r\n\r\n\r\n\r\n\r\n      <div class=\"shalwar\" *ngIf=\"Shawl\">\r\n        <!-- Trouser div  -->\r\n\r\n        <fieldset>\r\n\r\n          <legend>Shawl</legend>\r\n          \r\n      <!--     <div class=\"form-group\">\r\n            <select (change)=\"getEmployeesTrouserId($event.target.value)\">\r\n              <option disabled selected>Select Employee</option>\r\n              <option *ngFor='let Employees of employees' value={{Employees._id}}>\r\n                {{Employees.FullName}}\r\n              </option>\r\n            </select>\r\n          </div> -->\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Shawl Length</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.ShawlLength\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Length Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"normal-field\" class=\"col-form-label\">Please Enter Shawl Width</label>\r\n\r\n            <input type=\"text\" [(ngModel)]=\"newMeasurement.ShawlWidth\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Width Must Be Numeric\"\r\n              required>\r\n\r\n          </div>\r\n\r\n\r\n\r\n       \r\n\r\n          <button (click)=\"addMeasurement()\" class=\"btn btn-success add-btn\">Add Measurement</button>\r\n\r\n        </fieldset>\r\n\r\n      </div>\r\n\r\n\r\n      <div class=\"shalwar\" *ngIf=\"Shoes\">\r\n        <!-- Trouser div  -->\r\n\r\n        <fieldset>\r\n\r\n          <legend>Shoes</legend>\r\n          \r\n        \r\n\r\n       \r\n\r\n          <button (click)=\"addMeasurement()\" class=\"btn btn-success add-btn\">Add Measurement</button>\r\n\r\n        </fieldset>\r\n\r\n      </div>\r\n      <!-- Trouser div  -->\r\n\r\n\r\n\r\n    </div>\r\n  </div>\r\n</div>"

/***/ },

/***/ "./src/app/customers/customerMeasurementForm.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var measurement_1 = __webpack_require__("./src/models/measurement.ts");
var customer_Service_1 = __webpack_require__("./src/services/customer.Service.ts");
var measurement_Service_1 = __webpack_require__("./src/services/measurement.Service.ts");
var employee_Service_1 = __webpack_require__("./src/services/employee.Service.ts");
var CustomerMeasurementForm = (function () {
    function CustomerMeasurementForm(_measurementService, _customerService, _employeeService) {
        this._measurementService = _measurementService;
        this._customerService = _customerService;
        this._employeeService = _employeeService;
        this.ShalwarKameez = false;
        this.Coat = false;
        this.Sherwani = false;
        this.WaistCoat = false;
        this.Pant = false;
        this.Trouser = false;
        this.Shawl = false;
        this.Shoes = false;
    }
    CustomerMeasurementForm.prototype.searchByName = function () {
        var _this = this;
        this._customerService.getCustomersByContactName(this.newMeasurement.FullName).subscribe(function (res) {
            if (res.code == 200) {
                _this.customers = res.data;
                $("#snackbar").html("Data is Available");
            }
            else {
                _this.customers = null;
                $("#snackbar").html("Data not Available");
            }
            console.log("customer for referance is");
            console.log(_this.customers);
        });
        this.newMeasurement.CustomerContactName = undefined;
    };
    CustomerMeasurementForm.prototype.addMeasurement = function () {
        var _this = this;
        if (this.ShalwarKameez == true) {
            if (this.newMeasurement.ShalwarKameezLength == null || this.newMeasurement.ShalwarKameezChest == null || this.newMeasurement.ShalwarKameezWaist == null || this.newMeasurement.ShalwarKameezHip == null || this.newMeasurement.ShalwarKameezSleeve == null || this.newMeasurement.ShalwarKameezShoulder == null || this.newMeasurement.ShalwarKameezNeck == null || this.newMeasurement.ShalwarKameezBysep == null || this.newMeasurement.ShalwarKameezSLength == null || this.newMeasurement.ShalwarKameezBottom == null) {
                $("#snackbar").html("Please fill the empty Field");
                this.showToast();
                console.log("shalwarkameez");
            }
            else {
                console.log(this.newMeasurement);
                this._measurementService.addMeasurement(this.newMeasurement).subscribe(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        $("#snackbar").html("Values Saved!");
                        _this.showToast();
                        _this.newMeasurement = new measurement_1.Measurement();
                        $("#selectType").hide();
                        _this.allFalse();
                        $('.measurementsType option').prop('selected', function () {
                            return this.defaultSelected;
                        });
                    }
                    else {
                        $("#snackbar").html(res.message);
                        _this.showToast();
                    }
                });
            }
        }
        else if (this.Coat == true) {
            if (this.newMeasurement.CoatLength == null || this.newMeasurement.CoatChest == null || this.newMeasurement.CoatWaist == null || this.newMeasurement.CoatHip == null || this.newMeasurement.CoatSleeve == null || this.newMeasurement.CoatShoulder == null || this.newMeasurement.CoatNeck == null || this.newMeasurement.CoatBysep == null || this.newMeasurement.CoatHB == null || this.newMeasurement.CoatCB == null) {
                $("#snackbar").html("Please fill the empty Field");
                this.showToast();
            }
            else {
                console.log(this.newMeasurement);
                this._measurementService.addMeasurement(this.newMeasurement).subscribe(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        $("#snackbar").html("Values Saved!");
                        _this.showToast();
                        _this.newMeasurement = new measurement_1.Measurement();
                        $("#selectType").hide();
                        _this.allFalse();
                        $('.measurementsType option').prop('selected', function () {
                            return this.defaultSelected;
                        });
                    }
                    else {
                        $("#snackbar").html(res.message);
                        _this.showToast();
                    }
                });
            }
        }
        else if (this.Sherwani == true) {
            if (this.newMeasurement.SherwaniLength == null || this.newMeasurement.SherwaniChest == null || this.newMeasurement.SherwaniWaist == null || this.newMeasurement.SherwaniHip == null || this.newMeasurement.SherwaniSleeve == null || this.newMeasurement.SherwaniShoulder == null || this.newMeasurement.SherwaniNeck == null || this.newMeasurement.SherwaniBysep == null || this.newMeasurement.SherwaniHB == null || this.newMeasurement.SherwaniCB == null) {
                $("#snackbar").html("Please fill the empty Field");
                this.showToast();
            }
            else {
                console.log(this.newMeasurement);
                this._measurementService.addMeasurement(this.newMeasurement).subscribe(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        $("#snackbar").html("Values Saved!");
                        _this.showToast();
                        _this.newMeasurement = new measurement_1.Measurement();
                        $("#selectType").hide();
                        _this.allFalse();
                        $('.measurementsType option').prop('selected', function () {
                            return this.defaultSelected;
                        });
                    }
                    else {
                        $("#snackbar").html(res.message);
                        _this.showToast();
                    }
                });
            }
        }
        else if (this.WaistCoat == true) {
            if (this.newMeasurement.CoatLength == null || this.newMeasurement.CoatChest == null || this.newMeasurement.CoatWaist == null || this.newMeasurement.CoatHip == null || this.newMeasurement.CoatHip == null || this.newMeasurement.CoatShoulder == null || this.newMeasurement.CoatNeck == null || this.newMeasurement.CoatBysep == null || this.newMeasurement.CoatHB == null || this.newMeasurement.CoatCB == null) {
                $("#snackbar").html("Please fill the empty Field");
                this.showToast();
            }
            else {
                console.log(this.newMeasurement);
                this._measurementService.addMeasurement(this.newMeasurement).subscribe(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        $("#snackbar").html("Values Saved!");
                        _this.showToast();
                        _this.newMeasurement = new measurement_1.Measurement();
                        $("#selectType").hide();
                        _this.allFalse();
                        $('.measurementsType option').prop('selected', function () {
                            return this.defaultSelected;
                        });
                    }
                    else {
                        $("#snackbar").html(res.message);
                        _this.showToast();
                    }
                });
            }
        }
        else if (this.Pant == true) {
            if (this.newMeasurement.PentWaist == null || this.newMeasurement.PentHip == null || this.newMeasurement.PentLength == null || this.newMeasurement.PantKnee == null || this.newMeasurement.PentBottom == null || this.newMeasurement.PentInside == null) {
                $("#snackbar").html("Please fill the empty Field");
                this.showToast();
            }
            else {
                console.log(this.newMeasurement);
                this._measurementService.addMeasurement(this.newMeasurement).subscribe(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        $("#snackbar").html("Values Saved!");
                        _this.showToast();
                        _this.newMeasurement = new measurement_1.Measurement();
                        $("#selectType").hide();
                        _this.allFalse();
                        $('.measurementsType option').prop('selected', function () {
                            return this.defaultSelected;
                        });
                    }
                    else {
                        $("#snackbar").html(res.message);
                        _this.showToast();
                    }
                });
            }
        }
        else if (this.Trouser == true) {
            if (this.newMeasurement.TrouserWaist == null || this.newMeasurement.TrouserHip == null || this.newMeasurement.TrouserLength == null || this.newMeasurement.TrouserKnee == null || this.newMeasurement.TrouserBottom == null || this.newMeasurement.TrouserInside == null) {
                $("#snackbar").html("Please fill the empty Field");
                this.showToast();
            }
            else {
                console.log('employeeid', this.newMeasurement);
                console.log(this.newMeasurement);
                this._measurementService.addMeasurement(this.newMeasurement).subscribe(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        $("#snackbar").html("Values Saved!");
                        _this.showToast();
                        _this.newMeasurement = new measurement_1.Measurement();
                        $("#selectType").hide();
                        _this.allFalse();
                        $('.measurementsType option').prop('selected', function () {
                            return this.defaultSelected;
                        });
                    }
                    else {
                        $("#snackbar").html(res.message);
                        _this.showToast();
                    }
                });
            }
        }
        else if (this.Shawl == true) {
            if (this.newMeasurement.ShawlLength == null || this.newMeasurement.ShawlWidth == null) {
                $("#snackbar").html("Please fill the empty Field");
                this.showToast();
            }
            else {
                this._measurementService.addMeasurement(this.newMeasurement).subscribe(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        $("#snackbar").html("Values Saved!");
                        _this.showToast();
                        _this.newMeasurement = new measurement_1.Measurement();
                        $("#selectType").hide();
                        _this.allFalse();
                        $('.measurementsType option').prop('selected', function () {
                            return this.defaultSelected;
                        });
                    }
                    else {
                        $("#snackbar").html(res.message);
                        _this.showToast();
                    }
                });
            }
        }
        else if (this.Shoes == true) {
            this._measurementService.addMeasurement(this.newMeasurement).subscribe(function (res) {
                console.log(res);
                if (res.code == 200) {
                    $("#snackbar").html("Values Saved!");
                    _this.showToast();
                    _this.newMeasurement = new measurement_1.Measurement();
                    $("#selectType").hide();
                    $('.measurementsType option').prop('selected', function () {
                        return this.defaultSelected;
                    });
                    _this.allFalse();
                }
                else {
                    $("#snackbar").html(res.message);
                    _this.showToast();
                }
            });
        }
        else {
            $("#snackbar").html("Please Select Right Choice");
            this.showToast();
        }
    };
    CustomerMeasurementForm.prototype.search = function () {
        var _this = this;
        this._customerService.getCustomersByContactNumber(this.newMeasurement.CustomerContactNumber).subscribe(function (res) {
            if (res.code == 200) {
                _this.customers = res.data;
            }
            else {
                _this.customers = null;
            }
            console.log("customer for referance is");
            console.log(_this.customers);
        });
    };
    CustomerMeasurementForm.prototype.showToast = function () {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    };
    CustomerMeasurementForm.prototype.onChange = function (_id) {
        console.log("CHange is Clicked" + _id);
        this.newMeasurement.CustomerId = _id;
        $("#selectType").show();
    };
    CustomerMeasurementForm.prototype.allFalse = function () {
        this.Sherwani = false;
        this.WaistCoat = false;
        this.Coat = false;
        this.ShalwarKameez = false;
        this.Pant = false;
        this.Trouser = false;
    };
    CustomerMeasurementForm.prototype.getForms = function (elem) {
        $("#selectEmployee").show();
        if (elem == "Shalwar Kameez") {
            this.allFalse();
            this.ShalwarKameez = true;
        }
        else if (elem == "Coat") {
            this.allFalse();
            this.Coat = true;
        }
        else if (elem == "Sherwani") {
            this.allFalse();
            this.Sherwani = true;
        }
        else if (elem == "Waist Coat") {
            this.allFalse();
            this.WaistCoat = true;
        }
        else if (elem == "Pant") {
            this.allFalse();
            this.Pant = true;
        }
        else if (elem == "Shawl") {
            this.allFalse();
            this.Shawl = true;
        }
        else {
            this.allFalse();
            this.Shoes = true;
        }
    };
    CustomerMeasurementForm.prototype.getEmployeesShalwarKameezId = function (employeesId) {
        /*  this.Employee_Id = employeesId;
         console.log(this.Employee_Id);
         this._Measurement =new Measurement();
         this._Measurement.ShalwarKameezMeasurementTakenBy=this.Employee_Id;
       this.newMeasurement.ShalwarKameezMeasurementTakenBy=this.Employee_Id;
         console.log('employeeid',this.newMeasurement); */
        this.EmployeeId = employeesId;
    };
    CustomerMeasurementForm.prototype.getEmployeesSherwaniId = function (employeesId) {
        this._Measurement = new measurement_1.Measurement();
        this.Employee_Id = employeesId;
        this._Measurement.SherwaniMeasurementTakenBy = this.Employee_Id;
        this.newMeasurement.SherwaniMeasurementTakenBy = this.Employee_Id;
        console.log('employeeid', this.newMeasurement);
    };
    CustomerMeasurementForm.prototype.getEmployeesWaistCoatId = function (employeesId) {
        this._Measurement = new measurement_1.Measurement();
        this.Employee_Id = employeesId;
        this._Measurement.WaistCoatMeasurementTakenBy = this.Employee_Id;
        this.newMeasurement.WaistCoatMeasurementTakenBy = this.Employee_Id;
        console.log('employeeid', this.newMeasurement);
    };
    CustomerMeasurementForm.prototype.getEmployeesPantId = function (employeesId) {
        this._Measurement = new measurement_1.Measurement();
        this.Employee_Id = employeesId;
        this._Measurement.PentMeasurementTakenBy = this.Employee_Id;
        this.newMeasurement.PentMeasurementTakenBy = this.Employee_Id;
        console.log('employeeid', this.newMeasurement);
    };
    CustomerMeasurementForm.prototype.getEmployeesCoatId = function (employeesId) {
        this._Measurement = new measurement_1.Measurement();
        this.Employee_Id = employeesId;
        this._Measurement.CoatMeasurementTakenBy = this.Employee_Id;
        this.newMeasurement.CoatMeasurementTakenBy = this.Employee_Id;
        console.log('employeeid', this.newMeasurement);
    };
    CustomerMeasurementForm.prototype.getEmployeesTrouserId = function (employeesId) {
        this._Measurement = new measurement_1.Measurement();
        this.Employee_Id = employeesId;
        this._Measurement.TrouserMeasurementTakenBy = this.Employee_Id;
        this.newMeasurement.TrouserMeasurementTakenBy = this.Employee_Id;
        console.log('employeeid', this.newMeasurement);
    };
    CustomerMeasurementForm.prototype.ngOnInit = function () {
        var _this = this;
        this.newMeasurement = new measurement_1.Measurement();
        this._employeeService.getEmployees().subscribe(function (res) {
            if (res.code == 200) {
                _this.employees = res.data;
                console.log('Employeesss', _this.employees);
            }
            else {
                _this.employees = null;
            }
            console.log("Employees Received are");
            console.log(_this.employees);
        });
    };
    CustomerMeasurementForm = __decorate([
        core_1.Component({
            selector: 'customerMeasurement-form',
            template: __webpack_require__("./src/app/customers/CustomerMeasurementForm.template.html"),
            styles: [__webpack_require__("./src/app/customers/CustomerMeasurementForm.style.css")],
            providers: [customer_Service_1.CustomerService, measurement_Service_1.MeasurementService, employee_Service_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof measurement_Service_1.MeasurementService !== 'undefined' && measurement_Service_1.MeasurementService) === 'function' && _a) || Object, (typeof (_b = typeof customer_Service_1.CustomerService !== 'undefined' && customer_Service_1.CustomerService) === 'function' && _b) || Object, (typeof (_c = typeof employee_Service_1.EmployeeService !== 'undefined' && employee_Service_1.EmployeeService) === 'function' && _c) || Object])
    ], CustomerMeasurementForm);
    return CustomerMeasurementForm;
    var _a, _b, _c;
}());
exports.CustomerMeasurementForm = CustomerMeasurementForm;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/customers/customerMeasurementForm.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var customerMeasurementForm_component_1 = __webpack_require__("./src/app/customers/customerMeasurementForm.component.ts");
exports.routes = [
    { path: '', component: customerMeasurementForm_component_1.CustomerMeasurementForm, pathMatch: 'full' }
];
var CustomerMeasurementFormModule = (function () {
    function CustomerMeasurementFormModule() {
    }
    CustomerMeasurementFormModule.routes = exports.routes;
    CustomerMeasurementFormModule = __decorate([
        core_1.NgModule({
            declarations: [
                customerMeasurementForm_component_1.CustomerMeasurementForm
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CustomerMeasurementFormModule);
    return CustomerMeasurementFormModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomerMeasurementFormModule;


/***/ },

/***/ "./src/models/employeeRole.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var EmployeeRole = (function () {
    function EmployeeRole() {
    }
    return EmployeeRole;
}());
exports.EmployeeRole = EmployeeRole;


/***/ },

/***/ "./src/models/measurement.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var Measurement = (function () {
    function Measurement() {
    }
    return Measurement;
}());
exports.Measurement = Measurement;


/***/ },

/***/ "./src/services/customer.Service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var http_2 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
__webpack_require__("./node_modules/rxjs/add/operator/do.js");
var Server_1 = __webpack_require__("./src/utilities/Server.ts");
var CustomerService = (function () {
    function CustomerService(_http) {
        this._http = _http;
        this._addCustomerURL = 'customers/addCustomer';
        this._getAllCustomersURL = 'customers/addCustomer';
        this.getCustomersByContactNumberURL = 'customers/getCustomerAndReferancesByContactNumber?ContactNumber=';
        this.getMeasurementURL = 'customers/getMeasurementByCustomerId?CustomerId=';
        this.getAllCustomerNameURL = 'customers/getCustomersByName?FullName=';
        this._addPattern = "customers/addCustomerPattern";
        var server = new Server_1.Server();
        this.baseURL = server.getServerURL();
    }
    // private _addCustomerURL = 'http://localhost:3100/customers/addCustomer';
    //  private _addCustomerURL = "https://ssbotique.herokuapp.com/customers/addCustomer";
    //  private _getAllCustomersURL = 'https://ssbotique.herokuapp.com/customers/getAllCustomers';
    // private getCustomersByContactNumberURL = 'https://ssbotique.herokuapp.com/customers/getCustomerAndReferancesByContactNumber?ContactNumber=';
    // private getMeasurementURL = 'https://ssbotique.herokuapp.com/customers/getMeasurementByCustomerId?CustomerId=';
    // private getAllCustomerNameURL ='https://ssbotique.herokuapp.com/customers/getCustomersByName?FullName=';
    CustomerService.prototype.addCustomer = function (customer) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        console.log(this.baseURL);
        console.log("Customer Received in Service");
        console.log(customer);
        return this._http.post(this.baseURL + this._addCustomerURL, customer, options)
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.getAllCustomers = function () {
        return this._http.get(this.baseURL + this._getAllCustomersURL)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); });
    };
    CustomerService.prototype.getCustomersByContactNumber = function (contactNumber) {
        return this._http.get(this.baseURL + this.getCustomersByContactNumberURL + contactNumber)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); });
    };
    CustomerService.prototype.getCustomersByFullName = function (FullName) {
        console.log("Its get in service Full Name ID ", FullName);
        var obj = { id: FullName };
        console.log("object is " + obj);
        return this._http.get(this.baseURL + this.getAllCustomerNameURL + FullName)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); });
    };
    CustomerService.prototype.addPatternService = function (customer_id) {
        var obj = { id: customer_id };
        console.log("Object is");
        console.log(obj);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        console.log("Base URL is " + this.baseURL);
        return this._http.post(this.baseURL + this._addPattern, obj, options)
            .map(function (res) { return res.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); });
    };
    CustomerService.prototype.getCustomersByContactName = function (FullName) {
        return this._http.get(this.baseURL + this.getAllCustomerNameURL + FullName)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); });
    };
    CustomerService.prototype.extractData = function (res) {
        var body = res.json();
        console.log("Extract Data");
        console.log(body);
        return body.data || {};
    };
    CustomerService.prototype.GetMeasurementById = function (CustomerId) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this._http.get(this.baseURL + this.getMeasurementURL + CustomerId, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], CustomerService);
    return CustomerService;
    var _a;
}());
exports.CustomerService = CustomerService;


/***/ },

/***/ "./src/services/employee.Service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var http_2 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
__webpack_require__("./node_modules/rxjs/add/operator/do.js");
var Server_1 = __webpack_require__("./src/utilities/Server.ts");
var employeeRole_1 = __webpack_require__("./src/models/employeeRole.ts");
var EmployeeService = (function () {
    function EmployeeService(_http) {
        this._http = _http;
        this._addEmployeeURL = 'employees/addEmployee';
        this.getEmployeeRolesURL = 'app/employees/EmployeeRole.js';
        var server = new Server_1.Server();
        this.baseURL = server.getServerURL();
    }
    EmployeeService.prototype.addEmployee = function (employee) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this._http.post(this.baseURL + this._addEmployeeURL, employee, options)
            .map(this.extractData);
    };
    EmployeeService.prototype.getEmployeeRoles = function () {
        var employeeRoles = [];
        var employeeRole = new employeeRole_1.EmployeeRole();
        employeeRole.Name = "Master";
        employeeRole.RoleID = 1;
        employeeRoles.push(employeeRole);
        employeeRole = new employeeRole_1.EmployeeRole();
        employeeRole.Name = "Shoe Maker";
        employeeRole.RoleID = 2;
        employeeRoles.push(employeeRole);
        employeeRole = new employeeRole_1.EmployeeRole();
        employeeRole.Name = "Sticher";
        employeeRole.RoleID = 3;
        employeeRoles.push(employeeRole);
        employeeRole = new employeeRole_1.EmployeeRole();
        employeeRole.Name = "Embroidery worker";
        employeeRole.RoleID = 4;
        employeeRoles.push(employeeRole);
        return employeeRoles;
    };
    EmployeeService.prototype.extractData = function (res) {
        var body = res.json();
        console.log("Extract Data");
        console.log(body);
        return body.data || {};
    };
    EmployeeService.prototype.getEmployees = function () {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this._http.get(this.baseURL + "employees/getAllEmployees", { headers: headers })
            .map(function (res) { return res.json(); });
    };
    EmployeeService.prototype.login = function (username, password) {
        var data;
        data = { UserName: username, Password: password };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this._http.post(this.baseURL + "employees/login", data, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    EmployeeService.prototype.getAssignedItems = function (assignedTo) {
        var data;
        data = { AssignedTo: assignedTo };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this._http.post(this.baseURL + "employees/getMyOrderItems", data, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    EmployeeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], EmployeeService);
    return EmployeeService;
    var _a;
}());
exports.EmployeeService = EmployeeService;


/***/ },

/***/ "./src/services/measurement.Service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var http_2 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
__webpack_require__("./node_modules/rxjs/add/operator/do.js");
var Server_1 = __webpack_require__("./src/utilities/Server.ts");
var MeasurementService = (function () {
    function MeasurementService(_http) {
        this._http = _http;
        this._addMeasurmentURL = 'customers/addMeasurement';
        var server = new Server_1.Server();
        this.baseURL = server.getServerURL();
    }
    MeasurementService.prototype.addMeasurement = function (measurement) {
        console.log("Add Measurement is called in Service");
        console.log(measurement);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this._http.post(this.baseURL + this._addMeasurmentURL, measurement, options)
            .map(function (res) { return res.json(); });
    };
    MeasurementService.prototype.extractData = function (res) {
        var body = res.json();
        console.log("Extract Data");
        console.log(body);
        return body.data || {};
    };
    MeasurementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], MeasurementService);
    return MeasurementService;
    var _a;
}());
exports.MeasurementService = MeasurementService;


/***/ },

/***/ "./src/utilities/Server.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var Server = (function () {
    function Server() {
    }
    Server.prototype.getServerURL = function () {
        // return "http://localhost:3100/";
        return "https://ssbotiquenew.azurewebsites.net/";
    };
    return Server;
}());
exports.Server = Server;


/***/ }

});
//# sourceMappingURL=21.map