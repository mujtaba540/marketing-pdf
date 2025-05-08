import { Component, input } from '@angular/core';

@Component({
  selector: 'app-no-records-img',
  standalone: true,
  imports: [],
  templateUrl: './no-records-img.component.html',
  styleUrl: './no-records-img.component.scss',
})
export class NoRecordsImgComponent {
  imgWidth = input<string>('80');
  labelClass = input<string>('fs-6');
  label = input<string>('No Records');
}
