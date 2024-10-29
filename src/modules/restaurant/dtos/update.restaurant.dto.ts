import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import MobilePhoneNumberDto from "./address.dto";
import { ApiProperty } from "@nestjs/swagger";
import AddressDto from "./address.dto";

export default class UpdateRestaurantDto {

    @ApiProperty({ description: 'Name of the restaurant', required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    name: string;

    @ApiProperty({ description: 'capacity of the restaurant', required: false })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    capacity: string;

    @ApiProperty({ description: 'address of the restaurant', required: false })
    @IsOptional()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

};