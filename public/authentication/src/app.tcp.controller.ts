import { Controller, Get } from '@nestjs/common';
import { AppTcpService } from './app.tcp.service';
import { from } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppTcpController {
  constructor(private readonly appService: AppTcpService) {}

}
