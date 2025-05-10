import { Component, input } from '@angular/core';
import { Page2Component } from '../page-2/page-2.component';
import { Page1Component } from '../page-1/page-1.component';
import { Page3Component } from '../page-3/page-3.component';

@Component({
  selector: 'app-print-view',
  imports: [Page2Component, Page1Component, Page3Component],
  templateUrl: './print-view.component.html',
  styleUrl: './print-view.component.scss',
})
export class PrintViewComponent {
  selectedProperty = input<any>();
  installmentsPlan = input<any>();
}
