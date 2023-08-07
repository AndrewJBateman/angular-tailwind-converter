import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rate } from '../models/currency';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html'
})
export class ResultsComponent {
  @Input() rate: Rate = {
    result: '',
    documentation: '',
    terms_of_use: '',
    time_last_update_unix: 0,
    time_last_update_utc:  '',
    time_next_update_unix: 0,
    time_next_update_utc:  '',
    base_code:  '',
    target_code:  '',
    conversion_rate:  0,
    conversion_result: 0,
  };
  @Input() display = false;
  @Input() amountConverted = 0;
}
