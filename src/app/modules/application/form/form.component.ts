import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RatesService } from '../convert/services/rates.service';
import { FormData } from '../../../modules/application/convert/models/currency';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  title = 'convertor';
  formChanges!: FormGroup;
  currencies$!: Observable<string[]>;
  subscription!: Subscription;

  ratesService = inject(RatesService);
  fb = inject(FormBuilder);
  currencyListData = this.ratesService.currencyListData;
  currenciesAndAmountSelected = signal<FormData>({
    amount: 0,
    currency1: 'USD',
    currency2: 'EUR',
  });

  ngOnInit(): void {
    this.formChanges = this.fb.group({
      amount: ['', Validators.required],
      currency1: ['', Validators.required],
      currency2: ['', Validators.required],
    });
  }

  onSubmitForm() {
    // this.currenciesAndAmountSelected.set(this.formChanges.value);
    console.log('form value: ', this.formChanges);
    this.ratesService
    .convertCurrency(this.formChanges.value)
    .subscribe((data) => {
      this.ratesService.setRate(data);
      this.formChanges.reset();
    });
  }
}
