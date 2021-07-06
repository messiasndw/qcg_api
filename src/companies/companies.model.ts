import * as mongoose from 'mongoose'

export const CompaniesSchema = new mongoose.Schema({
    name: String,
}, {timestamps: true})

export interface Company{
    id: string
    name: string,
}