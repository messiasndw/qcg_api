import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DesksController } from './desks/desks.controller';
import { DesksModule } from './desks/desks.module';
import { KeysService } from './keys/keys.service';
import { KeysModule } from './keys/keys.module';
import { DatabaseModule } from './database/database.module';
import { CompaniesModule } from './companies/companies.module';
import { EventsModule } from './events/events.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    UsersModule,
    DesksModule,
    KeysModule,
    CompaniesModule,
    EventsModule,
    ],
  controllers: [],
  providers: [AppService],
})

export class AppModule { }