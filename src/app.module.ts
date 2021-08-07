import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DesksModule } from './desks/desks.module';
import { KeysModule } from './keys/keys.module';
import { CompaniesModule } from './companies/companies.module';
import { EventsModule } from './events/events.module';
import { DepartmentsModule } from './departments/departments.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    CompaniesModule,
    UsersModule,
    AuthModule,
    DesksModule,
    KeysModule,
    EventsModule,
    DepartmentsModule,
    ],
  controllers: [],
  providers: [AppService],
})

export class AppModule { }