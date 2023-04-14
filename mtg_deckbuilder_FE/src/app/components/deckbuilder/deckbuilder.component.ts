import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeckInterface } from 'src/app/interfaces/deck.interface';
import { DeckService } from 'src/app/services/deck.service';
import { environment } from 'src/environments/environment';
import { Card } from '../../interfaces/card.interface';
import { DeckbuilderService } from '../../services/deckbuilder.service';

@Component({
  selector: 'app-deckbuilder',
  templateUrl: './deckbuilder.component.html',
  styleUrls: ['./deckbuilder.component.scss'],
})
export class DeckbuilderComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  p = 1;
  cardName: string = '';
  cards: Card[] = [];
  originalCards: Card[] = [];
  selectedCard: Card | null = null;
  selectedColors: { [key: string]: boolean } = {
    W: false,
    U: false,
    B: false,
    R: false,
    G: false,
  };
  selectedType: string = '';
  selectedLegality: string = '';
  quantity: number = 1;
  @ViewChild('deckNameInput') deckNameInput: any;
  deckName: string;
  apiUrl = environment.api;
  selectedDeck: DeckInterface;

  constructor(
    private deckBuildSrv: DeckbuilderService,
    private deckSrv: DeckService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('deckOpened', 'false');

    this.getCardBySet('eld');
  }

  //RETRIEVE DATA FROM INPUT SEARCH BY NAME
  submit() {
    this.cardName = this.form.value.name;
    this.getCardByName(this.cardName);
  }
  //SELEZIONE CARD IN BASE AL NOME
  getCardByName(name: string) {
    event.preventDefault();
    const nameLowerCase = name.toLowerCase();
    this.cards = this.originalCards.filter(
      (card) => card.name && card.name.toLowerCase().includes(nameLowerCase)
    );
  }

//empty the input for deck creation
  openModal(): void {
    this.deckNameInput.nativeElement.value = '';
  }

  // const regex = new RegExp(/({\d})?({W|U|B|R|G})?/gm);
  // this.cards = this.cards.filter((card) => {
  //   const manaCost = card.mana_cost;
  //   regex.test(manaCost);

  // })

  //GET CARD BY SELECTED SET
  getCardBySet(set: string) {
    event.preventDefault();

    this.deckBuildSrv.getCardsBySet(set).subscribe((res) => {
      //@ts-ignore
      this.originalCards = res.data;
      this.cards = [...this.originalCards];
    });
  }
  //FILTER BY LEGALITY
  onFilterCardsLegality(parameter: string): void {
    event.preventDefault();
    this.selectedLegality = parameter;
    const paramLowerCase = parameter.toLowerCase();
    this.filterCards();
  }

  //FILTER BY TYPE
  onFilterCards(parameter: string): void {
    event.preventDefault();
    this.selectedType = parameter;
    this.filterCards();
  }

  //FILTER BY COLOR
  onFilter(): void {
    const selectedColorsArray = Object.keys(this.selectedColors).filter(
      (color) => this.selectedColors[color]
    );
    this.filterCards(selectedColorsArray);
  }

  //COMBINATION OF THE THREE FILTERS
  filterCards(selectedColorsArray?: string[]): void {
    let filteredCards = [...this.originalCards];

    if (selectedColorsArray && selectedColorsArray.length > 0) {
      filteredCards = filteredCards.filter((card) => {
        return selectedColorsArray.every((color) =>
          card.colors?.includes(color)
        );
      });
      console.log(filteredCards);
    }

    if (this.selectedType) {
      filteredCards = filteredCards.filter((card) =>
        card.type_line?.includes(this.selectedType)
      );
      console.log(filteredCards);
    }

    if (this.selectedLegality) {
      const paramLowerCase = this.selectedLegality.toLowerCase();
      filteredCards = filteredCards.filter(
        (card) => card.legalities?.[paramLowerCase] === 'legal'
      );
      console.log(this.cards);
      console.log(filteredCards);
    }

    this.cards = filteredCards;
  }

  resetFilters() {
    this.selectedType = '';
    this.selectedLegality = '';
    this.selectedColors = {
      W: false,
      U: false,
      B: false,
      R: false,
      G: false,
    };
    this.filterCards();
  }
  //------CREATION OF THE DECK AND ITS NAME-------
  createDeck(deckName: string) {
    const deckOpened = localStorage.getItem('deckOpened')
    if(deckOpened ==='false') {
      this.deckBuildSrv.createDeck(deckName).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('deckCreated', 'true');
        },
        error: (error) => console.error(error),
      });
    } else {
      alert('Close the deck before creating a new one!')
    }
  }
    //-----ADD CARD TO DECK------
  addToDeck(selectedCard: Card, quantity: number) {
    if(localStorage.getItem('deckOpened') === 'true' || localStorage.getItem('deckCreated') === 'true') {
      this.deckSrv.getDeckId().subscribe(deckId => {
        this.deckSrv.addCardToDeck(
          deckId,
          selectedCard.oracle_id,
          selectedCard.uri,
          selectedCard.image_uris,
          selectedCard.type_line,
          quantity,
          selectedCard.name
        );
      });
    } else {
      alert('You must create or open a deck before adding a card')
    }

  }

  resetQuantity() {
    this.quantity = 1;
  }
}
