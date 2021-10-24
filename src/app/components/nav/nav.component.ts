import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  displayUserCard: boolean = false;
  currentUser: User = {
    id: 0,
    name: '',
    email: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (response: User) => (this.currentUser = response),
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  showUserCard(): void {
    if (this.displayUserCard) {
      this.displayUserCard = false;
    } else {
      this.displayUserCard = true;
    }
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['']);
  }
}
