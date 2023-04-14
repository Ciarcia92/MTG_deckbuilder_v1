import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DeckbuilderComponent } from './components/deckbuilder/deckbuilder.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckComponent } from './components/deck/deck.component';
import { UserGuard } from './user-guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'deckbuilder', component: DeckbuilderComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'decks', component: DeckListComponent, canActivate:[UserGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
