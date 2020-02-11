import { ApiModelProperty } from "@nestjs/swagger";

import { IsString, IsNotEmpty } from 'class-validator';

import { TYPE_USER } from "../../../app.constant";

export class HttpReqLoginParameterDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ enum: [TYPE_USER.ADMIN, TYPE_USER.STUDENT]})
    readonly typeUser: string;

}