export type GetDesksDto = {
    code: string
    active: boolean,
    company: string,
    page?:number,
    createdAtInitial: string,
    createdAtEnd: string,
}