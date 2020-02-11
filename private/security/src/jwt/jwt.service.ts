/// <reference path="interfaces/jwt-payload.d.ts" />

import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { ConfigModule } from '@enterprise/config'
import { LoggerService } from '@enterprise/logger'
import { sign, SignOptions } from 'jsonwebtoken'
import { from, of } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators'
import { JwtPayloadData, JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class JwtService {

    private readonly secretKey = ConfigModule.get('jwt.secretKey')
    private readonly signOptions = ConfigModule.get<SignOptions>('jwt.signOptions')

    constructor (private readonly loggerService: LoggerService ) {}

    createToken(payload: JwtPayloadData) {
        const result = sign(
            <JwtPayload> { 
                data: Buffer.from(JSON.stringify(payload)).toString('base64') 
            },
            this.secretKey,
            this.signOptions
        )

        return result
    }

    /*verifyToken(token: string) {
        return new Promise<JwtPayloadData>((resolve, reject) => {
            verify(token, this.secretKey, (err, payload: JwtPayload) => {
                if (err) {
                    this.loggerService.error('printing error while calling JwtService.verifyToken', '')
                    this.loggerService.error(err.message, err.stack)
                    switch (err.name) {
                        case JsonWebTokenError.name: 
                        case NotBeforeError.name:
                        default:
                            return reject(new InternalServerErrorException(err.message))
                        case TokenExpiredError.name: 
                            return reject(new UnauthorizedException())
                    }
                }
                try {
                    resolve(JSON.parse(Buffer.from(payload.data, 'base64').toString()) as JwtPayloadData) 
                } catch (error) {
                    reject(new InternalServerErrorException(`couldn't decode JwtPayload data`, error))   
                }
            }) 
        })
    }*/
}