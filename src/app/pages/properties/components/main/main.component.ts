import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SelectComponent } from '../../../../ui-components/components/select/select.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../ui-components/components/input/input.component';
import { ButtonComponent } from '../../../../ui-components/components/button/button.component';
import { VILLAS } from '../../../../shared/constants/villas';
import { APPARTMENTS } from '../../../../shared/constants/appartments';
import { DateTime } from 'luxon';
import { replacePage8 } from '../../../../shared/constants/pdf';
import { Page1Component } from '../page-1/page-1.component';
import { Page2Component } from '../page-2/page-2.component';
import { parseNumber } from '../../../../shared/utils/app.utils';
import { InputRadioComponent } from '../../../../ui-components/components/input-radio/input-radio.component';

@Component({
  selector: 'app-main',
  imports: [
    SelectComponent,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    Page1Component,
    Page2Component,
    InputRadioComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @ViewChild('htmlContent') htmlContentRef!: ElementRef;

  VILLAS = VILLAS;
  APPARTMENTS = APPARTMENTS;

  templateForm!: FormGroup;
  selectedProperty!: any;
  installmentsPlan!: any;
  bookingDate!: any;
  selectedItemList!: any;
  radioOptions!: { value: string; label: string; name: string }[];

  ngOnInit(): void {
    this.selectedItemList = APPARTMENTS;
    this.radioOptions = [
      { value: 'appartment', label: 'Appartment', name: 'apt' },
      { value: 'villa', label: 'Villa', name: 'villa' },
    ];
    this.setPropertyForm();
  }

  setPropertyForm() {
    this.templateForm = new FormGroup({
      property: new FormControl(null, Validators.required),
      bookingDate: new FormControl(null, Validators.required),
      propertyType: new FormControl('appartment', Validators.required),
    });
  }

  getFormControl(control: string) {
    return this.templateForm.controls[control] as FormControl;
  }

  openPrint() {
    window.print();
  }

  onSubmit() {
    if (!this.templateForm.valid) {
      this.templateForm.markAllAsTouched();
    } else {
      const { property, bookingDate, propertyType } =
        this.templateForm.getRawValue();
      if (propertyType === 'appartment') {
        this.selectedProperty = APPARTMENTS.find(
          (el: any) => el.unit_code === property
        );
        this.selectedProperty.isAppartment = true;
        this.selectedProperty.propertyType = true
          ? this.selectedProperty?.bedrooms.toLowerCase() ===
            '5 bedroom'.toLowerCase()
            ? 'Penthouse'
            : 'Appartment'
          : '';
        const totalSQT = parseNumber(this.selectedProperty?.total_sqft);

        const balSQT = parseNumber(this.selectedProperty?.balconies);

        this.selectedProperty.bua = totalSQT - balSQT;
      } else {
        this.selectedProperty = VILLAS.find(
          (el: any) => el.unit_code.toLowerCase() === property.toLowerCase()
        );
        this.selectedProperty.isAppartment = false;
        this.selectedProperty.propertyType =
          this.selectedProperty?.villa_type.split(' ')[0] ?? 'Villa';

        const totalSQT = parseNumber(this.selectedProperty?.total_sqft);
        const balSQT = parseNumber(this.selectedProperty?.balconies);
        this.selectedProperty.total_sqft = this.selectedProperty.sqft ?? 0;
        // this.selectedProperty.bua = totalSQT - balSQT;
      }

      const baseDate = DateTime.fromISO(bookingDate);
      const totalPrice = parseNumber(
        this.selectedProperty?.full_payment_completion
      );
      const totalPriceTwo = parseNumber(
        this.selectedProperty?.year_payment_plan
      );
      this.installmentsPlan = this.getPaymentSchedule(
        totalPrice,
        totalPriceTwo,
        baseDate
      );
    }
  }

  getPaymentSchedule(price: number, pricetwo: number, bookingDate: any) {
    const schedules = {
      option1: [
        { label: 'Booking Date', monthsGap: 0, percentage: 10 },
        { label: '1st installment', monthsGap: 3, percentage: 10 },
        { label: '2d installment', monthsGap: 6, percentage: 10 },
        { label: '3d installment', monthsGap: 9, percentage: 10 },
        { label: '4th installment', monthsGap: 12, percentage: 10 },
        { label: 'On completion', monthsGap: 21, percentage: 50 },
      ],
      option2: [
        { label: 'Booking Date', monthsGap: 0, percentage: 10 },
        { label: '1st installment', monthsGap: 3, percentage: 10 },
        { label: '2d installment', monthsGap: 6, percentage: 10 },
        { label: '3d installment', monthsGap: 9, percentage: 10 },
        { label: '4th installment', monthsGap: 12, percentage: 10 },
        { label: 'On completion', monthsGap: 22, percentage: 20 },
        { label: '1st PH installment', monthsGap: 34, percentage: 15 },
        { label: '2d PH installment', monthsGap: 46, percentage: 15 },
      ],
    };

    const addMonths = (date: Date, months: number): Date => {
      const result = new Date(date);
      result.setMonth(result.getMonth() + months);
      return result;
    };

    const booking =
      typeof bookingDate === 'string' ? new Date(bookingDate) : bookingDate;

    const calculate = (
      schedule: { label: string; monthsGap: number; percentage: number }[],
      inputPrice: number
    ) => {
      return schedule.map((entry) => ({
        label: entry.label,
        monthsGap: entry.monthsGap,
        percentage: `${entry.percentage}%`,
        amount: (inputPrice * entry.percentage) / 100,
        date: addMonths(booking, entry.monthsGap),
      }));
    };

    const option1 = calculate(schedules.option1, price);
    const option2 = calculate(schedules.option2, pricetwo);

    return { option1, option2 };
  }
}
