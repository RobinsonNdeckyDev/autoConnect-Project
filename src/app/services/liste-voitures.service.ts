import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root',
})
export class ListeVoituresService {

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}

  // Liste voitures
  getAnnonces(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/annoncesParCategorie${id}`);
  }

  // Méthode pour récupérer les détails d'une annonce
  getAnnonceDetails(annonceId: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(`${this.apiService.apiUrl}api/annonceDetail${annonceId}`, {
      headers: headers,
    });
  }

  // Méthode pour avoir les donnees sur une voiture
  infoVoiture(idVoiture: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(`${this.apiService.apiUrl}api/annonceDetail${idVoiture}`, {
      headers: headers,
    });
  }

  // supprimer une annonce
  deleteAnnonce(annonceId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.delete<any>(`${this.apiService.apiUrl}api/annonceDestroyAdmin${annonceId}`, {
      headers: headers,
    });
  }

}
