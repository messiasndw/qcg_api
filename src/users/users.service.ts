import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model'
import * as bcrypt from 'bcrypt'
import { CreateUsersDto } from './dto/create.users.dto';
import { GetMeDto } from './dto/get.me.dto';
import { GetUsersDto } from './dto/get.users.dto';
import { UpdateUsersProfileDto } from './dto/update.users.profile.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }

    async findByEmail(email: string): Promise<any | undefined> {
        return await this.userModel.findOne({ email })
    }

    async create(user : CreateUsersDto): Promise<any | undefined> {
        const { password, ...rest } = user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = (await this.userModel.create({ ...rest, password: hashedPassword })).toJSON()
        newUser.id = newUser._id
        delete newUser._id
        delete newUser.password
        delete newUser.__v
        return { message: 'New user created successfully!', user: newUser}

    }

    async me(id: GetMeDto) {
        const me = (await this.userModel.findById(id)).toJSON();
        me.id = me._id
        delete me._id
        return me
    }

    async updateProfile(user : UpdateUsersProfileDto) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
        }
        const updatedData = await this.userModel.updateOne({ _id: user.id }, { ...user })
        return {message: 'Profile Updated!' }
    }

    async getUsers(filter: GetUsersDto) {
        const { name, surename, email } = filter
        const user = {
            name: { $regex: name || '', $options: 'i' },
            surename: { $regex: surename || '', $options: 'i' },
            email: { $regex: email || '', $options: 'i' },
            'company.name': 'MESSIASNDW'
        }
        const users = await this.userModel.find().exec()
        return users.map((user) => {
            const userJson = user.toJSON()
            userJson.id = user._id
            delete userJson._id
            return {...userJson}
        })
    }

}
