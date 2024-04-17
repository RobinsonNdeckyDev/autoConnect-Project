import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
