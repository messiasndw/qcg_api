import * as mongoose from 'mongoose'
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type CompanyDocument = Company & mongoose.Document
@Schema({ toJSON: { virtuals: true, versionKey: false}, timestamps: true, })
export class Company {
    @Prop()
    name: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company)
