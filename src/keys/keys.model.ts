import * as mongoose from 'mongoose'

const mongooseTypes = mongoose.Types

export const KeySchema = new mongoose.Schema({
    created_at: Date,
    updated_at: Date,
    company_id: String,
    user_id: String,
    keys: { type: Array, default: [] },
})

export interface Key {
    created_at: string,
    updated_at: string,
    company_id: string,
    user_id: string,
    keys: any
}

