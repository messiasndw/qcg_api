import { Injectable, MessageEvent } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KeyDocument } from './keys.model'
import { EventsGateway } from 'src/events/events.gateway';
import { CreateKeyDto } from './dto/create.key.dto';
import { DepartmentsService } from 'src/departments/departments.service';
import { Desk, DeskDocument } from 'src/desks/desk.model';

@Injectable()
export class KeysService {
    

    constructor(
    @InjectModel('Key') private readonly keyModel: Model<KeyDocument>,
    private readonly departmentService: DepartmentsService,
    private readonly eventsGateway: EventsGateway) { }



    async create(payload: CreateKeyDto){
        const {departmentId, authUser} = payload
        const {company} = authUser
        const department = await this.departmentService.getDepartment(departmentId)

        const data = await this.keyModel.create({
            department: departmentId, 
            company: company.id, 
            createdBy: authUser.id,
            prefix: `${department.name.toUpperCase().substring(0,4)}`
        })

        if(data){
            department.desks.forEach((desk: DeskDocument) => {
                if(desk.active == true){
                    const path = `${company.id}/${desk.id}`
                    this.eventsGateway.server.emit(path,{title:`DESK ${desk.code}`, description: `New KEY for ${department.name}`, data})
                }
            })
        }
        return {message: 'New key created!', data}
    }




}
