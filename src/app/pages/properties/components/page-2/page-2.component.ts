import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-page-2',
  imports: [],
  templateUrl: './page-2.component.html',
  styleUrl: './page-2.component.scss',
})
export class Page2Component {
  selectedProperty = input<any>();
  installmentsPlan = input<any>();
  selectedPricingPlan = input<string>();
}
