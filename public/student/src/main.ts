import { Transport } from '@nestjs/common/enums/transport.enum';

import { PROTOCOL } from '@enterprise/config';
import { create } from '@enterprise/setup';

import { AppModule } from './app.module';

create( AppModule, app => {
  app.connectMicroservice({ 
    transport: Transport.TCP, 
    options: { port: PROTOCOL.TCP.PORT, host: PROTOCOL.TCP.HOST }
  });
})