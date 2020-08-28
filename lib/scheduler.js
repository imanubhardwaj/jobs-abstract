"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
var node_cron_1 = __importDefault(require("node-cron"));
var Scheduler = /** @class */ (function () {
    function Scheduler() {
        this.cronExpression = "* * * * *";
        this.isAltered = false;
    }
    Scheduler.prototype.everyMinute = function () {
        return this.spliceIntoPosition(1, '*');
    };
    Scheduler.prototype.everyFiveMinutes = function () {
        return this.spliceIntoPosition(1, '*/5');
    };
    Scheduler.prototype.everyTenMinutes = function () {
        return this.spliceIntoPosition(1, '*/10');
    };
    Scheduler.prototype.everyFifteenMinutes = function () {
        return this.spliceIntoPosition(1, '*/15');
    };
    Scheduler.prototype.everyThirtyMinutes = function () {
        return this.spliceIntoPosition(1, '0,30');
    };
    Scheduler.prototype.hourly = function () {
        return this.spliceIntoPosition(1, 0);
    };
    Scheduler.prototype.hourlyAt = function (offset) {
        return this.spliceIntoPosition(1, offset);
    };
    Scheduler.prototype.daily = function () {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0);
    };
    Scheduler.prototype.at = function (time) {
        return this.dailyAt(time);
    };
    Scheduler.prototype.dailyAt = function (time) {
        var segments = time.split(':');
        return this.spliceIntoPosition(2, segments)
            .spliceIntoPosition(1, segments.length === 2 ? segments[1] : '0');
    };
    Scheduler.prototype.twiceDaily = function (first, second) {
        if (first === 0) {
            first = 1;
        }
        if (second === 0) {
            second = 13;
        }
        var hours = first + "," + second;
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, hours);
    };
    Scheduler.prototype.weekdays = function () {
        return this.spliceIntoPosition(5, '1-5');
    };
    Scheduler.prototype.weekends = function () {
        return this.spliceIntoPosition(5, '0,6');
    };
    Scheduler.prototype.mondays = function () {
        return this.days(1);
    };
    Scheduler.prototype.tuesdays = function () {
        return this.days(2);
    };
    Scheduler.prototype.wednesdays = function () {
        return this.days(3);
    };
    Scheduler.prototype.thursdays = function () {
        return this.days(4);
    };
    Scheduler.prototype.fridays = function () {
        return this.days(5);
    };
    Scheduler.prototype.saturdays = function () {
        return this.days(6);
    };
    Scheduler.prototype.sundays = function () {
        return this.days(0);
    };
    Scheduler.prototype.weekly = function () {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0)
            .spliceIntoPosition(5, 0);
    };
    Scheduler.prototype.weeklyOn = function (day, time) {
        if (time === void 0) {
            time = '0:0';
        }
        this.dailyAt(time);
        return this.spliceIntoPosition(5, day);
    };
    Scheduler.prototype.monthly = function () {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0)
            .spliceIntoPosition(3, 1);
    };
    Scheduler.prototype.monthlyOn = function (day, time) {
        if (day === 0) {
            day = 1;
        }
        if (!time) {
            time = '0:0';
        }
        this.dailyAt(time);
        return this.spliceIntoPosition(3, day);
    };
    Scheduler.prototype.twiceMonthly = function (first, second) {
        if (first === 0) {
            first = 1;
        }
        if (second === 0) {
            second = 16;
        }
        var days = first + "," + second;
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0)
            .spliceIntoPosition(3, days);
    };
    Scheduler.prototype.quarterly = function () {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0)
            .spliceIntoPosition(3, 1)
            .spliceIntoPosition(4, '1-12/3');
    };
    Scheduler.prototype.yearly = function () {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0)
            .spliceIntoPosition(3, 1)
            .spliceIntoPosition(4, 1);
    };
    Scheduler.prototype.days = function (day) {
        return this.spliceIntoPosition(5, day);
    };
    Scheduler.prototype.spliceIntoPosition = function (position, value) {
        var segments = this.cronExpression.split(" ");
        segments[position - 1] = value;
        return this.cron(segments.join(" "));
    };
    Scheduler.prototype.cron = function (expression) {
        if (!node_cron_1.default.validate(expression)) {
            return this;
        }
        this.cronExpression = expression;
        this.isAltered = true;
        return this;
    };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
