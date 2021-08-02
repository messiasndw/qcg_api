import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"

export class UpdateDepartmentRequest{
    
    @IsNotEmpty()
    @IsString()
    @Length(3,11)
    name: string
}