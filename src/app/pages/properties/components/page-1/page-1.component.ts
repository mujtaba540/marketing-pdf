import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-1',
  imports: [],
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.scss',
})
export class Page1Component {
  selectedProperty = input<any>();
}
