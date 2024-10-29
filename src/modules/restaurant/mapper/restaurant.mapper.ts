import { DeepPartial } from "typeorm";
import RestaurantDatabaseEntity from "../db/restaurant.db.entity";
import { PrimitiveRestaurant } from "../domain/restaurant";
import RestaurantDomainEntity from "../domain/restaurant.domain.entity";

export default class RestaurantMapper {

    static toDomainEntity(
        databaseEntity: RestaurantDatabaseEntity,
    ): RestaurantDomainEntity {
        const { id, name, capacity, address } = databaseEntity;
        return new RestaurantDomainEntity({ name, capacity, address, id, clients: [] });
    };

    static toPrimitive(
        domainEntity: RestaurantDomainEntity,
    ): PrimitiveRestaurant {
        if (domainEntity) {
            const { id, name, capacity, address } = domainEntity;
            return {
                id: id,
                name: name,
                address: address.toPrimitive(),
                capacity: capacity,
                clients: [],
            };
        }
    };

    static toDatabaseEntity(
        domainEntity: RestaurantDomainEntity,
    ): DeepPartial<RestaurantDatabaseEntity> {
        const { id, name, capacity, address } = domainEntity;
        return {
            id: id,
            name: name,
            capacity: capacity,
            address: address.toPrimitive(),
        };
    };
};