import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING)],
  controllers: [AppController, UsersController],
  providers: [AppService],
})

export class AppModule { }