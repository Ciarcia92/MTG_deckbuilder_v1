import { DeckInterface } from "./deck.interface";
import { RolesInterface } from "./roles.interface";

export interface UserInterface {

  id:number,
  name: string,
  username: string,
  email: string,
  deck: DeckInterface[],
  role: RolesInterface[]
}
