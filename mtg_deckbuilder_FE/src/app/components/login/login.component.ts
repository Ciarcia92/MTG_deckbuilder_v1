import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LoginUser } from 'src/app/interfaces/login-register.interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  err: string | undefined

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    let data: LoginUser = {
      username: form.value.username,
      password: form.value.password
    }
    console.log(data);
    this.authSrv.login(data).pipe(catchError(err => {
      if (err.error == "Cannot find user") {
        this.err = `User not found`
        } else if (err.error == "Incorrect password") {
        this.err = `Incorrect password`
        } else if (err.error == "Email format is invalid") {
        this.err = `Invalid email format`
      }
      throw err
    })).subscribe(res => {
      this.router.navigate(['/'])
    })
  }




}
