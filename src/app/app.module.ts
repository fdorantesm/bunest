import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { appConfig } from './app.config';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { RedisModule } from '../infrastructure/redis/redis.module';
import { BullModule } from '@nestjs/bull';
import { KafkaModule } from '../infrastructure/kafka/kafka.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    BullModule.registerQueue({
      name: 'greetings',
    }),
    RedisModule,
    KafkaModule,
  ],
  providers: [
    {
      provide: 'APP_NAME',
      useValue: 'Bunest',
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
