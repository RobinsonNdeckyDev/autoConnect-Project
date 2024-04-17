import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root',
})
export class ProfilProprietaireService {

  constructor(private apiService: ApiUrlService, private http: HttpClient) {}

  // Méthode pour récupérer les détails du proprietaire
  getProprietaireDetails(proprietaireId: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(
      `${this.apiService.apiUrl}api/acheteurUpdate${proprietaireId}`,
      {
        headers: headers,
      }
    );
  }

  // Méthode pour modifier un proprietaire
  modifierProprietaire(proprietaireId: number, newData: any): Observable<any> {
    const url = `${this.apiService.apiUrl}api/acheteurUpdate${proprietaireId}`; // Utilisation de l'ID fourni dans l'URL
    return this.http.patch(url, newData);
  }
}
