import { DeepPartial } from "typeorm";
import OrderDatabaseEntity from "../db/order.db.entity";
import { PrimitiveOrder } from "../domain/order";
import OrderDomainEntity from "../domain/order.domain.entity";

export default class OrderMapper {

    static toDomainEntity(
        databaseEntity: OrderDatabaseEntity,
    ): OrderDomainEntity {
        const { id, clientId, restaurantId, description } = databaseEntity;
        return new OrderDomainEntity({ description, clientId, restaurantId, id });
    };

    static toPrimitive(
        domainEntity: OrderDomainEntity,
    ): PrimitiveOrder {
        const { id, clientId, restaurantId, description } = domainEntity;
        return {
            id: id,
            clientId: clientId,
            restaurantId: restaurantId,
            description: description,
        };
    };

    static toDatabaseEntity(
        domainEntity: OrderDomainEntity,
    ): DeepPartial<OrderDatabaseEntity> {
        const { id, clientId, restaurantId, description } = domainEntity;
        return {
            id: id,
            clientId: clientId,
            restaurantId: restaurantId,
            description: description,
        };
    };
};