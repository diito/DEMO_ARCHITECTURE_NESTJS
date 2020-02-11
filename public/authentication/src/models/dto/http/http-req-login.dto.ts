import { ApiModelPropertyOptional } from "@nestjs/swagger"

export class HttpReqLoginDto {
    
    @ApiModelPropertyOptional()
    readonly email: string;

    @ApiModelPropertyOptional()
    readonly password: string;

    @ApiModelPropertyOptional()
    readonly idFacebook: string;

}