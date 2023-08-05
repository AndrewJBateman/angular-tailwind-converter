import { RatesService } from './../convert/services/rates.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Rate } from '../convert/models/currency';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  rate$!: Observable<Rate> | undefined;


  constructor(private ratesService: RatesService) {}

  ngOnInit(): void {
    this.rate$ = this.ratesService.getRate();
  }
}
