import * as mongoose from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type DepartmentDocument = Department & mongoose.Document
@Schema({ toJSON: { virtuals: true, versionKey: false}, timestamps: true, })
export class Department {
    @Prop()
    name: string;

    @Prop({ default: null, select: true, type: mongoose.Types.ObjectId , ref: 'Company'})
    company: string

    @Prop({ default: null, select: true, type: [] , ref: 'Desk'})
    desks: []

    @Prop({default: null, type: {}})
    createdBy: {}

}

export const DepartmentSchema = SchemaFactory.createForClass(Department)

DepartmentSchema.pre('deleteOne',{ document: true, query: false }, async function(next) {
    await this.model('Desk').updateMany({_id:{$in:this['desks'] as keyof DepartmentDocument}},{$pull: {departments: this._id.toString()}})
})