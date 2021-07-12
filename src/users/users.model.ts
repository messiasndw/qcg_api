import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: String,
    surename: String,
    email: String,
    password: String,
    active: { type: Boolean, default: 0 },
    photo: { type: String, default: null },
    company: { type: { name: String, _id: String, createdAt: Date, updatedAt: Date }, default: null }
}, { timestamps: true })

export interface User {
    name: string,
    surename: string,
    email: string,
    password: string,
    company: object,
    photo: string
}