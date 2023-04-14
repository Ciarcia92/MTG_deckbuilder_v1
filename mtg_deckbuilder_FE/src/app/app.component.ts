import { Component } from '@angular/core';
import { TokenInterface } from './interfaces/token.interface';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'capstone_fe';
  logged: boolean = false;
  name: string = '';
  user: TokenInterface|null = null;

  constructor(private authSrv: AuthService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      this.name = user.username;
    }
    this.authSrv.user$.subscribe(token => {
      if (token) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
    if (this.authSrv.isLogged() && this.authSrv.checkTokenValidity()) {
      this.logged = true;
    }
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === 'user') {
        //update logged variable based on the presence in the localstorage
      this.logged = localStorage.getItem('user') != null;
    }
  }
  logout() {
    this.authSrv.logout()
  }
}
