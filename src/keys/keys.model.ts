import * as mongoose from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type KeyDocument = Key & mongoose.Document
@Schema({ toJSON: { virtuals: true, versionKey: false}, timestamps: true, })
export class Key {
    @Prop({ default: null, type: Number})
    code: number;

    @Prop({ default: null, type: String})
    prefix: string;

    @Prop({ default: null, select: true, type: mongoose.Types.ObjectId , ref: 'Company'})
    company: string

    @Prop({ default: null, select: true, type: String , ref: 'Department'})
    department: string

    @Prop({default: 'free', type: String})
    status: {}

    @Prop({default: null, type: {}})
    createdBy: {}
}

export const KeySchema = SchemaFactory.createForClass(Key)


KeySchema.pre('save',{ document: true, query: false },async function(next) {
    console.log(this['prefix'] as keyof KeyDocument)
    const total = await this.model('Key').countDocuments({prefix: this['prefix'] as keyof KeyDocument})
    this['code'] = total+1
})