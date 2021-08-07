import { Company } from "src/companies/companies.model";

export type UpdateDepartmentsDto = {

    id: string
    departments: []
    company: Company
}