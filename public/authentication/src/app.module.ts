import { Module } from '@nestjs/common';

import { AdministratorModule } from '@enterprise/client-administrator';
import { StudentModule } from '@enterprise/client-student';
import { SecurityModule } from '@enterprise/client-security';
import { MailingModule } from '@enterprise/client-mailing'

import { AppHttpController } from './app.http.controller';
import { AppTcpController } from './app.tcp.controller';
import { AppHttpService } from './app.http.service';
import { AppTcpService } from './app.tcp.service';

@Module({
  imports: [
    //AdministratorModule,
    SecurityModule,
    StudentModule,
    MailingModule
  ],
  controllers: [AppHttpController, AppTcpController],
  providers: [AppHttpService, AppTcpService],
})
export class AppModule {}