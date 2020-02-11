import { Controller, HttpCode, HttpStatus, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SecurityGuard, Token } from '@enterprise/client-security'
import { AppHttpService } from './app.http.service';
import { HttpReqLoginDto } from './models/dto/http/http-req-login.dto';
import { HttpReqLoginParameterDto } from './models/dto/http/http-req-login-parameter.dto';
import { HttpResLoginDto } from './models/dto/http/http-res-login.dto';
import { HttpReqPasswordRecoveryDto } from './models/dto/http/http-req-password-recovery.dto';
import { HttpReqPasswordChangueDto } from './models/dto/http/http-req-password-changue.dto';

@ApiUseTags("Responsible service for all authentication management in project")
@Controller("Authentication")
export class AppHttpController {
  constructor(private readonly appService: AppHttpService) {}

  @ApiOperation({ title: "Validation Credential.", description: "The following function validate credentials for user registered in the database." })
  @ApiResponse({ status: HttpStatus.OK, description: "Find user", type: HttpResLoginDto, isArray: false })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Validation credentials incorrect" , type: { statusCode: String, message: String }, isArray: false })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Query() { typeUser } : HttpReqLoginParameterDto,
    @Body() dto : HttpReqLoginDto
  ) {
    return this.appService.login(typeUser, dto);
  }

  @ApiBearerAuth()
  @UseGuards(SecurityGuard)
  @ApiOperation({ title: "LogOut for aplicative.", description: "The following function logout for user registered in the database." })
  @ApiResponse({ status: HttpStatus.OK, description: "Log out user" })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logOut(
    @Token() token: string
  ) {
    return this.appService.logout(token);
  }

  @ApiOperation({ title: "Recovery password for aplicative.", description: "The following function recovery password for user registered in the database." })
  @ApiResponse({ status: HttpStatus.OK, description: "Recovery password user" })
  @HttpCode(HttpStatus.OK)
  @Post('password-recovery')
  passwordRecovery(
    @Query() { email } : HttpReqPasswordRecoveryDto,
  ) {
    return this.appService.passwordRecovery(email);
  }

  @ApiOperation({ title: "Changue password for aplicative.", description: "The following function changue password for user registered in the database." })
  @ApiResponse({ status: HttpStatus.OK, description: "Changue password user" })
  @HttpCode(HttpStatus.OK)
  @Post('password-changue')
  passwordChangue(
    @Query() { email, password } : HttpReqPasswordChangueDto,
  ) {
    return this.appService.passwordChangue(email, password);
  }

}