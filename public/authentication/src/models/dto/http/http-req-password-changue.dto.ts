import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from '@enterprise/setup'
import { IsNotEmpty } from 'class-validator';

export class HttpReqPasswordChangueDto {
    
    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly password: string;

}