import { Injectable, MessageEvent } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Key } from './keys.model'
import { interval, Observable, Subject } from 'rxjs';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class KeysService {
    

    constructor(@InjectModel('Key') private readonly keyModel: Model<Key>,
    private readonly eventsGateway: EventsGateway) { }



    async create({departmentId,authUser}){
        const {company, name, surename, email, _id, createdAt} = authUser
        const user = {name, surename, email, _id, createdAt}
        const data: any = await this.keyModel.create({departmentId, company, user})
        if(data){
            this.eventsGateway.server.emit(`${company._id}/keys/managment`,{message:`${name} ${surename} created a new key for ${data.department.name}`})
        }
        return {message: 'New key created!', data}
    }




}
