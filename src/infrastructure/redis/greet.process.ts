import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('greetings')
export class GreetProcessor {
  @Process('greet')
  async greeting(job: Job<{ name: string }>) {
    console.log(Date.now(), `Greetings to ${job.data.name}!`);
  }
}
