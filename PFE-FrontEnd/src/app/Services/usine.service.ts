import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usine } from '../Models/usine';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsineService {
  baseUrl: string = 'http://localhost:3801/usines';
  baseUrl1: string = 'http://localhost:3801/nbreU';
  baseUrl2: string = 'http://localhost:3801/usine';
  baseUrl3: string = 'http://localhost:3801/tel';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsines(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl}`, { headers: httpHeaders });
  }

  //si le nom de l'usine existe ou nn
  getNomUsineUtilse(nomUsine: String): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl2}/${nomUsine}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  //si le tel de l'usine existe ou nn
  getTelUsineUtilse(tel: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl3}/${tel}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getNbUsines(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl1}`, { headers: httpHeaders });
  }

  getUsine(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  createUsine(usine: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post(this.baseUrl, usine, { headers: httpHeaders });
  }

  updateUsine(id: number, value: any): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  deleteUsine(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers: httpHeaders });
  }

  getUsineList(): Observable<Usine[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Usine[]>(this.baseUrl, { headers: httpHeaders });
  }
}
