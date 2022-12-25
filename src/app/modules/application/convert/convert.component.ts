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
}
