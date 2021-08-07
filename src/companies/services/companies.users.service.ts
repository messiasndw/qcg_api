import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserDto } from 'src/auth/dto/auth.user.dto';
import { Desk, DeskDocument } from 'src/desks/desk.model';
import { CreateUsersDto } from 'src/users/dto/create.users.dto';
import { GetUsersDto } from 'src/users/dto/get.users.dto';
import { User, UserDocument } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import {  Company, CompanyDocument } from '../companies.model';
import { CompaniesUsersUpdateDesksDto } from '../dto/update.companies.users.desk.dto';

@Injectable()
export class CompaniesUsersService {

    constructor(
        @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Desk.name) private readonly deskModel: Model<DeskDocument>,
        private readonly usersService: UsersService
    ) { }

    async getUsers(filter: GetUsersDto): Promise<any> {
        return await this.usersService.getUsers(filter)
    }

    async create(user : CreateUsersDto, authUser: AuthUserDto){
        const newUserByCompany = {
            ...user,
            company: authUser.company.id,
        }
        return await this.usersService.create(newUserByCompany)
    }

    async updateUser(fields){
        return await this.usersService.updateUser(fields)
    }

    async updateDesks(user : CompaniesUsersUpdateDesksDto){
        const {id, desks} = user

        const foundUser = await this.userModel.findById(id)

        const newDesks = desks.filter(desk => !foundUser.desks.includes(desk))
        const removedDesks = foundUser.desks.filter(desk => !desks.includes(desk))

        foundUser.desks = desks
        await foundUser.save()

        if(newDesks.length) await this.deskModel.updateMany({_id:{$in:newDesks}},{$push:{users:id}})
        if(removedDesks.length) await this.deskModel.updateMany({_id:{$in:removedDesks}},{$pull:{users:id}})

        return {message: 'Desks updated successfully', data: foundUser}
    }

    async destroy(id: string){
        const user = await this.userModel.findOne({_id: id})
        await user.deleteOne()
        return {message: 'User deleted successfully!', data: user}
    }

    async getAllUsers(companyId: string){
        return await this.usersService.getAllUsers(companyId)
    }

}
