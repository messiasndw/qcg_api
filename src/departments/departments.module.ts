import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Desk, DeskSchema } from 'src/desks/desk.model';
import { Department, DepartmentSchema } from './department.model';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Department.name, schema: DepartmentSchema}, 
      {name: Desk.name, schema: DeskSchema}])
    ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
