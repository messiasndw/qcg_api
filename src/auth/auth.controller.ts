import { Controller, Post, Get, UseGuards, Body, Req, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-guard.guard';
import { AuthService } from './auth.service';
import { AuthUser } from 'src/users/user.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('login')
    login(@Body() requestBody): any{
        const {email, password} = requestBody
        return this.authService.login({email,password})
    }

    @Post('register')
    async register(@Body() {name,email,password}){
        return await this.authService.register({name,email,password})
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    profile(@AuthUser() user): any{
        return user
    }

}
