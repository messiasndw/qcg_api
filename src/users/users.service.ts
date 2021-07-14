import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { UserDocument } from './users.model'
import * as bcrypt from 'bcrypt'
import { CreateUsersDto } from './dto/create.users.dto';
import { GetUsersDto } from './dto/get.users.dto';
import { UpdateUsersProfileDto } from './dto/update.users.profile.dto';
import * as mongoose from 'mongoose'

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) { }

    async findUserByEmail(email: string): Promise<any | undefined> {
        return await this.userModel.findOne({ email }).select('+password')
    }

    async create(user: CreateUsersDto): Promise<any | undefined> {
        const { password, ...rest } = user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await this.userModel.create({ ...rest, password: hashedPassword })
        return { message: 'New user created successfully!', data: newUser }
    }

    async me(id: string) {
        return (await this.userModel.findById(id).populate('company'))
    }

    async updateProfile(user: UpdateUsersProfileDto) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
        }
        const updatedData = await this.userModel.updateOne({ _id: user.id }, { ...user })
        const me = await this.me(user.id)
        return { message: 'Profile Updated!', data: me }
    }

    async getUsers(filter: GetUsersDto) {
        const { name, surename, email, company } = filter
        const customFilter = {
            name: { $regex: name || '', $options: 'i' },
            surename: { $regex: surename || '', $options: 'i' },
            email: { $regex: email || '', $options: 'i' },
            company
        }
        const users =  await this.userModel.find({...customFilter}).populate('company')
        return {message: `${users.length} users found`, data: users}
    }

}
