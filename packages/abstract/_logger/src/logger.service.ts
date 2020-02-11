import * as common from '@nestjs/common'
import * as bunyan from 'bunyan'
import { join } from 'path'
import PrettyStream = require('bunyan-prettystream')

export class LoggerService implements common.LoggerService {
    private readonly _logger: bunyan

    constructor() {
        const packageJson = require(join(process.cwd(), 'package.json'))
        const prettyStream = new PrettyStream()

        prettyStream.pipe(process.stdout)

        this._logger = bunyan.createLogger({
            name: packageJson.name,
            streams: [
                {
                    level: 'debug',
                    type: 'raw',
                    stream: prettyStream
                }
            ]
        })
    }  

    log(message: any, ...params: Array<any>) { this._logger.info(message, params) }    
    error(message: string, trace: string) { this._logger.error(message, trace,) }
    warn(message: string, ...params: Array<any>) { this._logger.warn(message, params) }
}

