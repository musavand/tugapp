/* eslint-disable prettier/prettier */
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './logger.module-definition';
import { Logger } from './logger';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule
  extends ConfigurableModuleClass
  implements NestModule
{
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    protected readonly options: typeof OPTIONS_TYPE,
  ) {
    super();
  }

  configure(consumer: MiddlewareConsumer) {
    const config = consumer.apply(LoggerMiddleware);
    if (this.options.excludedRoutes)
      config.exclude(...this.options.excludedRoutes);
    config.forRoutes(...this.options.routes);
  }
}
