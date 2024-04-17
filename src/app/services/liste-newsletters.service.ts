import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root',
})
export class ListeNewslettersService {

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}

  // Liste blogs
  getNewsletters(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/newsLetters`);
  }

  // abonnement newsletter
  addNewSubscribeNews(subscriber: any): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(`${this.apiService.apiUrl}api/newsLetterStore`, subscriber, {
      headers: headers,
    });
  }

  // Supprimer un abonné
  deleteNewsletter(newsId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(`${this.apiService.apiUrl}api/newsLetterDestroy${newsId}`, {
      headers: headers,
    });
  }
}
