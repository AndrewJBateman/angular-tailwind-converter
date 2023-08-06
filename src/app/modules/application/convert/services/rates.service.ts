import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment.development';
import { Currencies, Rate, FormData } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  apiUrl = environment.apiUrl;
  apiKey = environment.apiKey;
  rate: BehaviorSubject<any> | undefined;
  display: BehaviorSubject<boolean> | undefined;

  http = inject(HttpClient);

  private currencyList$ = this.http
    .get<Currencies>(`${this.apiUrl}${this.apiKey}/latest/USD`)
    .pipe(
      tap((currencies) =>
        console.log('currencies', currencies.conversion_rates)
      ),
      map((currencies) => currencies.conversion_rates),
      map((abv) => Object.keys(abv))
    );
  currencyListData = toSignal(this.currencyList$, { initialValue: [] });

  convertCurrency(formData: FormData): Observable<Rate> {
    const { amount, currency1, currency2 } = formData;
    return this.http.get<Rate>(
      `${this.apiUrl}${this.apiKey}/pair/${currency1}/${currency2}/${amount}`
    );
  }
  // currenciesAndAmountSelected = toSignal<FormData>({
  //   amount: 100,
  //   currency1: 'USD',
  //   currency2: 'EUR',
  // });

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
