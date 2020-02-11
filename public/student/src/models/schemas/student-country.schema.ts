import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb'
 
export const StudentCountrySchema = new mongoose.Schema(
    {
        idCountry: {
            type: ObjectId, 
            required: true,
        }, 
        name: String 
    },
    {
        _id: false
    }
);
