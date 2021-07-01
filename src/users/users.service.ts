import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model'
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findByEmail(email: string): Promise<any | undefined> {
        // const x = this.userModel.create
        return await this.userModel.findOne({email})
    }


    async create(user: User): Promise<any | undefined> {
        const { password, ...rest } = user
        const hashedPassword = await bcrypt.hash(password, 10)
        await this.userModel.create({ ...rest, password: hashedPassword })
        return {message: 'New user created successfully!'}
    }

}
