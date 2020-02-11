import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb'
 
export const SecurityUserSchema = new mongoose.Schema(
    {
        idUser: {
            type: ObjectId,
            required: true,
            index: true
        }, 
        firstName: String,
        lastName: String
    },
    {
        _id: false
    }
);
