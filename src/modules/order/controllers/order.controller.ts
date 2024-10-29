import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import OrderService from '../services/order.service';
import { OrderTransformInterceptor } from '../interceptors/order.transform.interceptor';
import CreateOrderDto from '../dtos/create.order.dto';
import UpdateOrderDto from '../dtos/update.order.dto';

@Controller('orders')
@ApiTags('orders')
@UseInterceptors(OrderTransformInterceptor)
export default class OrderController {
    constructor(
        @Inject(OrderService)
        private readonly orderService: OrderService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
    async getAll() {
        try {
            return await this.orderService.getAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get order by ID' })
    @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async getOneById(@Param('id') id: string) {
        try {
            return await this.orderService.getOneById(id);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async create(@Body() createOrderDto: CreateOrderDto) {
        try {
            return await this.orderService.create(createOrderDto);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update an order by ID' })
    @ApiResponse({ status: 200, description: 'Order updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        try {
            await this.orderService.updateOneById(id, updateOrderDto);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete an order by ID' })
    @ApiResponse({ status: 200, description: 'Order deleted successfully' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async delete(@Param('id') id: string) {
        try {
            return await this.orderService.deleteOneById(id);
        } catch (error) {
            throw error;
        }
    }
}
