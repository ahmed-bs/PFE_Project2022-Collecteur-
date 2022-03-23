import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../Models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  baseUrl : string = 'http://localhost:3801/operations';
  baseUrl1 : string = 'http://localhost:3801/retrait';
  baseUrl2 : string = 'http://localhost:3801/remplissage';
  baseUrl3 : string = 'http://localhost:3801/operationsRetrait';
  baseUrl4 : string = 'http://localhost:3801/operationsRemplissages';
  baseUrl5 : string = 'http://localhost:3801/operationsTank';
  baseUrl6 : string = 'http://localhost:3801/nbreOp';
  baseUrl7 : string = 'http://localhost:3801/operationsR';

  constructor(private http: HttpClient) { }

  getNbOp(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl6}`);
  }

  

  getOperations(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl}`);
  }

  getOperationsRemplissages(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl4}`);
  }

  getOperationsRetraits(): Observable<any> {
 
    return this.http.get(`${this.baseUrl3}`);
  }

  getOperationsTanks(): Observable<any> {

    return this.http.get(`${this.baseUrl5}`);
  }

  getOperation(id: number): Observable<any> {

    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }

  
  getOperationTank(id: number): Observable<any> {

    const url = `${this.baseUrl5}/${id}`
    return this.http.get(url);
  }

  createOperation(f:any){
  
    return this.http.post(this.baseUrl1,f);
  }

  createOperationRemplissage(f:any){
  
    return this.http.post(this.baseUrl2,f);
  }

  updateOperation(id: number, value:any) {
 
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  updateOperationR(id: number, value:any) {

    const url = `${this.baseUrl7}/${id}`
    return this.http.put(url, value);
  }

  

  deleteOperation(id: number): Observable<any> {
 

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getOperationList(): Observable<Operation[]> {
    
    return this.http.get<Operation[]>(this.baseUrl);
   
  }
}
