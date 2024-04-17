import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root',
})
export class ProprietaireGard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Vérifie si l'utilisateur est un propriétaire mais PAS un administrateur
    if (
      this.authService.isProprietaire() &&
      !this.authService.isAdmin()) {
        // Autoriser l'accès si l'utilisateur est un propriétaire mais PAS un administrateur
        return true;
      } else {
      // Redirige vers la page de connexion pour les utilisateurs non autorisés
      this.router.navigate(['/login']);
      return false;
    }
  }
}
