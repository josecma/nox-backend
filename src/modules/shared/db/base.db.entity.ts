import { PrimaryGeneratedColumn } from "typeorm";

export default class BaseDatabaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
};