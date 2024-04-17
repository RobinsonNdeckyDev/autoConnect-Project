
// auth-interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentification.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Obtenir le token d'authentification
    const authToken = this.authService.getToken();

    // Si le token est présent
    if (authToken) {
      // Cloner la requête en y ajoutant l'en-tête Authorization avec le token
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Intercepter les réponses HTTP
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          // Si une erreur 401 (Non autorisé) est renvoyée
          if (error.status === 401) {
            // Token expiré ou non valide, déconnecter l'utilisateur et rediriger vers la page de connexion
            this.authService.logout();
            this.router.navigate(['/login']);
          }
          // Renvoyer l'erreur
          return throwError(error);
        })
      );
    }

    // Si aucun token n'est disponible, continuer avec la requête d'origine
    return next.handle(req);
  }
}



































// auth-interceptor.ts

// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
// } from '@angular/common/http';
// import { AuthenticationService } from '../services/authentification.service';
// // import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private authService: AuthenticationService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {

//     // Ajouter le token à l'en-tête d'autorisation si l'utilisateur est connecté
//     const authToken = this.authService.getToken();
    
//     if (authToken) {
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       return next.handle(authReq);
//     }
//     return next.handle(req);
//   }
// }





































// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthenticationService } from '../services/authentification.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthenticationService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (this.authService.isTokenExpired()) {
//       // Token expiré, déconnexion automatique de l'utilisateur
//       this.authService.logout();
//       return throwError('Token expiré');
//     }

//     const token = this.authService.getToken();
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     }
//     return next.handle(request).pipe(
//       catchError((error) => {
//         // Gérer les erreurs HTTP
//         return throwError(error);
//       })
//     );
//   }
// }
