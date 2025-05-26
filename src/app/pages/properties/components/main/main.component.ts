import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { SelectComponent } from '../../../../ui-components/components/select/select.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../ui-components/components/input/input.component';
import { ButtonComponent } from '../../../../ui-components/components/button/button.component';
import { DateTime } from 'luxon';
import { Page2Component } from '../page-2/page-2.component';
import { parseNumber } from '../../../../shared/utils/app.utils';
import { InputRadioComponent } from '../../../../ui-components/components/input-radio/input-radio.component';
import { APPARTMENTS } from '../../../../shared/constants/new-apt';
import { VILLAS } from '../../../../shared/constants/new-villa';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PrintViewComponent } from '../print-view/print-view.component';
import { Page3Component } from '../page-3/page-3.component';
import { HttpService } from '../../../../shared/services/http.service';
import { finalize, take } from 'rxjs';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-main',
  imports: [
    SelectComponent,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    Page2Component,
    InputRadioComponent,
    NgbNavModule,
    PrintViewComponent,
    Page3Component,
  ],
  providers: [DatePipe, DecimalPipe, CurrencyPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private httpService = inject(HttpService);
  private datePipe = inject(DatePipe);
  private decimalPipe = inject(DecimalPipe);
  private currencyPipe = inject(CurrencyPipe);

  VILLAS = VILLAS;
  APPARTMENTS = APPARTMENTS;
  active = 1;
  templateForm!: FormGroup;
  selectedProperty!: any;
  installmentsPlan!: any;
  bookingDate!: any;
  selectedItemList!: any;
  radioOptions!: { value: string; label: string; name: string }[];
  brokerOptions!: { value: string; label: string; name: string }[];
  isLoading!: boolean;

  ngOnInit(): void {
    this.selectedItemList = APPARTMENTS;
    this.radioOptions = [
      { value: 'apartment', label: 'Apartment', name: 'apt' },
      { value: 'villa', label: 'Villa', name: 'villa' },
    ];
    this.brokerOptions = [
      { value: 'none', label: 'None', name: 'none' },
      { value: 'oliver', label: 'Oliver Rubens', name: 'oliver' },
      { value: 'diana', label: 'Diana Ameliushina', name: 'diana' },
    ];
    this.setPropertyForm();

    this.templateForm.get('propertyType')?.valueChanges.subscribe((value) => {
      this.selectedProperty = {};
      this.installmentsPlan = {};
    });
  }

  setPropertyForm() {
    this.templateForm = new FormGroup({
      property: new FormControl(null, Validators.required),
      bookingDate: new FormControl(null, Validators.required),
      propertyType: new FormControl('apartment', Validators.required),
      addKFLogo: new FormControl(true),
      brokderDetails: new FormControl('none'),
    });
  }

  getFormControl(control: string) {
    return this.templateForm.controls[control] as FormControl;
  }

  openPrint() {
    this.isLoading = true;
    const url = `generate-pdf`; // Ensure you're passing propertyName as well
    const { propertyType, addKFLogo, brokderDetails } =
      this.templateForm.getRawValue();
    this.httpService
      .postBlob(
        url,
        {
          ...this.selectedProperty,
          ...this.installmentsPlan,
          addKFLogo,
          brokderDetails,
        },
        { type: propertyType }
      )
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (blob) => {
          const fileName = `sales-offer-${this.selectedProperty.unit_code}.pdf`;
          // const fileName = `sales-offer-${this.selectedProperty.unit_code}.pdf`;
          saveAs(blob, fileName); // will trigger correct behavior on mobile/desktop

          // const blobUrl = URL.createObjectURL(blob);

          // const a = document.createElement('a');
          // a.href = blobUrl;
          // a.download = fileName;

          // document.body.appendChild(a);
          // a.click();

          // document.body.removeChild(a);
          // URL.revokeObjectURL(blobUrl);
        },
        error: (error) => {
          console.error('Error downloading PDF:', error);
        },
      });
  }

  onSubmit() {
    if (!this.templateForm.valid) {
      this.templateForm.markAllAsTouched();
    } else {
      const { property, bookingDate, propertyType } =
        this.templateForm.getRawValue();

      if (propertyType === 'apartment') {
        this.selectedProperty = APPARTMENTS.find(
          (el: any) => el.unit_code === property
        );
        this.selectedProperty.isAppartment = true;
        this.selectedProperty.propertyType =
          this.selectedProperty?.bedrooms.toLowerCase() ===
          '5 bedroom'.toLowerCase()
            ? 'Penthouse'
            : 'Apartment';
      } else {
        this.selectedProperty = VILLAS.find(
          (el: any) => el.unit_code.toLowerCase() === property.toLowerCase()
        );
        this.selectedProperty.isAppartment = false;
        this.selectedProperty.propertyType =
          this.selectedProperty?.type.split(' ')[0] ?? 'Villa';

        this.selectedProperty.total_sqft = this.selectedProperty.sqft ?? 0;
        this.selectedProperty.bua_sqft = this.decimalPipe.transform(
          10.7639 * this.selectedProperty?.bua,
          '1.2-2'
        );
        this.selectedProperty.plot_area_sqft = this.decimalPipe.transform(
          10.7639 * this.selectedProperty?.plot_area,
          '1.2-2'
        );
      }

      this.selectedProperty.currentDate = this.datePipe.transform(
        new Date(),
        'dd/MM/yyyy'
      );
      const baseDate = DateTime.fromISO(bookingDate);
      const totalPrice = parseNumber(this.selectedProperty?.full_payment);
      const totalPriceTwo = parseNumber(this.selectedProperty?.year_payment);
      this.installmentsPlan = this.getPaymentSchedule(
        totalPrice,
        totalPriceTwo,
        baseDate
      );
      const full_payment = this.selectedProperty.full_payment;
      const year_payment = this.selectedProperty.year_payment;
      // ----- rates -----
      this.selectedProperty.full_payment_one = this.currencyPipe.transform(
        full_payment,
        'AED ',
        'code',
        '1.2-2'
      );
      this.selectedProperty.year_payment_one = this.currencyPipe.transform(
        year_payment,
        'AED ',
        'code',
        '1.2-2'
      );

      // ----- table rates -----
      this.selectedProperty.full_payment_table = this.currencyPipe.transform(
        full_payment * 0.02,
        'AED ',
        'code',
        '1.2-2'
      );
      this.selectedProperty.year_payment_table = this.currencyPipe.transform(
        year_payment * 0.02,
        'AED ',
        'code',
        '1.2-2'
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
        { label: 'On completion', monthsGap: 0, percentage: 50 }, // fixed date
      ],
      option2: [
        { label: 'Booking Date', monthsGap: 0, percentage: 10 },
        { label: '1st installment', monthsGap: 3, percentage: 10 },
        { label: '2d installment', monthsGap: 6, percentage: 10 },
        { label: '3d installment', monthsGap: 9, percentage: 10 },
        { label: '4th installment', monthsGap: 12, percentage: 10 },
        { label: 'On completion', monthsGap: 0, percentage: 20 }, // fixed date
        { label: '1st PH installment', monthsGap: 12, percentage: 15 }, // after completion
        { label: '2d PH installment', monthsGap: 24, percentage: 15 }, // after completion
      ],
    };

    const addMonths = (date: Date, months: number): Date => {
      const result = new Date(date);
      result.setMonth(result.getMonth() + months);
      return result;
    };

    const booking =
      typeof bookingDate === 'string' ? new Date(bookingDate) : bookingDate;

    const completionDate = new Date('2027-03-31');

    const calculate = (
      schedule: { label: string; monthsGap: number; percentage: number }[],
      inputPrice: number
    ) => {
      return schedule.map((entry) => {
        let date: Date;

        const labelLower = entry.label.toLowerCase();
        if (labelLower === 'on completion') {
          date = completionDate;
        } else if (labelLower.includes('ph installment')) {
          date = addMonths(completionDate, entry.monthsGap);
        } else {
          date = addMonths(booking, entry.monthsGap);
        }

        return {
          label: entry.label,
          monthsGap: entry.monthsGap,
          percentage: `${entry.percentage}%`,
          amount: this.decimalPipe.transform(
            (inputPrice * entry.percentage) / 100,
            '1.2-2'
          ),
          date: this.datePipe.transform(date, 'dd/MM/yyyy'),
        };
      });
    };

    const option1 = calculate(schedules.option1, price);
    const option2 = calculate(schedules.option2, pricetwo);

    return { option1, option2 };
  }
}
