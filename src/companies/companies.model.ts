import * as mongoose from 'mongoose'

export const CompaniesSchema = new mongoose.Schema({
    name: String,
    updatedAt: {type: Date, select: false},
    __v: {type: Number, select: false}
}, {timestamps: true})

export interface Company{
    id: string
    name: string,
    createdAt: string,
    updatedAt: string,
}