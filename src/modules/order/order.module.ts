import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import OrderController from './controllers/order.controller';
import OrderDatabaseEntity from './db/order.db.entity';
import { OrderRepository } from './repositories/order.repository';
import OrderService from './services/order.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDatabaseEntity]), ClientModule, RestaurantModule],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: [OrderService, OrderRepository],
})
export class OrderModule { }
