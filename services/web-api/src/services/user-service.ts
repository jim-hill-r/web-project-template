import { User } from "../schema/user"

export interface UserService {
    user(id:string): User
}