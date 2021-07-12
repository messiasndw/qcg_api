import { Controller, Post } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';

@Controller('company')
export class CompaniesController {


    constructor(private readonly companiesService: CompaniesService){}

}
