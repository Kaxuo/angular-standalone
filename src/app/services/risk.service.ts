/* eslint-disable @typescript-eslint/no-explicit-any */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RiskService {
  url: string = 'https://localhost:7255';
  constructor(private http: HttpClient) {}

  getApLife() {
    return this.http.get<any>(`${this.url}/aplife/get`);
  }

  getBondIndices() {
    return this.http.get<any>(`${this.url}/bondindices/get`);
  }

  editApLife(apLives: any) {
    return this.http.post<any>(`${this.url}/aplife/edit`, apLives);
  }
}
