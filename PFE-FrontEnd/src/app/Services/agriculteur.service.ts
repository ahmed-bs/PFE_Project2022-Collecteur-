import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agriculteur } from '../Models/agriculteur';

// const httpOptions = {
//   headers: new HttpHeaders( {'Content-Type': 'application/json'} )
//   };


@Injectable({
  providedIn: 'root'
})
export class AgriculteurService {
  baseUrl : string = 'http://localhost:3801/agriculteurs';
  baseUrl1 : string = 'http://localhost:3801/nbreA';

  constructor(private http: HttpClient) { }

  getNbA(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl1}`);
  }

  getAgriculteurs(): Observable<any> {
  
    return this.http.get(`${this.baseUrl}`);
  }

  getAgriculteur(id: number): Observable<any> {
 
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }


  createAgriculteur(agriculteur:any){
  
    return this.http.post(this.baseUrl,agriculteur);
  }


  updateAgriculteur(id: number, value:any): Observable<Object> {
  
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteagriculteur(id: number): Observable<any> {
  

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getagriculteurList(): Observable<Agriculteur[]> {
  
    return this.http.get<Agriculteur[]>(this.baseUrl);
   
  }
}
