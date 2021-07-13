import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: String,
    surename: String,
    email: String,
    password: {type: String, select: false},
    active: { type: Boolean, default: 0 },
    photo: { type: String, default: null },
    company: { type: { name: String, _id: String, createdAt: Date, updatedAt: Date }, default: null },
    createdBy: {type: {}, default: null},
    __v: {type: Number, select: false}
}, { timestamps: true, id: true })
export interface User {
    id: string,
    name: string,
    surename: string,
    email: string,
    password: string,
    company: object,
    photo?: string,
    createdBy?: {}
}