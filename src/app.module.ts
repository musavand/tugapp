/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from '../config/env';
import { TracingModule } from 'trace-nestjs';
import { Logger } from 'gc-json-logger';
import { LoggerModule } from './Logger/logger.module';

@Module({
  imports: [
    TracingModule.register({
      // specify which routes to trace
      routes: ['*'],
      onRequest(uuid, next) {
        // set a logger for the async context
        Logger.runWith(new Logger(uuid), next);
      },
    }),
    LoggerModule.register({
      // specify which routes to log
      routes: ['*'],
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', '127.0.0.0'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', 'tug_db'),
        // charset: 'utf8mb4',
        // timezone: '+08:00',
        //un comment this for first run insted migration
        //synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    EventEmitterModule.forRoot(),
    //order of modules are important
    ProductsModule,
    CategoryModule,
    SubcategoryModule,
    //compant table depndes on those 3 table
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
