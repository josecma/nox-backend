import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import ClientService from 'src/modules/client/services/client.service';
import RestaurantService from 'src/modules/restaurant/services/restaurant.service';
import OrderDomainEntity from '../domain/order.domain.entity';
import CreateOrderDto from '../dtos/create.order.dto';
import UpdateOrderDto from '../dtos/update.order.dto';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export default class OrderService {

    public constructor(
        @Inject(OrderRepository)
        private readonly orderRepository: OrderRepository,
        @Inject(ClientService)
        private readonly clientService: ClientService,
        @Inject(RestaurantService)
        private readonly restaurantService: RestaurantService,
    ) { }

    async getAll(): Promise<OrderDomainEntity[]> {
        try {
            return await this.orderRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getOneById(id: string): Promise<OrderDomainEntity> {
        try {
            const orderDomainEntity = await this.orderRepository.getBy([{ id: id }]);
            if (orderDomainEntity.length === 0) {
                throw new NotFoundException(`Order with id ${id} not found.`);
            }
            return orderDomainEntity[0];
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`An error occurred while retrieving the order: ${(<Error>error).message}`);
        }
    }

    async create(createOrderDto: CreateOrderDto): Promise<OrderDomainEntity> {
        const { clientId, restaurantId, description } = createOrderDto;

        try {
            const clientById = await this.clientService.getOneById(clientId);

            if (Number(clientById.age) < 18) {
                throw new Error(`client is not of legal age`)
            }

            const restaurantById = await this.restaurantService.getOneById(restaurantId);

            const orders = await this.orderRepository.getBy([{ restaurantId: restaurantById.id }]);

            if (!(Number(restaurantById.capacity) > orders.length)) {
                throw new Error(`restaurant is full`)
            }

            const orderDomainEntity = new OrderDomainEntity({ clientId, restaurantId, description });

            const createdDomainEntity = await this.orderRepository.save(orderDomainEntity);

            return createdDomainEntity;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException(`An error occurred while creating the order: ${(<Error>error).message}`);
        }
    }

    async updateOneById(id: string, updateOrderDto: UpdateOrderDto): Promise<void> {
        const { clientId, restaurantId, description } = updateOrderDto;
        try {

            await this.clientService.getOneById(clientId);

            await this.restaurantService.getOneById(restaurantId);

            const orderById = await this.getOneById(id);

            orderById.clientId = updateOrderDto.clientId ?? orderById.clientId;
            orderById.restaurantId = updateOrderDto.restaurantId ?? orderById.restaurantId;
            orderById.description = updateOrderDto.description ?? orderById.description;

            const updateResult = await this.orderRepository.update(id, orderById);

            if (updateResult.affected === 0) {
                throw new InternalServerErrorException(`an error occurred while updating the order`);
            };

        } catch (error) {
            throw error;
        }
    }

    async deleteOneById(id: string): Promise<void> {
        try {
            const orderDomainEntity = await this.orderRepository.getBy([{ id: id }]);
            if (orderDomainEntity.length === 0) {
                throw new NotFoundException(`Order with id ${id} not found`);
            }
            const deleteResult = await this.orderRepository.deleteBy([id]);
            if (deleteResult.affected === 0) {
                throw new InternalServerErrorException(`An error occurred while deleting the order`);
            }
        } catch (error) {
            throw error;
        }
    }
}
