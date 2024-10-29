import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export default class AddressDto {
    @ApiProperty({ description: 'street of the address', example: 'King' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    street: string;

    @ApiProperty({ description: 'city of the address', example: 'NY' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    city: string;

    @ApiProperty({ description: 'state of the address', example: 'california' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    state: string;

    @ApiProperty({ description: 'country of the address', example: 'usa' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    country: string;
}
