import { Controller, HttpCode, HttpStatus, Post, Body, Query, Get } from '@nestjs/common';
import { AppHttpService } from './app.http.service';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiUseTags("Responsible service for all student management in proyect")
@Controller("Student")
export class AppHttpController {
  constructor(private readonly appService: AppHttpService) {}

}