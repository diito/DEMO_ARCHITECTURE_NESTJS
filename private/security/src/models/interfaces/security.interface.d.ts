import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'
import { AuditProperties } from '@enterprise/database'
 
declare global {

    export interface SecurityUser {
        idUser: ObjectId
        firstName: string
        lastName: string
    }

    export interface Security extends Document {
        user: SecurityUser
        token: string
        tokenfcm: string
        auditProperties: AuditProperties
    }
}