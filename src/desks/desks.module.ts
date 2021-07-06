import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeskSchema } from './desk.model';
import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';

@Module({
  providers: [DesksService],
  controllers: [DesksController],
  imports:[
    MongooseModule.forFeature([{name: 'Desk', schema: DeskSchema}]),
  ],
})
export class DesksModule {}
