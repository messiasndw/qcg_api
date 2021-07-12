import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';
import { AuthUser } from 'src/users/user.decorator';
import { CompaniesService } from '../services/companies.service';
import { CompaniesUsersService } from '../services/companies.users.service';

@Controller('company/users')
@UseGuards(JwtAuthGuard)
export class CompaniesUsersController {

    constructor(
        private readonly companiesUsersService: CompaniesUsersService,
    ) { }

    @Get()
    async index(@Req() request){
        return await this.companiesUsersService.index(request)
    }

    @Post()
    async store(@Body() requestBody, @AuthUser() authUser) {
        const {user} = requestBody
        return await this.companiesUsersService.create(user,authUser)
    }

}
