import { Controller, Post, Get, UseGuards, Body, Req, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-guard.guard';
import { AuthService } from './auth.service';
import { AuthUser } from 'src/users/user.decorator';
import { EventsGateway } from 'src/events/events.gateway';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,
        private readonly eventsService: EventsGateway) { }

    @Post('login')
    login(@Body() requestBody): any {
        const { email, password } = requestBody
        return this.authService.login({ email, password })
    }

    @Post('asas')
    asas(@Body() requestBody): any {
        const { email, password } = requestBody
        this.eventsService.server.emit('call','enviando call asas')
        return 'a'
    }

    @Post('register')
    async register(@Body() { name, surename, email, password, companyName }) {
        
        return await this.authService.register({ name, surename, email, password, companyName })
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    profile(@AuthUser() user): any {
        return user
    }

    @UseGuards(JwtAuthGuard)
    @Post('me')
    me(@AuthUser() user): any {
        return user
    }

}
