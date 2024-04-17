import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root',
})
export class ListeUsersService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}

  getProprietaires(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/listeProprietaire`);
  }

  getAcheteurs(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/listeAcheteur`);
  }

  // recuperer le whatsapp

  getWhatsapp(idUser: number): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.post<any[]>(`${this.apiService.apiUrl}api/whatsap${idUser}`, {});
  }

  // UsershowId
  // Supprimer un user
  userShowDetail(userId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any>(`${this.apiService.apiUrl}api/proprietaireShow${userId}`, {
      headers: headers,
    });
  }

  // Supprimer un user
  // userUpdateDetail(userId: number, proprietaireData: any): Observable<any> {
  //   let headers = new HttpHeaders();
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     headers = headers.set('Authorization', 'Bearer ' + token);
  //   }
  //   return this.http.patch<any>(`${this.apiService.apiUrl}/proprietaireUpdate${userId}`, {
  //     proprietaireData,
  //   });
  // }

  // Modifier le profil du proprietaire
  userUpdateDetail(id: number, proprietaireData: any): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    // Utilisation de l'ID fourni dans l'URL
    const url = `${this.apiService.apiUrl}api/proprietaireUpdate${id}`;
    return this.http.patch(url, proprietaireData);
  }

  // Supprimer un user
  deleteUser(userId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(`${this.apiService.apiUrl}api/userDestroy${userId}`, {
      headers: headers,
    });
  }

  // detail d'un user
}
