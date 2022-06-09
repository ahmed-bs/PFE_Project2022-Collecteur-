import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../Models/operation';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  baseUrl: string = 'http://localhost:3801/operations';
  baseUrl1: string = 'http://localhost:3801/retrait';
  baseUrl2: string = 'http://localhost:3801/remplissage';
  baseUrl3: string = 'http://localhost:3801/operationsRetrait';
  baseUrl4: string = 'http://localhost:3801/operationsRemplissages';
  baseUrl5: string = 'http://localhost:3801/operationsTank';
  baseUrl6: string = 'http://localhost:3801/nbreOp';
  baseUrl7: string = 'http://localhost:3801/operationsR';
  baseUrl8: string = 'http://localhost:3801/getOpTank';
  baseUrl9: string = 'http://localhost:3801/op';
  baseUrl10: string = 'http://localhost:3801/NbOpTankTotal';
  baseUrl11: string = 'http://localhost:3801/NbOpTank1';
  baseUrl14: string = 'http://localhost:3801/nbOpRetrait';
  baseUrl15: string = 'http://localhost:3801/nbOpRemplissage';
  baseUrl16: string = 'http://localhost:3801/find';
  baseUrl17: string = 'http://localhost:3801/update';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getNbOp(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl6}`, { headers: httpHeaders });
  }

  getNbOpRetrait(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl14}`, { headers: httpHeaders });
  }

  getNbOpRemplissage(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl15}`, { headers: httpHeaders });
  }

  getNbOpTankTotal(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl10}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  // traja3li les operation tank eli teb3in operation bark
  findOpTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl16}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  // hedhy bech ta3mali update 3al codeLiaison , kol operation tank bech ta3tiha codeLiaison khas bih
  updateOpTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl17}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getNbOpTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl11}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  // test si le code exist ou nn
  getOpCodeUtilise(code: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl9}/${code}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getOperations(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl}`, { headers: httpHeaders });
  }

  getOperationsRemplissages(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl4}`, { headers: httpHeaders });
  }

  getOperationsRetraits(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl3}`, { headers: httpHeaders });
  }

  getOperationsTanks(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl5}`, { headers: httpHeaders });
  }

  getOperation(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getOpTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl8}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getOperationTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl5}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  createOperation(f: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post(this.baseUrl1, f, { headers: httpHeaders });
  }

  createOperationRemplissage(f: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post(this.baseUrl2, f, { headers: httpHeaders });
  }

  updateOperation(id: number, value: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  updateOperationR(id: number, value: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl7}/${id}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  deleteOperation(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers: httpHeaders });
  }

  getOperationList(): Observable<Operation[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Operation[]>(this.baseUrl, { headers: httpHeaders });
  }
}
