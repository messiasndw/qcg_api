import { Injectable } from '@nestjs/common';

export type User = any

@Injectable()
export class UsersService {


    async findByEmail(email: string): Promise<User | undefined> {
        return {email: 'nadiow@gmail.com', password: '123'}
    }

}
