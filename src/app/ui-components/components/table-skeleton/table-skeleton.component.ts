import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [NgClass],
  templateUrl: './table-skeleton.component.html',
  styleUrls: ['./table-skeleton.component.scss'],
})
export class TableSkeletonComponent {
  @Input() padding: any;
  @Input() column: number = 4; // Default value to 4 columns
  @Input() row: number = 4; // Default value to 4 rows
  @Input() classList: any; // Default value to 4 rows

  constructor() {}

  getColumnsArray(): number[] {
    return Array.from({ length: this.column }, (_, i) => i + 1);
  }

  getRowArray(): number[] {
    return Array.from({ length: this.row }, (_, i) => i + 1);
  }
}
