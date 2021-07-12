import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Company } from '../companies.model';

@Injectable()
export class CompaniesUsersService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>,
        private readonly usersService: UsersService
    ) { }

    async index(filter) {
        return await this.usersService.find({filter})
    }

    async create(user, authUser) {
        const {company, name, surename, _id, email} = authUser
        const newUserByCompany = {
            ...user,
            company: company,
            createdBy: {company, name, surename, _id, email} 
        }
        return await this.usersService.create(newUserByCompany)
    }


}
