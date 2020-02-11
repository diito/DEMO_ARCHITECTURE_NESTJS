import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppTcpService } from './app.tcp.service';
import { from } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';
import { TcpExceptionFilter } from '@enterprise/setup';

@Controller()
export class AppTcpController {
  constructor(private readonly appService: AppTcpService) {}

  @UseFilters(new TcpExceptionFilter())
  @MessagePattern({ action: 'create-token', type: 'create' })
  createToken(dto) {
      return this.appService.createToken(dto)
  }

  @UseFilters(new TcpExceptionFilter())
  @MessagePattern({ action: 'logout', type: 'update' })
  logout(dto) {
      return this.appService.logout(dto)
  }

  @UseFilters(new TcpExceptionFilter())
  @MessagePattern({ action: 'verify-token', type: 'find' })
  verifyToken(dto) {
      return this.appService.verifyToken(dto)
  }

}
