import { ApiModelProperty } from "@nestjs/swagger"

export class HttpResLoginDto {

    @ApiModelProperty()
    readonly token: string;

}