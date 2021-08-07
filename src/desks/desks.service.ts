import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Department, DepartmentDocument } from 'src/departments/department.model';
import { UsersService } from 'src/users/users.service';
import { Helper } from 'src/util/Helper';
import { Desk, DeskDocument } from './desk.model';
import { CreateDeskDto } from './dto/create.desk.dto';
import { GetDesksDto } from './dto/get.desks.dto';
import { UpdateDepartmentsDto } from './dto/update.departments.dto';
import { UpdateDeskUsersDto } from './dto/update.users.dto';

@Injectable()
export class DesksService {

    constructor(
        @InjectModel(Desk.name) private readonly deskModel: Model<DeskDocument>,
        @InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>,
        @InjectConnection() private readonly connection: Connection,
        private readonly usersService: UsersService) { }

    async create(desk: CreateDeskDto) {
        const data = await (await this.deskModel.create(desk)).populate('company').execPopulate()
        return { message: 'New desk created successfully!', data }
    }

    async getPaginated(fields: GetDesksDto) {

        const PAGE_SIZE = 10
        const page = fields.page ? fields.page : 1
        const skip = (page == 1 ? 0 : (page - 1) * PAGE_SIZE)

        const filter = {
            code: { $regex: fields.code || '', $options: 'i' },
            company: fields.company,
            active: fields.active,
            createdAt: {
                $gte: fields.createdAtInitial ? new Date(fields.createdAtInitial) : new Date('01-01-2000'),
                $lte: fields.createdAtEnd ? new Date(new Date(fields.createdAtEnd).setHours(23,59,59)) : new Date(new Date().setHours(23,59,59))
            }
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

    async updateDepartments(desk: UpdateDepartmentsDto) {
        const { id, departments } = desk
        let updatedDesk
        let newData = []
        let removedData = []
        const session = await this.connection.startSession()
        await session.withTransaction(async (): Promise<any> => {

            const foundDesk = await this.deskModel.findById(id)

            newData = departments.filter(department => (!foundDesk.departments.includes(department)))
            removedData = foundDesk.departments.filter((department) => (!departments.includes(department)))

            foundDesk.departments = departments
            updatedDesk = await foundDesk.save()
            
            if(newData.length) await this.departmentModel.updateMany({_id:{$in: newData}},{$push:{desks: id}})
            if(removedData.length) await this.departmentModel.updateMany({_id:{$in: removedData}},{$pull:{desks: id}})

        })
        return { message: "Desk updated sucessfully!", data: updatedDesk, newData,removedData}
    }

    async getAll(companyId: string){
        const desks = await this.deskModel.find({company:companyId})
        return {message: `${desks.length} desks found!`, data: desks}
    }

    async destroy(id){
        const desk = await this.deskModel.findOne({_id: id})
        await desk.deleteOne()
        return {message: 'Desk deleted successfully!', data: desk}
    }
}
