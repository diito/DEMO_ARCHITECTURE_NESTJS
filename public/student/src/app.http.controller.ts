import { Controller, HttpCode, HttpStatus, Post, Body, Query, Get } from '@nestjs/common';
import { AppHttpService } from './app.http.service';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiUseTags("Responsible service for all student management in proyect")
@Controller("Student")
export class AppHttpController {
  constructor(private readonly appService: AppHttpService) {}

  @ApiOperation({ title: "Validation Credential.", description: "The following function validate credentials for user registered in the database." })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Validation credentials incorrect" , type: { statusCode: String, message: String }, isArray: false })
  @HttpCode(HttpStatus.OK)
  @Get('find')
  login() {
    return this.appService.findStudent();
  }

}