import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class GetDesksRequest{
    
    @IsOptional()
    @IsString()
    code: string

    @IsOptional()
    active: boolean

    @IsOptional()
    @IsString()
    createdAtInitial: string

    @IsOptional()
    @IsString()
    createdAtEnd: string

    @IsOptional()
    page: number
}