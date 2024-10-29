import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class CreateOrderDto {
    @ApiProperty({ description: 'clientId of the order' })
    @IsNumber()
    @IsNotEmpty()
    clientId: string;

    @ApiProperty({ description: 'restaurantId of the order' })
    @IsNumber()
    @IsNotEmpty()
    restaurantId: string;

    @ApiProperty({ description: 'description of the order' })
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    description: string;

};