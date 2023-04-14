import { Card } from "./card.interface";
import { UserInterface } from "./user.interface";

export interface DeckInterface {
  id: number,
  name: string,
  user: UserInterface,
  cards: Card[]
}
