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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsAbstract = void 0;
var scheduler_1 = require("./scheduler");
var node_cron_1 = __importDefault(require("node-cron"));
var JobsAbstract = /** @class */ (function (_super) {
    __extends(JobsAbstract, _super);
    function JobsAbstract() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JobsAbstract.prototype.schedule = function () {
        if (this.isAltered) {
            node_cron_1.default.schedule(this.cronExpression, this.handle);
        }
        else {
            this.handle();
        }
        return this;
    };
    return JobsAbstract;
}(scheduler_1.Scheduler));
exports.JobsAbstract = JobsAbstract;
