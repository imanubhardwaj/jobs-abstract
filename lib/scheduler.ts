import cron from "node-cron";

export class Scheduler {
  cronExpression = "* * * * *";
  isAltered = false;

  everyMinute(): Scheduler {
    return this.spliceIntoPosition(1, '*');
  }

  everyFiveMinutes(): Scheduler {
    return this.spliceIntoPosition(1, '*/5');
  }

  everyTenMinutes(): Scheduler {
    return this.spliceIntoPosition(1, '*/10');
  }

  everyFifteenMinutes(): Scheduler {
    return this.spliceIntoPosition(1, '*/15');
  }

  everyThirtyMinutes(): Scheduler {
    return this.spliceIntoPosition(1, '0,30');
  }

  hourly(): Scheduler {
    return this.spliceIntoPosition(1, 0);
  }

  hourlyAt(offset: number): Scheduler {
    return this.spliceIntoPosition(1, offset);
  }

  daily(): Scheduler {
    return this.spliceIntoPosition(1, 0)
      .spliceIntoPosition(2, 0);
  }

  at(time: string): Scheduler {
    return this.dailyAt(time);
  }

  dailyAt(time: string): Scheduler {
    const segments = time.split(':');
    return this.spliceIntoPosition(2, segments)
      .spliceIntoPosition(1, segments.length === 2 ? segments[1] : '0');
  }

  twiceDaily(first: number, second: number): Scheduler {
    if (first === 0) {
      first = 1;
    }
    if (second === 0) {
      second = 13;
    }
    const hours = first + "," + second;
    return this.spliceIntoPosition(1, 0)
      .spliceIntoPosition(2, hours);
  }

  weekdays(): Scheduler {
    return this.spliceIntoPosition(5, '1-5');
  }

  weekends(): Scheduler {
    return this.spliceIntoPosition(5, '0,6');
  }

  mondays(): Scheduler {
    return this.days(1);
  }

  tuesdays(): Scheduler {
    return this.days(2);
  }

  wednesdays(): Scheduler {
    return this.days(3);
  }

  thursdays(): Scheduler {
    return this.days(4);
  }

  fridays(): Scheduler {
    return this.days(5);
  }

  saturdays(): Scheduler {
    return this.days(6);
  }

  sundays(): Scheduler {
    return this.days(0);
  }

  weekly(): Scheduler {
    return this.spliceIntoPosition(1, 0)
      .spliceIntoPosition(2, 0)
      .spliceIntoPosition(5, 0);
  }

  weeklyOn(day: string | number, time: string): Scheduler {
    if (time === void 0) {
      time = '0:0';
    }
    this.dailyAt(time);
    return this.spliceIntoPosition(5, day);
  }

  monthly(): Scheduler {
    return this.spliceIntoPosition(1, 0)
      .spliceIntoPosition(2, 0)
      .spliceIntoPosition(3, 1);
  }

  monthlyOn(day: number, time: string): Scheduler {
    if (day === 0) {
      day = 1;
    }
    if (!time) {
      time = '0:0';
    }
    this.dailyAt(time);
    return this.spliceIntoPosition(3, day);
  }

  twiceMonthly(first: number, second: number): Scheduler {
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
  }

  quarterly(): Scheduler {
    return this.spliceIntoPosition(1, 0)
      .spliceIntoPosition(2, 0)
      .spliceIntoPosition(3, 1)
      .spliceIntoPosition(4, '1-12/3');
  }

  yearly(): Scheduler {
    return this.spliceIntoPosition(1, 0)
      .spliceIntoPosition(2, 0)
      .spliceIntoPosition(3, 1)
      .spliceIntoPosition(4, 1);
  }

  days(day: number): Scheduler {
    return this.spliceIntoPosition(5, day);
  }

  spliceIntoPosition(position: number, value: any): Scheduler {
    const segments = this.cronExpression.split(" ");
    segments[position - 1] = value;
    this.isAltered = true;
    return this.cron(segments.join(" "));
  }

  cron(expression: string): Scheduler {
    if (!cron.validate(expression)) {
      return this;
    }
    this.cronExpression = expression;
    this.isAltered = true;
    return this;
  }
}
