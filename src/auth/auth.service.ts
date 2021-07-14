import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { CompaniesService } from 'src/companies/services/companies.service';
import { Connection, Model, startSession } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
@Injectable()

export class AuthService {

    constructor(
        @InjectConnection() private connection: Connection,
        private usersService: UsersService,
        private jwtService: JwtService,
        private companiesService: CompaniesService
    ) { }

    async validateUser(credentials): Promise<any> {
        const { email, password } = credentials
        const user = await this.usersService.findUserByEmail(email)
        if (user) {
            if (await bcrypt.compare(password, user.password)) return user.toJSON()
        }
        throw new UnauthorizedException('Incorrect email or password')
    }

    async register(user) {
        const session = await this.connection.startSession()
        const {companyName, name, surename, password, email} = user
        await session.withTransaction(async (): Promise<any>  => {
            const company = await this.companiesService.create({name: companyName})
            await this.usersService.create({company: company.id, password, email, name, surename})
        })
        return {message: 'Registration completed!'}
    }

    async login(credentials) {
        const {email, name, password, companyName} = credentials
        const { id } = await this.validateUser({email,password})
        return {
            access_token: this.jwtService.sign({ id }),
        };

    }

}
