import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root',
})
export class ListeUtilitairesService {

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}

  // Liste utilitaires
  getAnnonces(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/annoncesParCategorie${id}`);
  }

  // supprimer une annonce
  deleteAnnonce(annonceId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.delete<any>(
      `${this.apiService.apiUrl}api/annonceDestroyAdmin${annonceId}`,
      {
        headers: headers,
      }
    );
  }

  // Méthode pour avoir les donnees sur un utilitaire
  infoUtilitaire(idUtilitaire: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(`${this.apiService.apiUrl}api/annonceDetail${idUtilitaire}`, {
      headers: headers,
    });
  }
}
