import { Controller, Post, Get, UseGuards, Body, Req, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-guard.guard';
import { AuthService } from './auth.service';
import { AuthUser } from 'src/users/user.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('login')
    login(@Request() request): any{
        return this.authService.login({name:"a", password:"b"})
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    profile(@AuthUser() user): any{
        return user
    }

}
