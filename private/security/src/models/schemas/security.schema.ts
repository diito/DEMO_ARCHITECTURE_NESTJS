import { AuditPropertiesSchema } from '@enterprise/database';
import * as mongoose from 'mongoose';
import { SecurityUserSchema } from './security-user.schema';

export const StudentSchema = new mongoose.Schema(
    {
        user: SecurityUserSchema,
        token: {
            type: String,
            index: true
        },
        tokenfcm: String,
        auditProperties: AuditPropertiesSchema
    },
    {
        collection: "Securities"
    }
);