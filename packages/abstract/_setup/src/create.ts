import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DynamicModule, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';

import { PACKAGE_JSON, PROTOCOL} from '@enterprise/config';
import { LoggerModule, LoggerService } from '@enterprise/logger';
import { loggerServiceInstance } from '@enterprise/logger/dist/logger.providers';

import { ErrorFilter } from './filters/error.filter';
import { SetupModule } from './setup.module';

export const create = async (appModule: any, builder?: (app: INestApplication, documentBuilder: DocumentBuilder) => void | Promise<void>) => {
  const app = await NestFactory.create(
      <DynamicModule>{
          module: SetupModule,
          imports: [appModule]
      },
      new FastifyAdapter()
      ,
      <NestApplicationOptions>{
          logger: loggerServiceInstance
      }
  )
  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalFilters(
      app.get(ErrorFilter)
  )
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const loggerSevice = app.select(LoggerModule).get(LoggerService)

  const documentBuilder = new DocumentBuilder()
      .setTitle(PACKAGE_JSON.name)
      .setDescription(PACKAGE_JSON.description)
      .setBasePath('/api')
      .addBearerAuth()
      

  if (builder)
      await builder(app, documentBuilder)

  SwaggerModule.setup('/swagger', app, SwaggerModule.createDocument(app, documentBuilder.build()))

  await app.startAllMicroservicesAsync()
  await app.listenAsync(PROTOCOL.HTTP.PORT, PROTOCOL.HTTP.HOST)
  loggerSevice.log(`listening at http://${PROTOCOL.HTTP.HOST}:${PROTOCOL.HTTP.PORT}`)
  loggerSevice.log(`swagger documentation at http://${PROTOCOL.HTTP.HOST}:${PROTOCOL.HTTP.PORT}/swagger/ `)
}   