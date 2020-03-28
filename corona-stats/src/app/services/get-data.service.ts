import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoronaStatsObject } from '../interfaces/CoronaStatsObject';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<CoronaStatsObject> {
    return this.http.get<CoronaStatsObject>('https://corona.lmao.ninja/all');
  }

  getCountryData(): Observable<any> {
    return this.http.get('https://corona.lmao.ninja/countries');
  }
}
