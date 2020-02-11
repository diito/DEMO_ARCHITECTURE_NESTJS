import { Module } from '@nestjs/common';

import { MongoDbModule } from '@enterprise/database'

import { MODULE } from './app.constant';
import { AppHttpController } from './app.http.controller';
import { AppHttpService } from './app.http.service';
import { AppTcpController } from './app.tcp.controller';
import { AppTcpService } from './app.tcp.service';
import { StudentSchema } from './models/schemas/security.schema';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    JwtModule,
    MongoDbModule,
    MongoDbModule.forFeature([{ name: MODULE.SECURITY, schema: StudentSchema }])
  ],
  controllers: [AppHttpController, AppTcpController],
  providers: [AppHttpService, AppTcpService],
})
export class AppModule {}