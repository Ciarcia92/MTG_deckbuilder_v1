import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDtoInterface } from '../../interfaces/user-dto.interface';
import { UserDtoService } from '../../services/user-dto.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: UserDtoInterface;

  constructor(private http: HttpClient, private userSrv: UserDtoService) {}

  ngOnInit(): void {
    const { id } = JSON.parse(localStorage.getItem('user'));

    console.log(id);

    this.userSrv.getUserData(id).subscribe({
      next: (data) => {
        this.user = {
          name: data.name,
          username: data.username,
          email: data.email,
          id: data.id
        };
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable completed');
      }
    });
  }


}
