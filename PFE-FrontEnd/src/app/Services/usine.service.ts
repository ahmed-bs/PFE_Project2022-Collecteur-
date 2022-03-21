import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usine } from '../Models/usine';

@Injectable({
  providedIn: 'root'
})
export class UsineService {

  baseUrl : string = 'http://localhost:3801/usines';

  constructor(private http: HttpClient) { }

  getUsines(): Observable<any> {
  
    return this.http.get(`${this.baseUrl}`);
  }

  getUsine(id: number): Observable<any> {
 
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }


  createUsine(usine:any){
  
    return this.http.post(this.baseUrl,usine);
  }


  updateUsine(id: number, value:any): Observable<Object> {
  
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteUsine(id: number): Observable<any> {
  

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getUsineList(): Observable<Usine[]> {
  
    return this.http.get<Usine[]>(this.baseUrl);
   
  }
}

