import { Component, OnInit } from '@angular/core';
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
    this.ratesService
      .convertCurrency(this.formChanges.value)
      .subscribe((data) => {
        this.ratesService.setRate(data);
        this.formChanges.reset();
      });
  }
}
