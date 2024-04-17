import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root',
})
export class AcheteurGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAcheteur() && !this.authService.isAdmin()) {
      // Autoriser l'accès si l'utilisateur est un acheteur
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
