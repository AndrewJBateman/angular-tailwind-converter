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
  }

  onChangeOrigCurrency(convAmount: string) {

  }

  onChangeDestCurrency(convAmount: string) {

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
