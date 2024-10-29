import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import MobilePhoneNumberDto from "./mobile.phone.number.dto";
import { ApiProperty } from "@nestjs/swagger";

export default class CreateClientDto {
    @ApiProperty({ description: 'Name of the client' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    name: string;

    @ApiProperty({ description: 'Email of the client' })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    email: string;

    @ApiProperty({ description: 'Phone number of the client' })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => MobilePhoneNumberDto)
    phone: MobilePhoneNumberDto;

    @ApiProperty({ description: 'Age of the client' })
    @IsNotEmpty()
    @IsNumber()
    age: string;

};