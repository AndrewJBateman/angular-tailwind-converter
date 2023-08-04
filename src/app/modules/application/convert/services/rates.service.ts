import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Currencies } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  apiUrl = '';
  apiKey = '';
  price: BehaviorSubject<any> | undefined;
  display: BehaviorSubject<boolean> | undefined;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
    this.price = new BehaviorSubject<any>({});
    this.display = new BehaviorSubject<boolean>(false);
  }

  getAllCurrencies(): Observable<string[]> {
    return this.http
      .get<Currencies>(`${this.apiUrl}${this.apiKey}/latest/USD`)
      .pipe(
        tap((currencies) =>
          console.log('currencies', currencies.conversion_rates)
        ),
        map((currencies) => currencies.conversion_rates),
        map((abv) => Object.keys(abv))
      );
  }
}
