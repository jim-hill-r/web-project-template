import { UserService } from "../user-service"
import { User } from "../../schema/user"

export class MockUserService implements UserService
{
    user(id:string): User {
        return {
            permissions: [ "all" ]
        }
    };
}