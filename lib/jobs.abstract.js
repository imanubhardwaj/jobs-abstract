"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_cron_1 = require("node-cron");
var scheduler_1 = require("./scheduler");
var JobsAbstract = /** @class */ (function (_super) {
    __extends(JobsAbstract, _super);
    function JobsAbstract() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JobsAbstract.prototype.schedule = function () {
        node_cron_1.schedule(this.cronExpression, this.handle);
        return this;
    };
    return JobsAbstract;
}(scheduler_1.Scheduler));
exports.JobsAbstract = JobsAbstract;
