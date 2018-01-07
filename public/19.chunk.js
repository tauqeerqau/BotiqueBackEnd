webpackJsonpac__name_([19],{

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

/***/ "./src/app/employees/employee.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var employee_1 = __webpack_require__("./src/models/employee.ts");
var employee_Service_1 = __webpack_require__("./src/services/employee.Service.ts");
var EmployeeFormComponent = (function () {
    function EmployeeFormComponent(_emplloyeeService) {
        this._emplloyeeService = _emplloyeeService;
    }
    EmployeeFormComponent.prototype.addEmployee = function () {
        console.log("Add Employee is Cliecked TS");
        console.log(this.newEmployee);
        this._emplloyeeService.addEmployee(this.newEmployee).subscribe(function (res) {
            console.log(res);
        });
    };
    EmployeeFormComponent.prototype.onChange = function (_id) {
        console.log("CHange is Clicked" + _id);
        this.newEmployee.EmployeeRole = _id;
    };
    EmployeeFormComponent.prototype.ngOnInit = function () {
        this.newEmployee = new employee_1.Employee();
        console.log("NG ON INIT IS CALLED");
        this.employeeRoles = this._emplloyeeService.getEmployeeRoles();
    };
    EmployeeFormComponent = __decorate([
        core_1.Component({
            selector: 'employee-form',
            template: __webpack_require__("./src/app/employees/employee.template.html"),
            styles: [__webpack_require__("./src/app/employees/employee.style.css")],
            providers: [employee_Service_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof employee_Service_1.EmployeeService !== 'undefined' && employee_Service_1.EmployeeService) === 'function' && _a) || Object])
    ], EmployeeFormComponent);
    return EmployeeFormComponent;
    var _a;
}());
exports.EmployeeFormComponent = EmployeeFormComponent;


/***/ },

/***/ "./src/app/employees/employee.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var employee_component_1 = __webpack_require__("./src/app/employees/employee.component.ts");
exports.routes = [
    { path: '', component: employee_component_1.EmployeeFormComponent, pathMatch: 'full' }
];
var CustomerModule = (function () {
    function CustomerModule() {
    }
    CustomerModule.routes = exports.routes;
    CustomerModule = __decorate([
        core_1.NgModule({
            declarations: [
                employee_component_1.EmployeeFormComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CustomerModule);
    return CustomerModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomerModule;


/***/ },

/***/ "./src/app/employees/employee.style.css":
/***/ function(module, exports) {

module.exports = ".custom-select{\r\n    width:100%;\r\n    padding:10px;\r\n}"

/***/ },

/***/ "./src/app/employees/employee.template.html":
/***/ function(module, exports) {

module.exports = "<h1>Add Employee Form</h1>\r\n<div class=\"container\">\r\n\r\n  <div class=\"row\">\r\n\r\n      <div class=\"col-md-6 col-lg-6 col-sm-6 col-xs-12 offset-md-3 offset-lg-3\">\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"normal-field\" class=\"col-form-label\">Select Role</label>\r\n      <select (change)=\"onChange($event.target.value)\" class=\"custom-select\">\r\n            <option *ngFor = 'let employeeRole of employeeRoles'\r\n            value={{employeeRole.RoleID}}>\r\n            {{employeeRole.Name}}\r\n        </option>\r\n        </select>\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"normal-field\" class=\"col-form-label\">Enter Name</label>\r\n\r\n        <input type=\"text\" [(ngModel)]=\"newEmployee.FullName\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Please Enter Name\">\r\n\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"normal-field\" class=\"col-form-label\">Enter Email</label>\r\n\r\n        <input type=\"text\" [(ngModel)]=\"newEmployee.Email\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Please Enter Email\">\r\n\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"normal-field\" class=\"col-form-label\">Enter Contact Number</label>\r\n \r\n        <input type=\"text\" [(ngModel)]=\"newEmployee.ContactNumber\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Enter Contact Number\">\r\n  \r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"normal-field\" class=\"col-form-label\">Enter CNIC Number</label>\r\n \r\n        <input type=\"text\" [(ngModel)]=\"newEmployee.CNIC\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Enter Contact Number\">\r\n  \r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"normal-field\" class=\"col-form-label\">Enter Address</label>\r\n\r\n        <input type=\"text\" [(ngModel)]=\"newEmployee.Address\" id=\"normal-field\" class=\"form-control custom-inputs\" placeholder=\"Enter Address\">\r\n\r\n    </div>\r\n\r\n\r\n    <div class=\"form-group\" style=\"text-align:center;\">\r\n        <button (click)=\"addEmployee()\" class=\"btn btn-success add-btn\">Add Employee</button>\r\n    </div>\r\n\r\n\r\n\r\n \r\n\r\n     </div>\r\n  </div>\r\n</div>"

/***/ },

/***/ "./src/models/employee.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var Employee = (function () {
    function Employee() {
    }
    return Employee;
}());
exports.Employee = Employee;


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

/***/ "./src/utilities/Server.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var Server = (function () {
    function Server() {
    }
    Server.prototype.getServerURL = function () {
        // return "http://localhost:3100/";
        return "https://ssbotique.azurewebsites.net/";
    };
    return Server;
}());
exports.Server = Server;


/***/ }

});
//# sourceMappingURL=19.map