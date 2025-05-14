import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-3',
  imports: [NgClass],
  templateUrl: './page-3.component.html',
  styleUrl: './page-3.component.scss',
})
export class Page3Component {
  imgUrl = input<any>();
  isApartment = input<any>();
}
