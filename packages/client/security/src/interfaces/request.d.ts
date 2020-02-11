/// <reference path="token-payload.d.ts" />
/// <reference path="authorization.d.ts" />

// import { Request } from 'express'

declare module 'express' {
    export interface Request {
        authorization: Authorization
        user: JwtPayload
        token: any
    }
}