import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator"


export class CreateDeskRequest{
    

    @IsString()
    @IsNotEmpty()
    readonly code: string

    @IsIn([1,0])
    readonly active:  boolean
}