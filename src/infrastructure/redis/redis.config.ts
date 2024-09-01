import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs(
  'redis',
  (): RedisConfig => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT!, 10) || 6379,
  }),
);

export type RedisConfig = {
  host: string;
  port: number;
};
