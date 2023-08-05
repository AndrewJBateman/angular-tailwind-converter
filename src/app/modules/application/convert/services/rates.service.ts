import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Currencies, Rate, FormData } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  apiUrl = '';
  apiKey = '';
  rate: BehaviorSubject<any> | undefined;
  display: BehaviorSubject<boolean> | undefined;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
    this.rate = new BehaviorSubject<any>({});
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

  convertCurrency(formData: FormData): Observable<Rate> {
    const { amount, currency1, currency2 } = formData;
    return this.http.get<Rate>(
      `${this.apiUrl}${this.apiKey}/pair/${currency1}/${currency2}/${amount}`
    );
  }

  setRate(rate: Rate): void {
    if (this.rate) {
      this.rate.next(rate);
    }
  }

  getRate(): Observable<Rate> | undefined {
    if (this.rate) {
      return this.rate.asObservable();
    }
    return undefined;
  }
}
