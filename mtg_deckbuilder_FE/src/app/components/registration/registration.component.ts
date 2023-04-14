import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { RegisterUser } from 'src/app/interfaces/login-register.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  err: string | undefined

    constructor(private authSrv: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    submit(form: NgForm): void {

      let data: RegisterUser = {

        username: form.value.username,
        name: form.value.name,
        email: form.value.email,
        password: form.value.password

      }

      this.authSrv.signUp(data).pipe(catchError(err => {
        if (err.error == "Email format is invalid") {
          this.err = `Formato email sbagliato`
        } else if (err.error == "Email already exists") {
          this.err = `Email esistente`
        }
        throw err
      })).subscribe(res => {
        this.err = undefined
        this.router.navigate(['/'])
      })

    }

   }
