import BaseDBEntity from "src/modules/shared/db/base.db.entity";
import { Column, Entity } from "typeorm";
import { PrimitiveMobilePhoneNumber } from "../domain/client";

@Entity('clients')
export default class ClientDatabaseEntity extends BaseDBEntity {

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'json' })
    phone: PrimitiveMobilePhoneNumber;

    @Column({ type: 'int' })
    age: string;

};