import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ClientController from './controllers/client.controller';
import ClientDatabaseEntity from './db/client.db.entity';
import { ClientRepository } from './repositories/client.repository';
import ClientService from './services/client.service';

@Module({
    imports: [TypeOrmModule.forFeature([ClientDatabaseEntity])],
    controllers: [ClientController],
    providers: [ClientService, ClientRepository],
    exports: [ClientService, ClientRepository],
})
export class ClientModule { }
