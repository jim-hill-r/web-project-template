import { UserService } from "../services/user-service"

export class ResolverBuilder
{
  private userService : UserService

  constructor(userService : UserService) {
    this.userService = userService;
  }

  Build() : any { 
    return {
      Query: {
        user: (id: string) => this.userService.user(id)
      }
    }
  }
};