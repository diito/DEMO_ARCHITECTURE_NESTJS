import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

import { LoggerService } from '@enterprise/logger';

import { BaseFilter } from './base.filter';
import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

@Catch()
export class ErrorFilter extends BaseFilter implements ExceptionFilter  {
    constructor (private readonly loggerService: LoggerService) {
        super()
    }

    catch(exception: Error, host: ArgumentsHost ) {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse<FastifyReply<ServerResponse>>()
        let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
        let message: string = exception.message
        let stack: string = exception.stack

        const httpException = this.parseToHttpExceptionFormat(exception)
        if (httpException) {
            message = httpException.message
            statusCode = httpException.statusCode || httpException['status']
            this.loggerService.error('is httpException', JSON.stringify(httpException))
        }
        else {
            const errorType = typeof(exception)
            if (errorType === 'string')
                message = String(exception)

            this.loggerService.error('is Error', JSON.stringify({ errorType, message, statusCode, stack }))
        }

        
        res.status(statusCode)

        switch (statusCode) {
            case HttpStatus.NO_CONTENT: 
            case HttpStatus.UNAUTHORIZED:
                res.send()
                return res
            case HttpStatus.BAD_REQUEST: return res.send({ statusCode, rules: message  })
            case HttpStatus.CONFLICT: return res.send({ statusCode, message })
            default: return res.send({ statusCode, message, stack })
        }
    }
}