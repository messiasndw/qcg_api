import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {

        const user = await this.usersService.findByEmail(email)

        if (user && user.password == password) {
            const { password, name } = user
            const id = user._id
            return { id, name }
        }
        return null
    }

    async login(user: any) {
        // const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign({id:"2"}),
        };
    }

}
