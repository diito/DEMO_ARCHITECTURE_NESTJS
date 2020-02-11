import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'
import { AuditProperties } from '@enterprise/database'
 
declare global {

    export interface StudentCountry {
        idCountry: ObjectId
        name: string 
    }

    export interface Student extends Document {
        firstName: string
        lastName: string
        country: StudentCountry
        auditProperties: AuditProperties
    }
}