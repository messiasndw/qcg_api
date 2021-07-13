import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Company } from '../companies.model';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>,
    ){}

    async create({name}){
        const company = (await this.companyModel.create({name})).toJSON()
        company.id = company._id
        delete company._id
        return company
    }


}
