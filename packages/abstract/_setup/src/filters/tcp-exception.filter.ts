
import { Catch, ArgumentsHost, HttpStatus, RpcExceptionFilter } from '@nestjs/common';

import { BaseFilter } from './base.filter';
import { Observable, throwError } from 'rxjs';

@Catch()
export class TcpExceptionFilter extends BaseFilter implements RpcExceptionFilter {
    constructor() {
        super();
    }
    catch(exception: Error, host: ArgumentsHost): Observable<any> {
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message;
        const httpException = this.parseToHttpExceptionFormat(exception);
        if (httpException) {
            statusCode = httpException.statusCode;
            message = httpException.message;
        }
        return throwError(Object.assign({ statusCode, message }, { ...(httpException || exception) }));
    }
}

