import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/modules/shared/repositories/base.repository';
import { DeepPartial, Repository } from 'typeorm';
import RestaurantDomainEntity from '../domain/restaurant.domain.entity';
import RestaurantDatabaseEntity from '../db/restaurant.db.entity';
import RestaurantMapper from '../mapper/restaurant.mapper';

@Injectable()
export class RestaurantRepository extends BaseRepository<RestaurantDomainEntity, RestaurantDatabaseEntity> {

    public constructor(
        @InjectRepository(RestaurantDatabaseEntity)
        restaurantRepository: Repository<RestaurantDatabaseEntity>,
    ) {

        super(restaurantRepository);

    };

    protected toDomainEntity(databaseEntity: RestaurantDatabaseEntity): RestaurantDomainEntity {
        return RestaurantMapper.toDomainEntity(databaseEntity);
    };

    protected toDatabaseEntity(domainEntity: RestaurantDomainEntity): DeepPartial<RestaurantDatabaseEntity> {
        return RestaurantMapper.toDatabaseEntity(domainEntity);
    };

};