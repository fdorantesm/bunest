import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { redisConfig, type RedisConfig } from './redis.config';
import { GreetProcessor } from './greet.process';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule.forFeature(redisConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.getOrThrow<RedisConfig>('redis');
        return {
          redis: {
            host: config.host,
            port: config.port,
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: 'greetings',
    }),
  ],
  providers: [GreetProcessor],
})
export class RedisModule {}
