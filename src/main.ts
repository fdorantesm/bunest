import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app/app.module";
import { Logger } from "@nestjs/common";
import { Transport, type MicroserviceOptions } from "@nestjs/microservices";
import type { KafkaConfig } from "./infrastructure/kafka/kafka.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const { host, port } = configService.getOrThrow("app");
  const { brokers, clientId, groupId } =
    configService.getOrThrow<KafkaConfig>("kafka");

  app.enableVersioning();

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers,
        clientId,
      },
      consumer: {
        groupId,
      },
    },
  } as MicroserviceOptions);

  app.startAllMicroservices();

  app.listen(port, host, () => {
    Logger.log(`Bun version ${Bun.version}`, "Bootstrap");
    Logger.log(`App is running on ${host}:${port}`, "Bootstrap");
  });
}

bootstrap();
