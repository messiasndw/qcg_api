import * as mongoose from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type DeskDocument = Desk & mongoose.Document
@Schema({ toJSON: { virtuals: true, versionKey: false}, timestamps: true, })
export class Desk {
    @Prop()
    code: string;

    @Prop({ default: false })
    active: boolean;

    @Prop({ default: null, select: true, type: mongoose.Types.ObjectId , ref: 'Company'})
    company: string

    @Prop({ default: [], select: true, type: [] , ref: 'User'})
    users: []

    @Prop({ default: [], select: true, type: [] , ref: 'Department'})
    departments: []

    @Prop({default: null, type: {}})
    createdBy: {}
}

export const DeskSchema = SchemaFactory.createForClass(Desk)
