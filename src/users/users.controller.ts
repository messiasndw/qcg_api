import { Controller, Get } from '@nestjs/common';
import { AuthUser } from './user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get('profile')
    profile(@AuthUser() user){
        return user
    }

}

