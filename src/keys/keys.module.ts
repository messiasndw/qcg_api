import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeySchema } from './keys.model';
import { KeysService } from './keys.service';
import { KeysController } from './keys.controller';

@Module({
    imports:[MongooseModule.forFeature([{name: 'Key', schema: KeySchema}])],
    providers: [KeysService],
    exports: [KeysService],
    controllers: [KeysController]
})
export class KeysModule {}
