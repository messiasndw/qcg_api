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

        const PAGE_SIZE = 10
        const { name, surename, email, company, active, page } = filter
        const skip = (page == '1' ? 0 : (parseInt(page)-1)* PAGE_SIZE)
        
        // FILTER QUERY
        const customFilter = {
            name: { $regex: name || '', $options: 'i' },
            surename: { $regex: surename || '', $options: 'i' },
            email: { $regex: email || '', $options: 'i' },
            company,
            active
        }

        //REMOVING UNDEFINED AND NULL VALUES FROM THE FILTER
        for (const key in customFilter) {
            if (customFilter[key] === undefined || customFilter === null) {
                delete customFilter[key]
            }
        }

        const users =  await this.userModel.find({...customFilter})
        .populate('company')
        .limit(PAGE_SIZE)
        .skip(skip)
        const total = await this.userModel.count({...customFilter})
        
        return {message: `${users.length} users fetched for page ${page}`, data: users, total:total.toString(), page}
    }

    async updateUser(fields){
        if (fields.password) {
            fields.password = await bcrypt.hash(fields.password, 10)
        }
        const updatedData = await this.userModel.updateOne({ _id: fields.id }, { ...fields })
        const me = await this.me(fields.id)
    }

}
