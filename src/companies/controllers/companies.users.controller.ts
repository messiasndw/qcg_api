import { Body, Controller, Get, Post, UseGuards, Query, Put, Param, Delete } from '@nestjs/common';
import { AuthUserDto } from 'src/auth/dto/auth.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';
import { CreateUsersDto } from 'src/users/dto/create.users.dto';
import { GetUsersDto } from 'src/users/dto/get.users.dto';
import { UpdateUserDto } from 'src/users/dto/update.user.dto';
import { AuthUser } from 'src/users/user.decorator';
import { User } from 'src/users/users.model';
import { CompaniesUsersService } from '../services/companies.users.service';
@Controller('company/users')
@UseGuards(JwtAuthGuard)
export class CompaniesUsersController {

    constructor(
        private readonly companiesUsersService: CompaniesUsersService,
    ) { }

    @Post()
    async create(@Body() user : CreateUsersDto, @AuthUser() authUser: AuthUserDto) {
        return await this.companiesUsersService.create(user,authUser)
    }

    @Get()
    async getUsers(@Query() filter: GetUsersDto, @AuthUser() authUser: AuthUserDto): Promise<User[]> {
        return await this.companiesUsersService.getUsers({...filter, company: authUser.company.id})
    }

    @Get('all')
    async getAll(@AuthUser() authUser: AuthUserDto){
        return await this.companiesUsersService.getAllUsers(authUser.company.id)
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() fields : UpdateUserDto, @AuthUser() authUser: AuthUserDto) {
        return await this.companiesUsersService.updateUser({...fields, id})
    }

    @Put('desks/:id')
    async updateDesks(@Param('id') id: string, @Body() request : any, @AuthUser() authUser: AuthUserDto) {
        return await this.companiesUsersService.updateDesks({id, desks: request.data})
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @AuthUser() authUser: AuthUserDto){
        return await this.companiesUsersService.destroy(id)
    }

}
