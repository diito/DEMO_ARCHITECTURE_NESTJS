import * as config from 'config'
import { Module, Global } from '@nestjs/common'
import { ConfigService } from './config.service'

@Global()
@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService('.env')
        }
    ],
    exports: [ConfigService]
})
export class ConfigModule {
    static get<T = string>(key: string, defaultValue?: T): T {
        return config.has(key) ? config.get(key) : (defaultValue || null)
    }

    static getClient(clientKey: string) {
        const key = `client.${clientKey}`
        if (config.has(key))
            return config.get<object>(key)
        throw new Error(`missing key: ${key} in configuration file`)
    }
}