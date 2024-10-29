import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateOrderDto {

    @ApiProperty({ description: 'clientId of the order', required: false })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    clientId: string;

    @ApiProperty({ description: 'restaurantId of the order', required: false })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    restaurantId: string;

    @ApiProperty({ description: 'description of the order', required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    description: string;

};