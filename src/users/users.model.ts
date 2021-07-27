import * as mongoose from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Company } from "src/companies/companies.model";

export type UserDocument = User & mongoose.Document
@Schema({ toJSON: { virtuals: true, versionKey: false}, timestamps: true, })
export class User {
    @Prop()
    name: string;

    @Prop()
    surename: string;

    @Prop()
    email: string;

    @Prop({select: false})
    password: string;

    @Prop({ default: false })
    active: boolean;

    @Prop({ default: null })
    photo: string;

    @Prop({ default: null, select: true, type: mongoose.Types.ObjectId , ref: 'Company'})
    company: string

    @Prop({default: null, type: {}})
    createdBy: {}

    @Prop({default: [], type: [], ref: 'Desk'})
    desks: []
}

export const UserSchema = SchemaFactory.createForClass(User)
