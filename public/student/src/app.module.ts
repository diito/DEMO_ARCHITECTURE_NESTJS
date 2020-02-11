import { Module } from '@nestjs/common';
import { LoggerModule } from '@enterprise/logger'
import { MongoDbModule } from '@enterprise/database'

import { MODULE } from './app.constant';
import { AppHttpController } from './app.http.controller';
import { AppHttpService } from './app.http.service';
import { AppTcpController } from './app.tcp.controller';
import { AppTcpService } from './app.tcp.service';
import { StudentSchema } from './models/schemas/student.schema';

@Module({
  imports: [
    LoggerModule,
    MongoDbModule,
    MongoDbModule.forFeature([{ name: MODULE.STUDENT, schema: StudentSchema }])
  ],
  controllers: [AppHttpController, AppTcpController],
  providers: [AppHttpService, AppTcpService],
})
export class AppModule {}