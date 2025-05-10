import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { parseNumber } from '../../../../shared/utils/app.utils';

@Component({
  selector: 'app-page-2',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './page-2.component.html',
  styleUrl: './page-2.component.scss',
})
export class Page2Component {
  selectedProperty = input<any>();
  installmentsPlan = input<any>();

  getCalculatedAdmFee(val: any) {
    if (val) return parseNumber(val) * 0.02;
    return '';
  }

  getCurrentDate() {
    return new Date();
  }

  getPropertyType() {
    if (this.selectedProperty()?.isAppartment) {
      return this.selectedProperty()?.bedrooms.toLowerCase() === '5 Bedroom'
        ? 'Penthouse'
        : 'Appartment';
    }
    return '';
  }
}
