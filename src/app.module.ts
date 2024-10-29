import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import ClientDatabaseEntity from './modules/client/db/client.db.entity';
import OrderDatabaseEntity from './modules/order/db/order.db.entity';
import { OrderModule } from './modules/order/order.module';
import RestaurantDatabaseEntity from './modules/restaurant/db/restaurant.db.entity';
import { RestaurantModule } from './modules/restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [ClientDatabaseEntity, RestaurantDatabaseEntity, OrderDatabaseEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    ClientModule, RestaurantModule, OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
