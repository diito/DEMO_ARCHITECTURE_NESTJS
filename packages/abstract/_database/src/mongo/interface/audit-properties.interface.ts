import { Document } from 'mongoose'
import { ObjectId } from 'mongodb';

export interface AuditProperties extends Document {
    idAudit: ObjectId;
    userCreate: string;
    userUpdate: string;
    dateCreate: Date;
    dateUpdate: Date;
    bitRecordActive: boolean;
}
