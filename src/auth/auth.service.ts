import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
@Injectable()

export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(credentials): Promise<any> {
        const { email, password } = credentials
        const user = await this.usersService.findByEmail(email)
        if (user) {
            if (await bcrypt.compare(password, user.password)) return user
        }
        throw new UnauthorizedException('Incorrect email or password')
    }

    async register(user) {
        return await this.usersService.create(user)
    }

    async login(credentials) {

        const { id, name } = await this.validateUser(credentials)

        return {
            access_token: this.jwtService.sign({ id, name }),
        };

    }

}
