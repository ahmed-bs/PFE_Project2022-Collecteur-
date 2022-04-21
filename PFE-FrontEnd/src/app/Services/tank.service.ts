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
  // URL : Quanitite que je peux l'inserer .. date d'aujourd hui 
  baseUrl7 : string = 'http://localhost:3801/tanksQte';
  baseUrl8 : string = 'http://localhost:3801/QteG';
  baseUrl9 : string = 'http://localhost:3801/QteTanks';

  baseUrl11 : string = 'http://localhost:3801/nbTankRemplis';
  baseUrl12 : string = 'http://localhost:3801/nbTankVide';
  baseUrl13 : string = 'http://localhost:3801/nbTankEnCours';

  baseUrl14 : string = 'http://localhost:3801/tank';



  constructor(private http: HttpClient,private authService :AuthService) { }

  getTanks(): Observable<any> {
   let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
  }

    // test si le matricule exist ou nn
    getTankMatriculeUtilise(matricule: string): Observable<any> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      const url = `${this.baseUrl14}/${matricule}`
      return this.http.get(url,{headers:httpHeaders});
    }

    
  getNbTanksRemplis(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl11}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl6}`);
  }

  getNbTanksVide(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl12}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl6}`);
  }


  getNbTanksEnCours(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl13}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl6}`);
  }

  getNbTanks(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl6}`,{headers:httpHeaders});
  }

  getQteLibreAujourdhui(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl7}`,{headers:httpHeaders});
  }

  getQteTanks(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl9}`,{headers:httpHeaders});
  }


  getQteG(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl8}`,{headers:httpHeaders});
  }


  getTanksQteLibre(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl3}`,{headers:httpHeaders});
  }

  //qte tanks generale d'aujourd'hui
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

