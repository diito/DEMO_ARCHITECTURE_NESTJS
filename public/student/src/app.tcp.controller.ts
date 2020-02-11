import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppTcpService } from './app.tcp.service';
import { from } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';
import { TcpExceptionFilter } from '@enterprise/setup';

@Controller()
export class AppTcpController {
  constructor(private readonly appService: AppTcpService) {}

  @UseFilters(new TcpExceptionFilter())
  @MessagePattern({ action: 'validate-email', type: 'find' })
  validateEmail(dto) {
      return this.appService.validateEmail(dto)
  }

  @UseFilters(new TcpExceptionFilter())
  @MessagePattern({ action: 'validate-credentials', type: 'find' })
  validateCredentials(dto) {
      return this.appService.validateCredentials(dto)
  }

  @UseFilters(new TcpExceptionFilter())
  @MessagePattern({ action: 'password-changue', type: 'update' })
  passwordChangue(dto) {
      return this.appService.passwordChangue(dto)
  }

}
