import {Scheduler} from "./scheduler";
import cron from "node-cron";

export abstract class JobsAbstract extends Scheduler {
  schedule(): JobsAbstract {
    if (this.isAltered) {
      cron.schedule(this.cronExpression, this.handle);
    } else {
      this.handle();
    }
    return this;
  }

  abstract handle(): Promise<unknown>;
}
