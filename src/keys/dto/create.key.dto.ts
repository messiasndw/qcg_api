import { AuthUserDto } from "src/auth/dto/auth.user.dto";

export type CreateKeyDto = {
    departmentId: string,
    authUser: AuthUserDto
}