import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class GetDesksRequest{
    
    @IsOptional()
    @IsString()
    code: string

    @IsOptional()
    active: boolean

    @IsOptional()
    page: number
}