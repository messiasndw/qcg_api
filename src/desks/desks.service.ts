import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Helper } from 'src/util/Helper';
import { Desk, DeskDocument } from './desk.model';
import { CreateDeskDto } from './dto/create.desk.dto';
import { GetDesksDto } from './dto/get.desks.dto';
import { UpdateDeskUsersDto } from './dto/update.users.dto';

@Injectable()
export class DesksService {

    constructor(
        @InjectModel(Desk.name) private readonly deskModel: Model<DeskDocument>,
        @InjectConnection() private readonly connection: Connection,
        private readonly usersService: UsersService) { }

    async create(desk: CreateDeskDto) {
        const data = await (await this.deskModel.create(desk)).populate('company').execPopulate()
        return { message: 'New desk created successfully!', data }
    }

    async getDesks(fields: GetDesksDto) {

        const PAGE_SIZE = 10
        const page = fields.page ? fields.page : 1
        const skip = (page == 1 ? 0 : (page - 1) * PAGE_SIZE)

        const filter = {
            code: { $regex: fields.code || '', $options: 'i' },
            company: fields.company,
            active: fields.active
        }

        Helper.removeUndefined(filter)

        const data = await this.deskModel.find(filter).populate('company')
            .limit(PAGE_SIZE)
            .skip(skip)
        const total = await this.deskModel.count(filter)

        return { message: `${data.length} desks fetched!`, data, total, page }
    }

    async update(desk){
        const {fields,id,company} = desk
        return await this.deskModel.updateOne({_id: id},{...fields})
    }

    async updateUsers(desk: UpdateDeskUsersDto) {
        const { id, users } = desk
        let updatedDesk
        let newUsers = []
        let removedUsers = []
        const session = await this.connection.startSession()
        await session.withTransaction(async (): Promise<any> => {

            const foundDesk = await this.deskModel.findById(id)

            newUsers = users.filter(user => (!foundDesk.users.includes(user)))
            removedUsers = foundDesk.users.filter((user) => (!users.includes(user)))

            foundDesk.users = users
            updatedDesk = await foundDesk.save()
            
            if(newUsers.length) await this.usersService.pushDesk({id,users:newUsers})
            if(removedUsers.length) await this.usersService.deleteDesk({id,users:removedUsers})

        })
        return { message: "Desk updated sucessfully!", data: updatedDesk, newUsers,removedUsers}
    }


}
