import { Body, Controller, Get, Query, Put, MessageEvent, Post, Res, Param, UseGuards, HttpCode } from '@nestjs/common';
import { AuthUserDto } from 'src/auth/dto/auth.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';
import { AuthUser } from 'src/users/user.decorator';
import { DesksService } from './desks.service';
import { CreateDeskRequest } from './request.validations/create.desk.request';
import { GetDesksRequest } from './request.validations/get.desks.request';
@Controller('desks')
@UseGuards(JwtAuthGuard)
export class DesksController {

    constructor(private readonly deskService: DesksService){}

    @Post()
    async create(@Body() desk: CreateDeskRequest, @AuthUser() authUser: AuthUserDto){
      return await this.deskService.create({...desk, company: authUser.company.id})
    }

    @Get()
    async getDesks(@Query() request: GetDesksRequest, @AuthUser() authUser: AuthUserDto){
      return this.deskService.getDesks({...request,company: authUser.company.id,})
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() request, @AuthUser() authUser: AuthUserDto){
      const {code,active} = request
      return await this.deskService.update({fields:{code,active},company: authUser.company, id})
      // return this.deskService.updateUsers({...request,company: authUser.company.id,})
    }

    @Post('users/:id')
    @HttpCode(200)
    async updateUsers(@Param('id') id: string, @Body() request, @AuthUser() authUser: AuthUserDto){
      return this.deskService.updateUsers({id,company: authUser.company, users: request.users})
      // return this.deskService.updateUsers({...request,company: authUser.company.id,})
    }

}
