// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, interval, map, throwError } from 'rxjs';
import { finalize, switchMap, take, tap } from 'rxjs/operators';
import { Proprietaire } from '../models/proprietaire';
import { Acheteur } from '../models/acheteur';
import { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { ApiUrlService } from './api-url.service';
import Swal from 'sweetalert2';
declare function jwt_decode<T extends JwtPayload = JwtPayload>( token: string ): T;


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenExpirationTimer: any;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private refreshCount = 0;

  constructor(private apiService: ApiUrlService, private http: HttpClient, private router: Router) {}

  isAdmin(): boolean {
    const userdata = localStorage.getItem('currentUser');
    const userConnectedRole = userdata ? JSON.parse(userdata).role : null;
    // console.log('Son role est: ', userConnectedRole);
    return userConnectedRole === 'admin';
  }

  isProprietaire() {
    const userdata = localStorage.getItem('currentUser');
    const userConnectedRole = userdata ? JSON.parse(userdata).role : null;
    // console.log('Son role est: ', userConnectedRole);
    // Vérifie si le rôle est "proprietaire"
    return userConnectedRole === 'proprietaire';
  }

  isAcheteur() {
    const userdata = localStorage.getItem('currentUser');
    const userConnectedRole = userdata ? JSON.parse(userdata).role : null;
    // console.log('Son role est: ', userConnectedRole);
    return userConnectedRole === 'acheteur';
  }

  // connexion
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiService.apiUrl}api/auth/login`, { email, password })
      .pipe(
        map((response) => {
          // Stocker les informations utilisateur et le token dans le stockage local
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.access_token);
          // Démarrer le minuteur de rafraîchissement du jeton
          this.startTokenRefreshTimer();
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  private startTokenRefreshTimer() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const tokenExpiration: Date | null = this.getTokenExpiration(token);
    const now = new Date();
    const expiresIn = tokenExpiration
      ? tokenExpiration.getTime() - now.getTime()
      : 0;

    // Convertir le temps d'expiration du jeton en heures
    const expiresInHours = expiresIn / (1000 * 60 * 60);

    console.log(
      `La durée du jeton est de ${expiresInHours.toFixed(2)} heures.`
    );

    interval(3 * 60 * 1000)
      .pipe(
        // Rafraîchir le jeton 3 fois (15 minutes au total)
        take(3) 
      )
      .subscribe(() => {
        console.log('Rafraîchissement du jeton...');
        this.refreshToken();
      });
  }

  private getTokenExpiration(token: string): Date | null {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000);
    }
    return null;
  }

  private refreshToken() {
    if (this.refreshTokenInProgress) {
      return;
    }

    this.refreshTokenInProgress = true;
    this.http
      .post<any>(`${this.apiService.apiUrl}api/auth/refresh`, {})
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.access_token);
          this.refreshCount++;
          console.log(
            `Rafraîchissement du jeton réussi (${this.refreshCount}/3)`
          );
          if (this.refreshCount === 3) {
            // À la 3ème actualisation (15 minutes)
            this.showLogoutAlert();
          }
          return response;
        }),
        catchError((error) => {
          console.error('Échec du rafraîchissement du jeton :', error);
          this.logout();
          return throwError(error);
        }),
        finalize(() => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(null);
        })
      )
      .subscribe();
  }

  private showLogoutAlert() {
    let responded = false; // Variable de contrôle pour savoir si l'utilisateur a répondu à l'alerte

    Swal.fire({
      title: 'Session Expirée',
      text: 'Vous serez déconnecté dans 5 minutes. Voulez-vous continuer la navigation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Déconnexion',
      reverseButtons: true,
    }).then((result) => {
      responded = true; // Marquer que l'utilisateur a répondu
      if (result.isConfirmed) {
        // L'utilisateur a choisi de continuer la navigation
        this.refreshCount = 0; // Réinitialiser le compteur de rafraîchissement
        console.log('Utilisateur continue la navigation');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // L'utilisateur a choisi de se déconnecter
        console.log('Utilisateur déconnecté');
        // Fermer le popup lorsque l'utilisateur se déconnecte sans confirmer
        this.closePopup();
        this.logoutComplet(); // Déconnecter l'utilisateur
      }
    });

    // Déconnecter automatiquement l'utilisateur après 5 minutes s'il n'a pas répondu à l'alerte
    setTimeout(() => {
      if (!responded) {
        console.log('Temps écoulé, déconnexion automatique');
        this.logoutComplet(); // Déconnecter l'utilisateur
      }
    }, 3 * 60 * 1000);
  }

  logoutComplet() {
    console.log("Déconnexion de l'utilisateur");
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.closePopup();
    this.router.navigate(['/login']); // Redirection vers la page de connexion après la déconnexion
  }

  // Fermer le popup
  private closePopup() {
    Swal.close(); // Fermer le popup
  }

  // Inscription

  registerproprietaire(formData: FormData): Observable<any> {
    console.log("Données d'inscription :", formData);

    return this.http.post<any>(`${this.apiService.apiUrl}api/register`, formData).pipe(
      tap((response) => {
        // console.log("Réponse de l'API après inscription :", response);
      }),
      catchError((error) => {
        // console.error("Erreur lors de l'inscription :", error);
        throw error;
      })
    );
  }

  // vendeur
  registerAcheteur(acheteur: any): Observable<any> {
    console.log("Données d'inscription :", acheteur);

    return this.http.post<any>(`${this.apiService.apiUrl}api/register`, acheteur).pipe(
      tap((response) => {
        // console.log("Réponse de l'API après inscription :", response);
      }),
      catchError((error) => {
        // console.error("Erreur lors de l'inscription :", error);
        throw error;
      })
    );
  }

  // Déconnexion
  logout(): Observable<any> {
    // Récupérer le token du stockage local
    var token = localStorage.getItem('token');
    // Utilisez la variable token ici
    // console.log(token); 

    // Assurez-vous que token n'est pas null ou undefined avant de l'utiliser
    if (!token) {
      // console.error('Token non trouvé dans le stockage local');
      return throwError('Token non trouvé');
    }

    // Assurez-vous que l'URL est correcte
    const logoutUrl = `${this.apiService.apiUrl}api/auth/logout`;

    // Effectuez la requête HTTP POST pour se déconnecter
    return this.http.post<any>(logoutUrl, {}).pipe(
      tap(() => {
        clearTimeout(this.tokenExpirationTimer);
        // Supprimer le token du stockage local
        localStorage.removeItem('token');

        // Vider complètement le localStorage
        localStorage.clear();

        // Rediriger ou effectuer d'autres actions après la déconnexion
        this.router.navigate(['/login']);
      }),

      catchError((error) => {
        throw error;
      })
    );
  }

  // récupération du token

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Is connected pour vérifier s'il est toujours connecté
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Récupérer les informations du vendeur depuis l'API
  getvendeurDetails(id: number): Observable<any> {
    const token = this.getToken();

    if (!token) {
      return throwError('Token non trouvé');
    }

    return this.http
      .get<any>(`${this.apiService.apiUrl}api/acheteurShow/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  // Mettre à jour les informations de l'vendeur
  updatevendeurDetails(id: number, vendeurData: any): Observable<any> {
    const token = this.getToken();

    if (!token) {
      return throwError('Token non trouvé');
    }

    return this.http
      .patch<any>(`${this.apiService.apiUrl}api/acheteurUpdate/${id}`, vendeurData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  // Méthode fictive pour récupérer l'ID de l'utilisateur connecté
  getLoggedInUserId(): number | null {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwt_decode(token); // Utiliser any pour le résultat décodé
      return decodedToken.userId;
    } else {
      return null;
    }
  }
}








