import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Rates } from './models/currency';
import { RatesService } from './services/rates.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html'
})
export class ConvertComponent implements OnInit {
  title = 'convertor';
  convAmount: number = 0;
  origCurrency: string = "EUR";
  destCurrency: string = "EUR";
  rates$: Observable<Rates> = new Observable<{
    [key: string]: number;
  }>;
  result: number = 0;
  // currencies$: Observable<ApiResponse> = new Observable<{
  //   motd: {
  //     msg: '',
  //     url: '',
  //   },
  //   success: true,
  //   base: '',
  //   date: '',
  //   rates: {
  //     [key: string]: number;
  //   },
  // }>;

  constructor(private ratesService: RatesService) { }

  ngOnInit(): void {
    this.rates$ = this.ratesService.getRates('EUR');
  }

  onChangeAmount(amount: number) {
    console.log("amount", amount);
    return this.convAmount = amount;
  }

  onChangeOrigCurrency(value: string): string {
    return this.origCurrency = value;
  }

  onChangeDestCurrency(value: string): string {
    return this.destCurrency = value;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  convertCurrency() {
    console.log('values: ', this.origCurrency, this.destCurrency, this.convAmount);

  // service to fetch exchange rate for currency selected

    this.result = this.convAmount * 10;
  }
}
