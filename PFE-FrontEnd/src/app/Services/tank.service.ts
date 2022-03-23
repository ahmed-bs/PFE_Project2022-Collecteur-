import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tank } from '../Models/tank';

@Injectable({
  providedIn: 'root'
})
export class TankService {
  baseUrl : string = 'http://localhost:3801/tanks';
  baseUrl2 : string = 'http://localhost:3801/tanksFilres';
  baseUrl3 : string = 'http://localhost:3801/qteTanksLibre';
  baseUrl4 : string = 'http://localhost:3801/qteTanksGenerale';
  baseUrl6 : string = 'http://localhost:3801/nbreT';

  constructor(private http: HttpClient) { }

  getTanks(): Observable<any> {
  
    return this.http.get(`${this.baseUrl}`);
  }

  getNbTanks(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl6}`);
  }


  getTanksQteLibre(): Observable<any> {
  
    return this.http.get(`${this.baseUrl3}`);
  }

  getTanksQteGenerale(): Observable<any> {
   
    return this.http.get(`${this.baseUrl4}`);
  }

  getTanksFiltres(): Observable<any> {
  
    return this.http.get(`${this.baseUrl2}`);
  }

  getTank(id: number): Observable<any> {
 
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }


  createTank(tank:any){
  
    return this.http.post(this.baseUrl,tank);
  }


  updateTank(id: number, value:any): Observable<Object> {
  
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteTank(id: number): Observable<any> {
  

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getTankList(): Observable<Tank[]> {
  
    return this.http.get<Tank[]>(this.baseUrl);
   
  }
}

