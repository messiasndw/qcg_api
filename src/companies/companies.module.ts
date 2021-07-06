import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { CompaniesSchema } from './companies.model';
import { CompaniesService } from './companies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompaniesSchema }]),
  ],
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule { }
