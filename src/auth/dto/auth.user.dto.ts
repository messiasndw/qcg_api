import { CompanyDocument } from "src/companies/companies.model"

export class AuthUserDto{
    id: string
    name: string
    surename: string
    email: string
    password: string
    company: CompanyDocument
    photo: string
    createdBy: {}
}