import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agriculteur } from '../Models/agriculteur';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };


@Injectable({
  providedIn: 'root'
})
export class AgriculteurService {
  baseUrl : string = 'http://localhost:3801/agriculteurs';
  baseUrl1 : string = 'http://localhost:3801/nbreA';


  constructor(private http: HttpClient,private authService :AuthService) { }

  getNbA(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl1}`,{headers:httpHeaders});
  }

  getAgriculteurs(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
  }

  getAgriculteur(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url,{headers:httpHeaders});
  }


  createAgriculteur(agriculteur:any){
  
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post(this.baseUrl,agriculteur,{headers:httpHeaders});
  }


  updateAgriculteur(id: number, value:any): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value,{headers:httpHeaders});
  }

  

  deleteagriculteur(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url,{headers:httpHeaders});
 
  }

  getagriculteurList(): Observable<Agriculteur[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Agriculteur[]>(this.baseUrl,{headers:httpHeaders});
   
  }
}
