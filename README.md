# Job Abstract

Schedule jobs in Node.

## Installation
Installing with *npm*

``npm i jobs-abstract``  

Installing with *yarn*  

``yarn add jobs-abstract``

## Getting Started

Create Job class extending Jobs Abstract and export it's instance.

```
class SampleJob extends JobsAbstract {
  async handle(): Promise<unknown> {
      console.log(`Called Job`);
      return undefined;
    }
}
```

To use it:

``const sampleJob = new SampleJob();``
- ``sampleJob.everyTenMinutes().schedule()``
- ``sampleJob.hourly().schedule()``
- ``sampleJob.weekly().schedule()``
