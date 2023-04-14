import { Injectable } from '@angular/core';
import { DeckInterface } from '../interfaces/deck.interface';

@Injectable({
  providedIn: 'root'
})
export class DeckSelectionService {
  private selectedDeck: DeckInterface;

  constructor() { }
  
  setSelectedDeck(deck: DeckInterface): void {
    this.selectedDeck = deck;
  }

  getSelectedDeck(): DeckInterface {
    return this.selectedDeck;
  }

  clearSelectedDeck(): void {
    this.selectedDeck = undefined;
  }
}
