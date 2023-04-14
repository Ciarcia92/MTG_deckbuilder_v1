import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/interfaces/card.interface';
import { DeckInterface } from 'src/app/interfaces/deck.interface';
import { DeckSelectionService } from 'src/app/services/deck-selection.service';
import { DeckService } from 'src/app/services/deck.service';
import { SelectedCard } from '../../interfaces/selected-card';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss'],
})
export class DeckListComponent implements OnInit {
  decks: DeckInterface[];
  private subscription: Subscription;
  selectedDeck: DeckInterface;
  deckCards: SelectedCard[];

  artifacts: Card[];
  creatures: Card[];
  enchantments: Card[];
  instants: Card[];
  sorceries: Card[];
  planeswalkers: Card[];
  lands: Card[];

  constructor(
    public deckSrv: DeckService,
    private deckSelectionSrv: DeckSelectionService
  ) {}

  ngOnInit(): void {
    this.subscription = this.deckSrv.decks$.subscribe((decks) => {
      this.decks = decks;
    });
    this.deckSrv.getUsersDeck().subscribe();
  }

  getCards(id: number): void {
    this.deckSrv.getDeckById(id).subscribe((deck) => {
      this.selectedDeck = deck;

      this.artifacts = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Artifact')
      );
      console.log(this.artifacts);

      this.creatures = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Creature')
      );

      this.enchantments = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Enchantment')
      );
      this.instants = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Instant')
      );
      this.sorceries = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Sorcery')
      );
      this.planeswalkers = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Planeswalker')
      );
      this.lands = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Land')
      );
    });

    // SEPARA LE CARD IN BASE AL TIPO MA NON FUNZIONA
    // this.artifact = this.deckCards.filter(
    //   (card) => card.type_line && card.type_line.includes('Artifact')
    // );
    // this.creature = this.deckCards.filter(
    //   (card) => card.type_line && card.type_line.includes('creature')
    // );
    // console.log(this.creature);

    // this.artifact = this.deckCards.filter(card => card.type_line.includes('Artifact'));
    //     this.groupedCards = {
    //   ['artifact']: this.deckCards.filter(card => card.type_line.includes('Artifact')),
    //   ['creature']: this.deckCards.filter(card => card.type_line.includes('Creature')),
    //   ['enchantment']: this.deckCards.filter(card => card.type_line.includes('Enchantment')),
    //   ['instant']: this.deckCards.filter(card => card.type_line.includes('Instant')),
    // };
  }

  // onDeleteDeck(id: number, e: Event) {
  //   this.deckSrv.deleteUsersDeck(id).subscribe({
  //     next: (message) => {
  //       console.log(message);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  //   window.location.reload();
  //   e.stopPropagation();
  //   e.stopImmediatePropagation();
  // }

  onDeleteDeck(id: number, e: Event) {
    this.deckSrv.deleteUsersDeck(id).subscribe({
      next: (message) => {
        console.log(message);
        const updatedDecks = this.decks.filter(deck => deck.id !== id);
        this.deckSrv.updateDeckList(updatedDecks);
      },
      error: (err) => {
        console.log(err);
      },
    });
    window.location.href = 'http://localhost:4200/decks';

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
