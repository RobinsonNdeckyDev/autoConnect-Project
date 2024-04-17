import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce';
import { ApiUrlService } from './api-url.service';



@Injectable({
  providedIn: 'root',
})
export class PublierAnnonceService {

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}

  //Ajout annonce
  addAnnonce(newAnnonce: any): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(`${this.apiService.apiUrl}api/annonceStore`, newAnnonce, {
      headers: headers,
    });
  }

  // Mettre à jour l'etat d'une annonce
  updateAnnonceState(annonceId: number, newState: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.patch(`${this.apiService.apiUrl}api/updateEtataAnnonce${annonceId}`, {
      etat: newState,
    });
  }

  // Modification d'une annonce
  updateAnnonceOnly(id: number, annonceAjour: any): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    // Utilisation de l'ID fourni dans l'URL
    const url = `${this.apiService.apiUrl}api/annonceUpdate${id}`;
    return this.http.patch(url, annonceAjour);
  }

  // Annonces proprietaire valides
  getAnnonceValideProp(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/annonceValides`);
  }

  // Annonces proprietaire invalides
  getAnnonceInvalideProp(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/annonceInvalides`);
  }

  // Annonces Mises en avant
  getAnnonceMisesEnAvant(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiService.apiUrl}api/annoncesMisesEnAvantParCategorie`
    );
  }

  // Annonces Userproprietaire valides
  getAnnonceUserValide(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/annonceUserValides`);
  }

  // Annonces Userproprietaire invalides
  getAnnonceUserInvalide(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/annonceUserInvalides`);
  }

  // Suppression d'une annonce signalée
  // Modification d'une annonce
  supprimerAnnonceSignale(id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(
      `${this.apiService.apiUrl}api/signalementDestroy${id}`,
      {
        headers: headers,
      }
    );
  }
}
