import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class GetDepartmentsRequest{
    
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    createdAtInitial: string

    @IsOptional()
    @IsString()
    createdAtEnd: string

    @IsOptional()
    page: number
}