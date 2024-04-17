import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root',
})
export class ListeCategoriesService {

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}

  getCategories(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/categories`);
  }

  getCategoriesProp(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/categories`);
  }

  // Ajout blog
  addCategorie(newCategorie: any): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(
      `${this.apiService.apiUrl}api/categorieStore`,
      newCategorie,
      {
        headers: headers,
      }
    );
  }

  // Méthode pour modifier un blog
  modifierCategorie(id: number, newData: any): Observable<any> {
    const url = `${this.apiService.apiUrl}api/categorieUpdate${id}`; // Utilisation de l'ID fourni dans l'URL
    return this.http.patch(url, newData);
  }

  // Supprimer carrément une catégorie
  deleteCategorie(categorieId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(
      `${this.apiService.apiUrl}api/categorieDestroy${categorieId}`,
      {
        headers: headers,
      }
    );
  }

  // Supprimer simplement une categorie
  simpleDeleteCategorie(categorieId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.patch<any>(
      `${this.apiService.apiUrl}api/categorieSupprimer${categorieId}`,
      {
        headers: headers,
      }
    );
  }

  // Liste des categories supprimées
  getCategoriesSupprimees(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/listeCategorieSupprimer`);
  }

  // Restaurer une categorie
  restaureCategorie(categorieId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.patch<any>(
      `${this.apiService.apiUrl}api/categorieRestaurer${categorieId}`,
      {
        headers: headers,
      }
    );
  }
}
