import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/modules/shared/repositories/base.repository';
import { DeepPartial, Repository } from 'typeorm';
import OrderDatabaseEntity from '../db/order.db.entity';
import OrderDomainEntity from '../domain/order.domain.entity';
import OrderMapper from '../mappers/order.mapper';

@Injectable()
export class OrderRepository extends BaseRepository<OrderDomainEntity, OrderDatabaseEntity> {

    public constructor(
        @InjectRepository(OrderDatabaseEntity)
        orderRepository: Repository<OrderDatabaseEntity>,
    ) {

        super(orderRepository);

    };

    protected toDomainEntity(databaseEntity: OrderDatabaseEntity): OrderDomainEntity {
        return OrderMapper.toDomainEntity(databaseEntity);
    };

    protected toDatabaseEntity(domainEntity: OrderDomainEntity): DeepPartial<OrderDatabaseEntity> {
        return OrderMapper.toDatabaseEntity(domainEntity);
    };

};