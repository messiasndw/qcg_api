import * as mongoose from 'mongoose'

const mongooseTypes = mongoose.Types

export const DeskSchema = new mongoose.Schema({
    name: String,
    code: String,
})

export interface Desk {
    name: string,
    code: string
}

