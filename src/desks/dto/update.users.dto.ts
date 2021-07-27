import { Company, CompanyDocument } from "src/companies/companies.model";

export type UpdateDeskUsersDto = {

    id: string
    users: []
    company: Company
}