import { IsEmail, IsNotEmpty, IsOptional, Length, Min } from "class-validator"

export class UpdateUsersProfileDto {

    id: string

    name?: string

    surename?: string

    @IsEmail()
    email?: string

    @IsOptional()
    @Length(3,14)
    password?: string
}