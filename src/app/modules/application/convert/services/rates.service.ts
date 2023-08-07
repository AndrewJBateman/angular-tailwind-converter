import { Injectable, inject } from '@angular/core';
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

  // Fetch API data for list of currencies then use RxJS map
  // to extract only list of currencies then again to extract
  // Object keys then convert to a signal to be accessed by form page
  private currencyList$ = this.http
    .get<Currencies>(`${this.apiUrl}${this.apiKey}/latest/EUR`)
    .pipe(
      map((currencies) => currencies.conversion_rates),
      map((key) => Object.keys(key))
    );
  currencyListData = toSignal(this.currencyList$, { initialValue: [] });

  // function to return API rate info using input form data
  convertCurrency(formData: FormData): Observable<Rate> {
    const { amount, currency1, currency2 } = formData;
    return this.http.get<Rate>(
      `${this.apiUrl}${this.apiKey}/pair/${currency1}/${currency2}/${amount}`
    );
  }
}
