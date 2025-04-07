/* eslint-disable prettier/prettier */
import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

const cacheConfig: ICacheConfig = {
  config: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASS || undefined,
    },
  },
  driver: 'redis',
};

export default cacheConfig;
