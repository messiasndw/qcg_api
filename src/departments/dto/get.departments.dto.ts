export type GetDepartmentsDto = {
    name: string
    company: string,
    page?:number,
    createdAtInitial: string,
    createdAtEnd: string
}