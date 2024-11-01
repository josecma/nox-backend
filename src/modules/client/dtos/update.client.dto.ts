import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import MobilePhoneNumberDto from "./mobile.phone.number.dto";
import { ApiProperty } from "@nestjs/swagger";

export default class UpdateClientDto {
    @ApiProperty({ description: 'Name of the client', required: false })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    name: string;

    @ApiProperty({ description: 'Email of the client', required: false })
    @IsOptional()
    @IsEmail()
    @Transform(({ value }) => value.trim())
    email: string;

    @ApiProperty({ description: 'Phone number of the client', required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => MobilePhoneNumberDto)
    phone: MobilePhoneNumberDto;

    @ApiProperty({ description: 'Age of the client', required: false })
    @IsOptional()
    @IsNumber()
    age: string;

};