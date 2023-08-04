import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RatesService } from './services/rates.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
})
export class ConvertComponent implements OnInit {
  title = 'convertor';
  formChanges!: FormGroup;
  currencies$!: Observable<string[]>;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private ratesService: RatesService) {}

  ngOnInit(): void {
    this.formChanges = this.fb.group({
      amount: ['', Validators.required],
      currency1: ['', Validators.required],
      currency2: ['', Validators.required],
    });
    this.currencies$ = this.ratesService.getAllCurrencies();
    console.log(
      'currencies: ',
      this.currencies$.subscribe((x) => console.log(x))
    );
  }

  onSubmitForm() {
    console.log('form value: ', this.formChanges);
    // this.ratesService
  }
}
