import ClientDatabaseEntity from "src/modules/client/db/client.db.entity";
import RestaurantDatabaseEntity from "src/modules/restaurant/db/restaurant.db.entity";
import BaseDBEntity from "src/modules/shared/db/base.db.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('orders')
export default class OrderDatabaseEntity extends BaseDBEntity {

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'bigint' })
    clientId: string;

    @Column({ type: 'bigint' })
    restaurantId: string;

    @ManyToOne(() => ClientDatabaseEntity, (client) => client.orders, { onDelete: 'CASCADE' })
    client: ClientDatabaseEntity;

    @ManyToOne(() => RestaurantDatabaseEntity, (restaurant) => restaurant.orders, { onDelete: 'CASCADE' })
    restaurant: RestaurantDatabaseEntity

};