import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root',
})
export class ListeContactsService {

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}

  // Liste messages
  getMessages(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/messages`);
  }

  // Supprimer un abonné
  deleteMessage(messageId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(`${this.apiService.apiUrl}api/messageDestroy${messageId}`, {
      headers: headers,
    });
  }

  // Ajout message
  addMessage(newMessage: any): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(`${this.apiService.apiUrl}api/messageStore`, newMessage, {
      headers: headers,
    });
  }
  
}
