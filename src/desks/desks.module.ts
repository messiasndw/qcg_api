import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from 'src/departments/department.model';
import { UsersModule } from 'src/users/users.module';
import { DeskSchema, Desk } from './desk.model';
import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';

@Module({
  providers: [DesksService],
  controllers: [DesksController],
  imports:[
    UsersModule,
    MongooseModule.forFeature([
      {name: Desk.name, schema: DeskSchema}, {name:Department.name, schema: DepartmentSchema},
    ]),
  ],
})
export class DesksModule {}
