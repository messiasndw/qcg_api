import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Key, KeySchema } from './keys.model';
import { KeysService } from './keys.service';
import { KeysController } from './keys.controller';
import { EventsModule } from 'src/events/events.module';
import { DepartmentsModule } from 'src/departments/departments.module';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Key.name, schema: KeySchema }]),
        EventsModule,
        DepartmentsModule
    ],
    providers: [KeysService],
    exports: [KeysService],
    controllers: [KeysController]
})
export class KeysModule {}
