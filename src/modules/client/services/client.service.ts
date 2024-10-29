import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ClientDomainEntity from "../domain/client.domain.entity";
import CreateClientDto from "../dtos/create.client.dto";
import { ClientRepository } from "../repositories/client.repository";
import UpdateOneClientDto from "../dtos/update.client.dto";

@Injectable()
export default class ClientService {

    public constructor(
        @Inject()
        private readonly clientRepository: ClientRepository,
    ) { };

    async getAll(): Promise<ClientDomainEntity[]> {
        try {
            return await this.clientRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException();
        };
    };

    async getOneById(id: string): Promise<ClientDomainEntity> {

        try {
            const clientDomainEntity = await this.clientRepository.getBy([{ id: id }]);

            if (clientDomainEntity.length === 0) {
                throw new NotFoundException(`client with id ${id} not found.`);
            }

            return clientDomainEntity[0];
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException(`an error occurred while retrieving the client: ${(<Error>error).message}`);
        }
    }

    async create(createClientDto: CreateClientDto): Promise<ClientDomainEntity> {
        const { name, email, age, phone } = createClientDto;
        try {
            const clientByEmail = await this.clientRepository.getBy([{ email: email }]);

            if (clientByEmail.length > 0) {
                throw new ConflictException(`This client with email: ${email} already exists`);
            }

            const clientDomainEntity = new ClientDomainEntity({ name, email, age, phone });

            const createdDomainEntity = await this.clientRepository.save(clientDomainEntity);

            return createdDomainEntity;

        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            };

            throw new InternalServerErrorException(`an error occurred while creating the client: ${(<Error>error).message}`);
        }
    }

    async updateOneById(id: string, updateOneClient: UpdateOneClientDto): Promise<void> {

        try {


            const clientById = await this.getOneById(id);

            clientById.name = updateOneClient.name ?? clientById.name;
            clientById.email = updateOneClient.email ?? clientById.email;
            clientById.phone = updateOneClient.phone ?? clientById.phone.toPrimitive();
            clientById.age = updateOneClient.age ?? clientById.age;

            const updateResult = await this.clientRepository.update(id, clientById);

            if (updateResult.affected === 0) {
                throw new InternalServerErrorException(`an error occurred while updating the client`);
            };

        } catch (error) {
            throw error;
        }
    };

    async deleteOneById(id: string): Promise<void> {

        try {
            const clientDomainEntity = await this.clientRepository.getBy([{ id: id }]);

            if (clientDomainEntity.length === 0) {
                throw new NotFoundException(`client with id ${id} not found`);
            }

            const deleteResult = await this.clientRepository.deleteBy([id]);

            if (deleteResult.affected === 0) {
                throw new InternalServerErrorException(`an error occurred while deleting the client`);
            };

        } catch (error) {
            throw error;
        }
    }

}