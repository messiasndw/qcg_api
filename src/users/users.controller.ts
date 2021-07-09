import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';
import { AuthUser } from './user.decorator';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    profile(@Body() body, @AuthUser() authUser){
        return this.usersService.updateProfile(authUser.id,body)
    }

}

