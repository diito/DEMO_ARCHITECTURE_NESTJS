import * as mongoose from 'mongoose';
import * as moment from 'moment'
import { ObjectId } from 'mongodb';
var Schema = mongoose.Schema;

export const AuditPropertiesSchema = new Schema(
    {
        idAudit: ObjectId,
        userCreate: String,
        userUpdate: {
            type: String,
            default: ""
        },
        dateCreate: {
            type: Date,
            default: () => moment.utc()
        },
        dateUpdate: {
            type: Date,
            default: null 
        },
        bitRecordActive: {
            type: Boolean,
            default: true
        }
    },{
        _id: false
    }
)