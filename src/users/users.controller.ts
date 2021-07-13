import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthUserDto } from 'src/auth/dto/auth.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';
import { UpdateUsersProfileDto } from './dto/update.users.profile.dto';
import { AuthUser } from './user.decorator';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    profile(@Body() user: UpdateUsersProfileDto, @AuthUser() authUser: AuthUserDto){
        return this.usersService.updateProfile({...user, id: authUser.id})
    }

}

