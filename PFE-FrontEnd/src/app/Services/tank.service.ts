import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tank } from '../Models/tank';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class TankService {
  baseUrl : string = 'http://localhost:3801/tanks';
  baseUrl2 : string = 'http://localhost:3801/tanksFilres';
  baseUrl3 : string = 'http://localhost:3801/qteTanksLibre';
  baseUrl4 : string = 'http://localhost:3801/qteTanksGenerale';
  baseUrl6 : string = 'http://localhost:3801/nbreT';

  constructor(private http: HttpClient,private authService :AuthService) { }

  getTanks(): Observable<any> {
   let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
  }

  getNbTanks(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl6}`,{headers:httpHeaders});
  }


  getTanksQteLibre(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl3}`,{headers:httpHeaders});
  }

  getTanksQteGenerale(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl4}`,{headers:httpHeaders});
  }

  getTanksFiltres(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl2}`,{headers:httpHeaders});
  }

  getTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url,{headers:httpHeaders});
  }


  createTank(tank:any){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post(this.baseUrl,tank,{headers:httpHeaders});
  }


  updateTank(id: number, value:any): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value,{headers:httpHeaders});
  }

  

  deleteTank(id: number): Observable<any> {
  
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url,{headers:httpHeaders});
 
  }

  getTankList(): Observable<Tank[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Tank[]>(this.baseUrl,{headers:httpHeaders});
   
  }
}

