import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateClientDto from '../dtos/create.client.dto';
import UpdateClientDto from '../dtos/update.client.dto';
import { ClientTransformInterceptor } from '../interceptors/client.transform.interceptor';
import ClientService from '../services/client.service';

@Controller('clients')
@ApiTags('clients')
@UseInterceptors(ClientTransformInterceptor)
export default class ClientController {
    public constructor(
        @Inject(ClientService)
        private readonly clientService: ClientService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all clients' })
    @ApiResponse({ status: 200, description: 'Clients retrieved successfully' })
    async getAll() {
        try {
            return await this.clientService.getAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get client by ID' })
    @ApiResponse({ status: 200, description: 'Client retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    async getOneById(@Param('id') id: string) {
        try {
            return await this.clientService.getOneById(id);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new client' })
    @ApiResponse({ status: 201, description: 'Client created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async create(@Body() createClientDto: CreateClientDto) {
        try {
            return await this.clientService.create(createClientDto);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a client by ID' })
    @ApiResponse({ status: 200, description: 'Client updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
        try {
            return await this.clientService.updateOneById(id, updateClientDto);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a client by ID' })
    @ApiResponse({ status: 200, description: 'Client deleted successfully' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    async delete(@Param('id') id: string) {
        try {
            return await this.clientService.deleteOneById(id);
        } catch (error) {
            throw error;
        }
    }
}
