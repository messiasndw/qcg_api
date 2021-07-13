import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserDto } from 'src/auth/dto/auth.user.dto';
import { CreateUsersDto } from 'src/users/dto/create.users.dto';
import { GetUsersDto } from 'src/users/dto/get.users.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { Company } from '../companies.model';

@Injectable()
export class CompaniesUsersService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>,
        private readonly usersService: UsersService
    ) { }

    async getUsers(filter: GetUsersDto): Promise<User[]> {
        return await this.usersService.getUsers(filter)
    }

    async create(user : CreateUsersDto, authUser: AuthUserDto){
        const {company, name, surename, id, email} = authUser
        const newUserByCompany = {
            ...user,
            company: company,
            createdBy: {name, surename, id, email} 
        }
        return await this.usersService.create(newUserByCompany)
    }


}
