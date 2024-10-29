import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import RestaurantService from '../services/restaurant.service';
import { RestaurantTransformInterceptor } from '../interceptors/restaurant.transform.interceptor';
import CreateRestaurantDto from '../dtos/create.restaurant.dto';
import UpdateRestaurantDto from '../dtos/update.restaurant.dto';

@Controller('restaurants')
@ApiTags('restaurants')
export default class RestaurantController {
    public constructor(
        @Inject(RestaurantService)
        private readonly restaurantService: RestaurantService,
    ) { }

    @Get()
    @UseInterceptors(RestaurantTransformInterceptor)
    @ApiOperation({ summary: 'Get all restaurants' })
    @ApiResponse({ status: 200, description: 'Restaurants retrieved successfully' })
    async getAll() {
        try {
            return await this.restaurantService.getAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @UseInterceptors(RestaurantTransformInterceptor)
    @ApiOperation({ summary: 'Get restaurant by ID' })
    @ApiResponse({ status: 200, description: 'Restaurant retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Restaurant not found' })
    async getOneById(@Param('id') id: string) {
        try {
            return await this.restaurantService.getOneById(id);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    @UseInterceptors(RestaurantTransformInterceptor)
    @ApiOperation({ summary: 'Create a new restaurant' })
    @ApiResponse({ status: 201, description: 'Restaurant created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async create(@Body() createRestaurantDto: CreateRestaurantDto) {
        try {
            return await this.restaurantService.create(createRestaurantDto);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a restaurant by ID' })
    @ApiResponse({ status: 200, description: 'Restaurant updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiResponse({ status: 404, description: 'Restaurant not found' })
    async update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        try {
            await this.restaurantService.updateOneById(id, updateRestaurantDto);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a restaurant by ID' })
    @ApiResponse({ status: 200, description: 'Restaurant deleted successfully' })
    @ApiResponse({ status: 404, description: 'Restaurant not found' })
    async delete(@Param('id') id: string) {
        try {
            return await this.restaurantService.deleteOneById(id);
        } catch (error) {
            throw error;
        }
    }
}
