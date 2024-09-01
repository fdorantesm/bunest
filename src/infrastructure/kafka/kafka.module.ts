import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { kafkaConfig, type KafkaConfig } from './kafka.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule.forFeature(kafkaConfig)],
        inject: [ConfigService],
        name: 'GREET_SERVICE',
        useFactory: (configService: ConfigService) => {
          const config = configService.getOrThrow<KafkaConfig>('kafka');
          return {
            transport: Transport.KAFKA,
            options: {
              subscribe: {
                fromBeginning: true,
              },
              client: {
                brokers: config.brokers,
              },
              consumer: {
                groupId: config.groupId,
              },
            },
          };
        },
      },
    ]),
  ],
})
export class KafkaModule {}
