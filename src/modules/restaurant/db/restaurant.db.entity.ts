import OrderDatabaseEntity from "src/modules/order/db/order.db.entity";
import BaseDBEntity from "src/modules/shared/db/base.db.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { PrimitiveAddress } from "../domain/restaurant";

@Entity('restaurants')
export default class RestaurantDatabaseEntity extends BaseDBEntity {

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'int' })
    capacity: string;

    @Column({ type: 'json' })
    address: PrimitiveAddress;

    @OneToMany(() => OrderDatabaseEntity, order => order.restaurant)
    orders: OrderDatabaseEntity[];

};