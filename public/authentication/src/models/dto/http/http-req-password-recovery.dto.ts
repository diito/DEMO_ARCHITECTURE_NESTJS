import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail } from '@enterprise/setup'
import { IsNotEmpty } from 'class-validator';

export class HttpReqPasswordRecoveryDto {
    
    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly email: string;

}