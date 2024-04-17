import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root',
})
export class SignalementService {

  constructor(private http: HttpClient, private apiService: ApiUrlService) {}


  // Liste signalements
  listeSignals(){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiService.apiUrl}api/signalements`);
  }
  
  // Signaler annonce
  signalAnnonce(annonceSignal: any, idAnnonce: number){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(`${this.apiService.apiUrl}api/signalementStore${annonceSignal}`,idAnnonce,{
      headers: headers,
    });
  }
}
