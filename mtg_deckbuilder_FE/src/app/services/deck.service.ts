import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../interfaces/card.interface';
import { DeckInterface } from '../interfaces/deck.interface';
import { SelectedCard } from '../interfaces/selected-card';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  apiUrl = environment.api;
  deckId: number;
  cards: Card[];
  decks: DeckInterface[];
  deck: DeckInterface;
  private selectedCardsSource = new BehaviorSubject<SelectedCard[]>([]);
  selectedCards$ = this.selectedCardsSource.asObservable();
  private decksSubject: BehaviorSubject<DeckInterface[]> = new BehaviorSubject<
    DeckInterface[]
  >([]);
  decks$: Observable<DeckInterface[]> = this.decksSubject.asObservable();
  quantity: number;


  cardDeleted = new EventEmitter<SelectedCard>();

  constructor(private http: HttpClient) {}

  addCardToDeck(
    deckId: number,
    oracle_id: string,
    uri: string,
    image_uris: any,
    type_line: string,
    quantity: number,
    name: string
  ) {
    for (let i = 0; i < quantity; i++) {
      const data = {
        oracleId: oracle_id,
        uri: uri,
        imageUris: image_uris.normal,
        typeLine: type_line,
        name: name,
      };
      this.http
        .patch(`${this.apiUrl}/decks/${deckId}`, data)
        .pipe(
          tap((res) => {
            console.log('Card added to deck', res);
            const selectedCard = {
              oracleId: oracle_id,
              uri: uri,
              imageUris: image_uris.normal,
              typeLine: type_line,
              name: name,
            };
            const selectedCards = [
              ...this.selectedCardsSource.getValue(),
              selectedCard,
            ];
            this.selectedCardsSource.next(selectedCards);
          }),
          catchError((err) => {
            console.error('Error adding card to deck:', err);
            return of(null);
          })
        )
        .subscribe();
    }
  }
  clearSelectedCards(): void {
    this.selectedCardsSource.next([]);
  }

  getDeckId(): Observable<number> {
    const { id } = JSON.parse(localStorage.getItem('user'));
    const deckName = localStorage.getItem('deckName');
    return this.http.get(`${this.apiUrl}/deck/id/${deckName}/${id}`).pipe(
      tap((id: number) => {
        console.log(`Deck ID for ${deckName}: ${id}`);
        this.deckId = id;
      })
    );
  }

  getDeckCards(deckId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/cards/deck/${deckId}`).pipe(
      tap((cards: Card[]) => {
        console.log(`Cards for deck ${deckId}: `, cards);
        this.cards = cards;
      })
    );
  }

  getDeckById(id: number) {
    return this.http.get<DeckInterface>(`${this.apiUrl}/deck/${id}`).pipe(
      tap((deck: DeckInterface) => {
        console.log(`Deck with id: ${id}`);
        this.deck = deck;
      })
    );
  }

  getUsersDeck(): Observable<DeckInterface[]> {
    const { id, username } = JSON.parse(localStorage.getItem('user'));
    return this.http.get<DeckInterface[]>(`${this.apiUrl}/decks/${id}`).pipe(
      tap((decks: DeckInterface[]) => {
        console.log(`Decks for user ${username}: `, decks);
        this.decksSubject.next(decks);
      })
    );
  }

  deleteUsersDeck(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/deck/${id}`).pipe(
      tap(() => console.log(`Deck with id ${id} cancelled!`)),
      map(() => `Deck cancelled correctly!`)
    );
  }
  updateDeckList(decks: DeckInterface[]): void {
    this.decksSubject.next(decks);
  }

  onDeleteDeckCard(oracleId: string, deckId?: number) {
    return this.http
      .delete(
        `${this.apiUrl}/decks/${
          this.deckId ? this.deckId : deckId
        }/cards/${oracleId}`
      )
      .pipe(
        tap(() => console.log('Card cancelled')),
        map(() => `Card cancelled correctly`)
      );
  }
}
