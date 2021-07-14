import {IsEmail, IsNotEmpty, IsOptional, Length} from "class-validator"


export class CreateUsersDto{

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    surename: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @Length(3,14)
    password: string

    company:{}
}