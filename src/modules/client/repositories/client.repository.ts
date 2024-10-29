import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/modules/shared/repositories/base.repository';
import { DeepPartial, Repository } from 'typeorm';
import ClientDatabaseEntity from '../db/client.db.entity';
import ClientDomainEntity from '../domain/client.domain.entity';
import ClientMapper from '../mappers/client.mapper';

@Injectable()
export class ClientRepository extends BaseRepository<ClientDomainEntity, ClientDatabaseEntity> {

    public constructor(
        @InjectRepository(ClientDatabaseEntity)
        clientRepository: Repository<ClientDatabaseEntity>,
    ) {

        super(clientRepository);

    };

    protected toDomainEntity(databaseEntity: ClientDatabaseEntity): ClientDomainEntity {
        return ClientMapper.toDomainEntity(databaseEntity);
    };

    protected toDatabaseEntity(domainEntity: ClientDomainEntity): DeepPartial<ClientDatabaseEntity> {
        return ClientMapper.toDatabaseEntity(domainEntity);
    };

};