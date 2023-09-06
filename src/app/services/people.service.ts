import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Results } from '../Models/Results';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  url: string = 'https://randomuser.me/api/?results=1000';
  constructor(private http: HttpClient) {}

  getPeople(): Observable<Results> {
    return this.http.get<Results>(`${this.url}`);
  }
}
