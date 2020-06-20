import { Scheduler } from "./scheduler";
export declare abstract class JobsAbstract extends Scheduler {
    schedule(): JobsAbstract;
    abstract handle(): Promise<unknown>;
}
