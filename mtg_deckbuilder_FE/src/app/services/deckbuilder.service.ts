import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeckbuilderService {
  url: string = 'https://api.scryfall.com/cards';
  apiUrl = environment.api;
  deckCreatedEvent = new Subject<void>();
  deckId: number;

  constructor(private http: HttpClient) {}

  //------METODH TO RETRIEVE CARDS FROM SETS---------
  getCardsBySet(set: string) {
    return this.http.get(
      this.url + '/search?order=set&q=e%3A' + set + '&unique=prints'
    );
  }

  createDeck(deckName: string): Observable<any> {
    const { id } = JSON.parse(localStorage.getItem('user'));
    const body = { name: deckName, user: { id: id } };
    return this.http.post(`${this.apiUrl}/decks`, body).pipe(
      tap(() => {
        console.log(`Deck ${deckName} created successfully`);
        localStorage.setItem('deckName', deckName);
        this.deckCreatedEvent.next();
      })
    );
  }
}
