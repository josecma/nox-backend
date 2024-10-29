import { DeepPartial } from "typeorm";
import ClientDatabaseEntity from "../db/client.db.entity";
import { PrimitiveClient } from "../domain/client";
import ClientDomainEntity from "../domain/client.domain.entity";

export default class ClientMapper {

    static toDomainEntity(
        databaseEntity: ClientDatabaseEntity,
    ): ClientDomainEntity {
        const { id, name, email, phone, age } = databaseEntity;
        return new ClientDomainEntity({ name, email, phone, age, id });
    };

    static toPrimitive(
        domainEntity: ClientDomainEntity,
    ): PrimitiveClient {
        const { id, name, age, email, phone } = domainEntity;
        return {
            id: id,
            name: name,
            email: email,
            phone: phone.toPrimitive(),
            age: age,
        };
    };

    static toDatabaseEntity(
        domainEntity: ClientDomainEntity,
    ): DeepPartial<ClientDatabaseEntity> {
        const { id, name, age, email, phone } = domainEntity;
        return {
            id: id,
            name: name,
            email: email,
            phone: phone.toPrimitive(),
            age: age,
        };
    };
};