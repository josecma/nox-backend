import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RestaurantController from './controllers/restaurant.controller';
import RestaurantDatabaseEntity from './db/restaurant.db.entity';
import { RestaurantRepository } from './repositories/restaurant.repository';
import RestaurantService from './services/restaurant.service';

@Module({
    imports: [TypeOrmModule.forFeature([RestaurantDatabaseEntity])],
    controllers: [RestaurantController],
    providers: [RestaurantService, RestaurantRepository],
    exports: [RestaurantService, RestaurantRepository],
})
export class RestaurantModule { }
