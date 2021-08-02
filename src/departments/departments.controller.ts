import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthUserDto } from 'src/auth/dto/auth.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';
import { AuthUser } from 'src/users/user.decorator';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentRequest } from './request.validation/create.department.request';
import { GetDepartmentsRequest } from './request.validation/get.departments.request';
import { UpdateDepartmentRequest } from './request.validation/update.department.request';

@Controller('departments')
@UseGuards(JwtAuthGuard)
export class DepartmentsController {

    constructor(private readonly departmentsService: DepartmentsService){}

    @Post()
    async create(@Body() department: CreateDepartmentRequest, @AuthUser() authUser: AuthUserDto){
        return await this.departmentsService.store({...department,company: authUser.company.id})
    }

    @Get()
    async get(@Query() department: GetDepartmentsRequest, @AuthUser() authUser: AuthUserDto){
        return await this.departmentsService.getPaginated({...department, company: authUser.company.id})
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() request: UpdateDepartmentRequest){
        return await this.departmentsService.update({fields: {...request}, id})
    }

    @Post('desks/:id')
    async updateDesks(@Param('id') id: string, @Body() request){
        const {data} = request
        return await this.departmentsService.updateDesks({id,desks: data})
    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return await this.departmentsService.destroy(id)
    }
}
