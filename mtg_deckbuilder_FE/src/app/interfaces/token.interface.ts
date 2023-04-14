import { DeckInterface } from "./deck.interface";
import { RolesInterface } from "./roles.interface";

export interface TokenInterface {
  token: string,
  type: string,
  id: number,
  username: string,
  name: string,
  email: string,
  roles: RolesInterface[],
  deck: DeckInterface[]
}
