import * as mongoose from 'mongoose'

import { StudentCountrySchema } from './student-country.schema'
import { AuditPropertiesSchema } from '@enterprise/database';

export const StudentSchema = new mongoose.Schema(
    {
        firstName : {
            type: String,
            index: true
        },
        lastName : {
            type: String,
            index: true
        },
        country: StudentCountrySchema,
        auditProperties: AuditPropertiesSchema
    },
    {
        collection: "Students"
    }
);