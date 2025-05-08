import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-button',
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
  type = input<string>('button');
  classList = input<string>();
  labelClassList = input<string>();
  label = input<string>();
  disabled = input<boolean>();
  showSpinner = input<boolean>();
  icon = input<string>();
  onClick = output();

  clickAction() {
    this.onClick.emit();
  }
}
