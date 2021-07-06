import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { Company } from './companies.model';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>
    ){}

    async create({name}){
        return await this.companyModel.create({name})
    }


}
