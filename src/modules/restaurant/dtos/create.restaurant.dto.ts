import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import AddressDto from "./address.dto";

export default class CreateRestaurantDto {
    @ApiProperty({ description: 'Name of the restaurant' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    name: string;

    @ApiProperty({ description: 'capacity of the restaurant' })
    @IsNumber()
    @IsNotEmpty()
    capacity: string;

    @ApiProperty({ description: 'address of the restaurant' })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

};