import { Company } from "src/companies/companies.model"

export class AuthUserDto{
    id: string
    name: string
    surename: string
    email: string
    password: string
    company: Company
    photo: string
    createdBy: {}
}