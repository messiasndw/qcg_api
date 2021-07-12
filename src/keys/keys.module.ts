import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeySchema } from './keys.model';
import { KeysService } from './keys.service';
import { KeysController } from './keys.controller';
import { EventsModule } from 'src/events/events.module';
import { UsersModule } from 'src/users/users.module';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Key', schema: KeySchema }]),
        EventsModule,
    ],
    providers: [KeysService],
    exports: [KeysService],
    controllers: [KeysController]
})
export class KeysModule { }
