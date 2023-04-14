import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDtoInterface } from '../interfaces/user-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDtoService {

  apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  getUserData(id: number): Observable<UserDtoInterface> {
    return this.http.get<UserDtoInterface>(`${this.apiUrl}/userDto/${id}`).pipe(
      map(response => {
        return {
          email: response.email,
          username: response.username,
          name: response.name,
          id: response.id
        };
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  // getUserData(id: number): Observable<UserDtoInterface> {
  //   return this.http.get<UserDtoInterface>(`${this.apiUrl}/userDto/${id}`).pipe(
  //     tap(response => {
  //       console.log(`Email: ${response.email}`);
  //       console.log(`Username: ${response.username}`);
  //       console.log(`Name: ${response.name}`);
  //       console.log(`Id: ${response.id}`);
  //     }),
  //     map(response => {
  //       return {
  //         email: response.email,
  //         username: response.username,
  //         name: response.name,
  //         id: response.id
  //       };
  //     }),
  //     catchError((err) => {
  //       throw err;
  //     })
  //   );
  // }
}
