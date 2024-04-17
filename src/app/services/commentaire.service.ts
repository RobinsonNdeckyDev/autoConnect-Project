import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';



@Injectable({
  providedIn: 'root',
})
export class CommentaireService {

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}

  // Liste commentaires
  getcommentaires(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/commentaires`);
  }

  // Commentaires sur une annonce pour admin
  deleteCommentAnnonceAdmin(id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(`${this.apiService.apiUrl}api/commentaireDestroy${id}`, {
      headers: headers,
    });
  }

  // Commentaires sur une annonce pour admin
  getCommentAnnnonceAdmin(id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any>(`${this.apiService.apiUrl}api/annonceShowAdmin${id}`, {
      headers: headers,
    });
  }

  // Commentaires sur une annonce pour admin
  getCommentAnnnonceProprietaire(id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any>(`${this.apiService.apiUrl}api/annonceShow${id}`, {
      headers: headers,
    });
  }

  // Signaler annonce
  commentAnnonce(annonceComment: any, idAnnonce: number) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(
      `${this.apiService.apiUrl}api/commentaireStore${annonceComment}`,
      idAnnonce,
      {
        headers: headers,
      }
    );
  }
}
