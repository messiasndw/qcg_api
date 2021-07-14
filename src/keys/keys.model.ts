import * as mongoose from 'mongoose'
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

const mongooseTypes = mongoose.Types

export const KeySchema = new mongoose.Schema({
    company: {},
    user: {},
    department:{type:{},default:{name:'Pediatry',prefix:'PE'}}
},{timestamps: true})

export interface Key {
    created_at: string,
    updated_at: string,
    company: {},
    user: {},
}
