import { Body, Controller, Post, UseGuards, Sse } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';
import { KeysService } from './keys.service';

@Controller('keys')
export class KeysController {


    constructor(private readonly keysService: KeysService){}

    // @UseGuards(JwtAuthGuard)
    @Post('store')
    async store(@Body() requestBody){
        const {name,code} = requestBody
        return await this.keysService.create({name,code})
    }
    @Sse('sse')
    sse() {
      return this.keysService.events.asObservable()
    }

}
