import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserDto } from 'src/auth/dto/auth.user.dto';
import { CreateUsersDto } from 'src/users/dto/create.users.dto';
import { GetUsersDto } from 'src/users/dto/get.users.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import {  Company, CompanyDocument } from '../companies.model';

@Injectable()
export class CompaniesUsersService {

    constructor(
        @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>,
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


}
