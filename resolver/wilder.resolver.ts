import { Resolver, Query, Mutation, Arg } from "type-graphql";
import WilderController from "../controller/Wilder";
import Wilder from "../entity/Wilder";

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async listWilders(): Promise<Wilder[]> {
    let wilders = await new WilderController().listWilders();
    return wilders;
  }
}
