/// <reference path="../interfaces/request.d.ts" />
/// <reference path="../interfaces/authorization.d.ts" />
/// <reference path="../interfaces/token-payload.d.ts" />

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { SecurityService } from '../security.service'
import { concatMap, tap } from 'rxjs/operators'
import { from, throwError, Observable, of } from 'rxjs';
import { decode } from 'jsonwebtoken'

@Injectable()
export class SecurityGuard implements CanActivate {
    constructor (
        private readonly securityService: SecurityService,
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext) : Observable<boolean>{
        const req  = context.switchToHttp().getRequest()
        if(req.headers && req.headers.authorization){
            let parts = req.headers.authorization.split(' ')
            if (parts.length === 2) {
                let scheme = parts[0], token = parts[1]
                if (!token || !((scheme || '').toLowerCase() === 'bearer')) {
                    throw new UnauthorizedException()
                }
                req.token = Buffer.from(decode(token).data, 'base64').toString('utf8')
                return from(this.securityService.verifyToken(token)).pipe(
                        concatMap(result => {
                            if (!result || !result.data) {
                                return throwError(new UnauthorizedException())
                            }
                            return of(true)
                        })
                    )
            }

        }else {
            throw new UnauthorizedException()
        }
    }
}