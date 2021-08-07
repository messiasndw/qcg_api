import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {Company, CompanySchema } from './companies.model';
import { CompaniesService } from './services/companies.service';
import { CompaniesController } from './controllers/companies.controller';
import { UsersModule } from 'src/users/users.module';
import { CompaniesUsersController } from './controllers/companies.users.controller';
import { CompaniesUsersService } from './services/companies.users.service';
import { User, UserSchema } from 'src/users/users.model';
import { Desk, DeskSchema } from 'src/desks/desk.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      {name: User.name, schema: UserSchema},
      {name: Desk.name, schema: DeskSchema}
    ]),
    UsersModule,
  ],
  providers: [CompaniesService, CompaniesUsersService],
  exports: [CompaniesService, CompaniesUsersService],
  controllers: [CompaniesController, CompaniesUsersController]
})
export class CompaniesModule { }
