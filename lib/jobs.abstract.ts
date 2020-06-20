import {Scheduler} from "./scheduler";
import cron from "node-cron";

export abstract class JobsAbstract extends Scheduler {
  schedule(): JobsAbstract {
    cron.schedule(this.cronExpression, this.handle);
    return this;
  }

  abstract handle(): Promise<unknown>;
}
