import { Controller, Get, MessageEvent, Post, Res, Sse } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject} from 'rxjs';

import {Desk} from './desk.model'

@Controller('desks')
export class DesksController {

    constructor(@InjectModel('Desk') private readonly deskModel: Model<Desk>){}

    private sub = new Subject()

    // constructor(private readonly userService: UsersService){}

    @Post('gg')
    g(){
      return {value: 1, name: 'g'}
    }

    @Sse('sse')
    sse() {
      return this.sub.asObservable()
    }

}
