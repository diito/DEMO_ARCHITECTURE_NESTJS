import { Module } from '@nestjs/common';

import { LoggerModule } from '@enterprise/logger';

import { setupProviders } from './setup.providers'

@Module({
    imports: [LoggerModule],
    providers: [...setupProviders],
    exports: [...setupProviders]
})

export class SetupModule {}