import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class MobilePhoneNumberDto {
    @ApiProperty({ description: 'prefix of the mobile number', example: '+53' })
    @IsString()
    @IsNotEmpty()
    prefix: string;

    @ApiProperty({ description: 'code of the mobile number', example: '5' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'personal number of the mobile number', example: '1234567' })
    @IsString()
    @IsNotEmpty()
    personalNumber: string;
}
