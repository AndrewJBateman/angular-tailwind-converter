import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RatesService } from '../services/rates.service';
import { Rate } from '../models/currency';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ResultsComponent],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  title = 'exchange rate API data';
  formChanges!: FormGroup;
  currencyRate$!: Observable<Rate>;
  display = false;
  amountConverted!: number;

  ratesService = inject(RatesService);
  fb = inject(FormBuilder);

  currencyListData = this.ratesService.currencyListData;

  // initialise form with validators
  ngOnInit(): void {
    this.formChanges = this.fb.group({
      amount: ['', Validators.required],
      currency1: ['', Validators.required],
      currency2: ['', Validators.required],
    });
  }

  // fetch exchange rate info via API using form data input
  // extract amount converted as this is not included in the API info
  // reset form to empty form fields
  onSubmitForm() {
    this.currencyRate$ = this.ratesService.convertCurrency(
      this.formChanges.value
    );
    this.amountConverted = this.formChanges.value.amount;
    this.formChanges.reset();
  }
}
