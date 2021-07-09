import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model'
import * as bcrypt from 'bcrypt'
import { AuthUser } from './user.decorator';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }

    async findByEmail(email: string): Promise<any | undefined> {
        return await this.userModel.findOne({email})
    }


    async create(user: User): Promise<any | undefined> {
        const { password, ...rest } = user
        const hashedPassword = await bcrypt.hash(password, 10)
        await this.userModel.create({ ...rest, password: hashedPassword })
        return {message: 'New user created successfully!'}
    }

    async me(id){
        return await this.userModel.findById(id);
    }

    async updateProfile(userId,fields){
        if (fields.password) {
            fields.password = await bcrypt.hash(fields.password, 10)

        }
        const updatedData = await this.userModel.findByIdAndUpdate({_id:userId},{...fields})
        return {updatedData, message: 'Profile Updated!'}
    }

}
