import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agriculteur } from '../Models/agriculteur';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AgriculteurService {
  baseUrl: string = 'http://localhost:3801/agriculteurs';
  baseUrl1: string = 'http://localhost:3801/nbreA';
  baseUrl2: string = 'http://localhost:3801/agriculteur';
  baseUrl3: string = 'http://localhost:3801/ag';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getNbA(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl1}`, { headers: httpHeaders });
  }

  getAgriculteurs(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl}`, { headers: httpHeaders });
  }

  //si le nom et prenom de l'agriculteur existe ou nn
  getNomPrenomUtilse(nom: String, prenom: String): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl2}/${nom}/${prenom}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  //si le numero de tel existe ou nn
  getTelUtilse(tel: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl2}/${tel}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  //si le matricule existe ou nn
  getMatriculeUtilse(matricule: string): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl3}/${matricule}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getAgriculteur(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  createAgriculteur(agriculteur: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post(this.baseUrl, agriculteur, { headers: httpHeaders });
  }

  updateAgriculteur(id: number, value: any): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  deleteagriculteur(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers: httpHeaders });
  }

  getagriculteurList(): Observable<Agriculteur[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Agriculteur[]>(this.baseUrl, { headers: httpHeaders });
  }
}
