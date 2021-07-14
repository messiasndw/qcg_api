import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../companies.model';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>,
    ){}

    async create({name}){
        return await this.companyModel.create({name})
        
    }


}
