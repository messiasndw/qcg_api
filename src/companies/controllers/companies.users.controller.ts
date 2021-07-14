import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { AuthUserDto } from 'src/auth/dto/auth.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';
import { CreateUsersDto } from 'src/users/dto/create.users.dto';
import { GetUsersDto } from 'src/users/dto/get.users.dto';
import { AuthUser } from 'src/users/user.decorator';
import { User } from 'src/users/users.model';
import { CompaniesUsersService } from '../services/companies.users.service';
@Controller('company/users')
@UseGuards(JwtAuthGuard)
export class CompaniesUsersController {

    constructor(
        private readonly companiesUsersService: CompaniesUsersService,
    ) { }

    @Get()
    async getUsers(@Query() filter: GetUsersDto, @AuthUser() authUser: AuthUserDto): Promise<User[]> {
        return await this.companiesUsersService.getUsers({...filter, company: authUser.company.id})
    }

    @Post()
    async create(@Body() user : CreateUsersDto, @AuthUser() authUser: AuthUserDto) {
        return await this.companiesUsersService.create(user,authUser)
    }

}
