import { ConfigService } from './config.service'
import { ConfigModule } from './config.module'
import { join } from 'path'

export const PROTOCOL = {
    TCP:  { HOST: ConfigService.get<string>('tcp.host', '0.0.0.0'), PORT: ConfigService.get<number>('tcp.port', 3000) },
    HTTP: { HOST: ConfigService.get<string>('http.host', '0.0.0.0'), PORT: ConfigService.get<number>('http.port', 3000) }
}

export const SWAGGER = {
    HOST: ConfigService.get<string>('swagger.host', '0.0.0.0')
}

export const PACKAGE_JSON = require(join(process.cwd(), 'package.json'))

export const DATABASE = {
    MONGO: { URI: ConfigService.get<string>('mongouri', '') },
    MYSQL: { CONFIGURATION: ConfigService.get<any>('mysqldb', '') }
}

export const CLIENTS = {
    ADMINISTRATOR: { HOST: ConfigService.get<string>('client.administrator.host', '0.0.0.0'), PORT: ConfigService.get<number>('client.administrator.port', 3000) },
    STUDENT: { HOST: ConfigService.get<string>('client.student.host', '0.0.0.0'), PORT: ConfigService.get<number>('client.student.port', 3000) },
    SECURITY: { HOST: ConfigService.get<string>('client.security.host', '0.0.0.0'), PORT: ConfigService.get<number>('client.security.port', 3000) },
    MAILING: { HOST: ConfigService.get<string>('client.mailing.host', '0.0.0.0'), PORT: ConfigService.get<number>('client.mailing.port', 3000) }
}

export const CONFIGS3 = {
    BUCKET: ConfigModule.get<string>('configS3.bucket', ''),
    REGION: ConfigModule.get<string>('configS3.region', ''),
    COGNITOID: ConfigModule.get<string>('configS3.cognitoid', '')
}