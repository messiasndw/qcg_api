import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from 'src/companies/companies.module';
import { UserSchema } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
