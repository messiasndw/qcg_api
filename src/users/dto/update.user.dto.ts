import { IsIn, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {
    
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    surename?: string

    @IsOptional()
    @IsString()
    email?: string

    @IsOptional()
    @IsIn(['1','0'])
    active?: boolean

    company: string
}