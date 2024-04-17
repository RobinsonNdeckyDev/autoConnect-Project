import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';
import { Blog } from '../models/blog';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root',
})
export class ListeBlogsService {

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}

  // Liste blogs
  getBlogs(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/blocs`);
  }

  // Ajout blog
  addblog(newBlog: any): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(`${this.apiService.apiUrl}api/blocStore`, newBlog, {
      headers: headers,
    });
  }

  // Méthode pour récupérer les détails d'un blog
  getBlogDetails(blogId: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(`${this.apiService.apiUrl}api/blocStore/${blogId}`, {
      headers: headers,
    });
  }

  // Méthode pour modifier un blog
  modifierBlog(id: number, newData: Blog): Observable<any> {
    const url = `${this.apiService.apiUrl}api/blocUpdate${id}`; // Utilisation de l'ID fourni dans l'URL
    return this.http.patch(url, newData);
  }

  // Supprimer un blog
  deleteBlog(blogId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(`${this.apiService.apiUrl}api/blocDestroy${blogId}`, {
      headers: headers,
    });
  }

  // Méthode pour avoir les donnees sur un blog
  infoBlog(idBlog: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(`${this.apiService.apiUrl}api/blocShow${idBlog}`, {
      headers: headers,
    });
  }
}
