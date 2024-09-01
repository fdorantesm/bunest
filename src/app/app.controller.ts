import { InjectQueue } from "@nestjs/bull";
import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  VERSION_NEUTRAL,
} from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import type { Queue } from "bull";

@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  constructor(
    @Inject("APP_NAME")
    private readonly appName: string,
    @InjectQueue("greetings")
    private readonly greetingsQueue: Queue
  ) {}

  @Get("/")
  async getHello(@Query("name") name: string = "World") {
    try {
      await this.greetingsQueue.add(
        "greet",
        { name },
        {
          attempts: 5,
          backoff: {
            type: "exponential",
            delay: 1000,
          },
        }
      );
      return `Hello ${name ?? this.appName}!`;
    } catch (error) {
      console.log(error);
      return "An error occurred while processing your request.";
    }
  }

  @MessagePattern("greet")
  async greet(@Payload() payload: { name: string }) {
    Logger.log(payload, AppController.name);
    await this.greetingsQueue.add("greet", payload);
  }
}
