import { Body, Controller, Post, UseGuards, Sse } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';
import { AuthUser } from 'src/users/user.decorator';
import { KeysService } from './keys.service';

@Controller('keys')
export class KeysController {


    constructor(private readonly keysService: KeysService){}

    @UseGuards(JwtAuthGuard)
    @Post('store')
    async store(@Body() requestBody: any, @AuthUser() authUser){
        const {department} = requestBody
        return await this.keysService.create({departmentId: department,authUser})
    }


}
