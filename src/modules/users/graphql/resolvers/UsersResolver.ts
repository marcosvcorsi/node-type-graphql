import { Query, Resolver } from "type-graphql";

@Resolver()
export class UsersResolver {
  private users = ["a", "b", "c"];

  @Query(() => [String])
  async getUsers() {
    return this.users;
  }
}
