import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import RestaurantDomainEntity from "../domain/restaurant.domain.entity";
import CreateRestaurantDto from "../dtos/create.restaurant.dto";
import UpdateRestaurantDto from "../dtos/update.restaurant.dto";
import { RestaurantRepository } from "../repositories/restaurant.repository";

@Injectable()
export default class RestaurantService {

    public constructor(
        @Inject()
        private readonly restaurantRepository: RestaurantRepository,
    ) { };

    async getAll(): Promise<RestaurantDomainEntity[]> {
        try {
            return await this.restaurantRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException();
        };
    };

    async getOneById(id: string): Promise<RestaurantDomainEntity> {

        try {
            const restaurantDomainEntity = await this.restaurantRepository.getBy([{ id: id }]);

            if (restaurantDomainEntity.length === 0) {
                throw new NotFoundException(`restaurant with id ${id} not found.`);
            }

            return restaurantDomainEntity[0];
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException(`an error occurred while retrieving the restaurant: ${(<Error>error).message}`);
        }
    }

    async create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDomainEntity> {
        const { name, capacity, address } = createRestaurantDto;
        try {
            const restaurantByName = await this.restaurantRepository.getBy([{ name: name }]);

            if (restaurantByName.length > 0) {
                throw new ConflictException(`This restaurant with name: ${name} already exists`);
            }

            const clientDomainEntity = new RestaurantDomainEntity({
                name, capacity, address, clients: []
            });

            const createdDomainEntity = await this.restaurantRepository.save(clientDomainEntity);

            return createdDomainEntity;

        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            };

            throw new InternalServerErrorException(`an error occurred while creating the restaurant: ${(<Error>error).message}`);
        }
    }

    async updateOneById(id: string, updateRestaurant: UpdateRestaurantDto): Promise<void> {

        try {

            const restaurantById = await this.getOneById(id);

            restaurantById.name = updateRestaurant.name ?? restaurantById.name;
            restaurantById.address = updateRestaurant.address ?? restaurantById.address;
            restaurantById.capacity = updateRestaurant.capacity ?? restaurantById.capacity;

            const updateResult = await this.restaurantRepository.update(id, restaurantById);


        } catch (error) {
            throw error;
        }
    };

    async deleteOneById(id: string): Promise<void> {

        try {
            const clientDomainEntity = await this.restaurantRepository.getBy([{ id: id }]);

            if (clientDomainEntity.length === 0) {
                throw new NotFoundException(`restaurantById with id ${id} not found`);
            }

            const deleteResult = await this.restaurantRepository.deleteBy([id]);

            if (deleteResult.affected === 0) {
                throw new InternalServerErrorException(`an error occurred while deleting the restaurant`);
            };

        } catch (error) {
            throw error;
        }
    }

}
