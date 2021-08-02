import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desk, DeskDocument } from 'src/desks/desk.model';
import { Helper } from 'src/util/Helper';
import { Department, DepartmentDocument } from './department.model';
import { CreateDepartmentDto } from './dto/create.department.dto';
import { GetDepartmentsDto } from './dto/get.departments.dto';
import { UpdateDepartmentDto } from './dto/update.department.dto';

@Injectable()
export class DepartmentsService {

    constructor(
        @InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>,
        @InjectModel(Desk.name) private readonly deskModel: Model<DeskDocument>
    ){}

    async store(department: CreateDepartmentDto){
        const {company, name} = department
        return await this.departmentModel.create({company,name})
    }

    async getPaginated(fields: GetDepartmentsDto){
        const PAGE_SIZE = 10
        const page = fields.page ? fields.page : 1
        const skip = (page == 1 ? 0 : (page - 1) * PAGE_SIZE)

        const filter = {
            name: { $regex: fields.name || '', $options: 'i' },
            company: fields.company,
            createdAt: {
                $gte: fields.createdAtInitial ? new Date(fields.createdAtInitial) : new Date('01-01-2000'),
                $lte: fields.createdAtEnd ? new Date(fields.createdAtEnd) : new Date()
            }
            
        }

        Helper.removeUndefined(filter)

        const data = await this.departmentModel.find(filter)
            .populate('company')
            .limit(PAGE_SIZE)
            .skip(skip)
        const total = await this.departmentModel.count(filter)

        return { message: `${data.length} departments fetched!`, data, total, page}
    }

    async update(department: UpdateDepartmentDto){
        const {id,fields} = department
        let dep = await this.departmentModel.findById(id)
        for (const field in fields) {
            dep[field] = fields[field];
        }
        await dep.save()
        return {msg: 'Department updated successfully!', data: dep}  
    }

    async updateDesks(department: {id: string,desks: []}){
        
        const {id, desks} = department

        const foundDepartment = await this.departmentModel.findById(id)

        const newDesks = desks.filter(desk => !foundDepartment.desks.includes(desk))
        const removedDesks = foundDepartment.desks.filter(desk => !desks.includes(desk))

        foundDepartment.desks = desks
        await foundDepartment.save()

        if(newDesks.length) await this.deskModel.updateMany({_id:{$in:newDesks}},{$push:{departments:id}})
        if(removedDesks.length) await this.deskModel.updateMany({_id:{$in:removedDesks}},{$pull:{departments:id}})

        return {newDesks, removedDesks}
    }

    async destroy(id){
        const department = await this.departmentModel.findOne({_id: id})
        await department.deleteOne()
        return {message: 'Department deleted successfully!', data: department}
    }
    

}
