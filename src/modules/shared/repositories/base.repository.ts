import {
    DeepPartial,
    DeleteResult,
    FindManyOptions,
    FindOptionsWhere,
    ObjectId,
    Repository,
    UpdateResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import BaseDatabaseEntity from '../db/base.db.entity';
import BaseDomainEntity from '../domain/base.domain.entity';

export default abstract class BaseRepository<
    DomainEntity extends BaseDomainEntity,
    DatabaseEntity extends BaseDatabaseEntity
> {
    protected repository: Repository<DatabaseEntity>;

    public constructor(repository: Repository<DatabaseEntity>) {
        this.repository = repository;
    }

    async getAll(options?: FindManyOptions<DatabaseEntity>): Promise<DomainEntity[]> {
        try {
            const databaseEntities = await this.repository.find(options);
            return databaseEntities.map((databaseEntity) => this.toDomainEntity(databaseEntity));
        } catch (error) {
            throw error;
        }
    }

    async getBy(findOptionsWhere: FindOptionsWhere<DatabaseEntity>[]): Promise<DomainEntity[]> {
        try {
            const databaseEntities = await this.repository.findBy(findOptionsWhere);
            return databaseEntities.map((databaseEntity) => this.toDomainEntity(databaseEntity));
        } catch (error) {
            throw error;
        }
    }

    async save(domainEntity: DomainEntity): Promise<DomainEntity> {
        try {
            const databaseEntity = this.toDatabaseEntity(domainEntity);
            const savedDatabaseEntity = await this.repository.save(databaseEntity);
            return this.toDomainEntity(savedDatabaseEntity);
        } catch (error) {
            throw error;
        }
    }

    async update(
        criteria: string | number | FindOptionsWhere<DatabaseEntity> | Date | ObjectId | string[] | number[] | Date[] | ObjectId[],
        domainEntity: DomainEntity
    ): Promise<UpdateResult> {
        try {
            const databaseEntity = this.toDatabaseEntity(domainEntity) as QueryDeepPartialEntity<DatabaseEntity>;
            return await this.repository.update(criteria, databaseEntity);

        } catch (error) {
            throw error;
        }
    }

    async deleteBy(ids: string[]): Promise<DeleteResult> {
        try {
            return await this.repository.delete(ids);
        } catch (error) {
            throw error;
        }
    }

    protected abstract toDomainEntity(databaseEntity: DatabaseEntity): DomainEntity;

    protected abstract toDatabaseEntity(domainEntity: DomainEntity): DeepPartial<DatabaseEntity>;
}