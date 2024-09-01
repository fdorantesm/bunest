import { registerAs } from '@nestjs/config';

export const kafkaConfig = registerAs(
  'kafka',
  (): KafkaConfig => ({
    brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
    clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
    groupId: process.env.KAFKA_GROUP_ID || 'my-group',
  }),
);

export interface KafkaConfig {
  brokers: string[];
  clientId: string;
  groupId: string;
}
