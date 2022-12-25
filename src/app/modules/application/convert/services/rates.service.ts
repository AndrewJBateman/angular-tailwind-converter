import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rates } from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) { }

  getRates(base: string): Observable<Rates> {
    return this.http.get<any>('https://api.exchangerate.host/latest', {
      params: new HttpParams().append('base', base),
    }).pipe(map(response => {
      return response.rates;
    }
    ));
  }
}
