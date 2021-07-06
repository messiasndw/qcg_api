import { Injectable, MessageEvent } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Key } from './keys.model'
import { interval, Observable, Subject } from 'rxjs';

@Injectable()
export class KeysService {

    public events = new Subject()

    constructor(@InjectModel('Key') private readonly keyModel: Model<Key>) { }


    watchKeys(value){

        this.events.next(JSON.stringify(value))
    }

    async create({name,code}){
        console.log({name,code})
        const result = await this.keyModel.create({rua:"ae"})
        this.watchKeys(result.toJSON())
        return result
    }




}
