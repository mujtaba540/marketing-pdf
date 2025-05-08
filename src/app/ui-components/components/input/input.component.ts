import { KeyValuePipe, NgClass } from '@angular/common';
import { Component, ViewEncapsulation, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FORM_ERROR_MESSGAES } from '../../../shared/constants/error-messages';
import { getErrorMessage } from '../../../shared/utils/app.utils';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, KeyValuePipe, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {
  errorMessages = FORM_ERROR_MESSGAES;

  controlName = input.required<FormControl>();
  label = input<string>('');
  placeholder = input<string>('Please enter ');
  name = input.required<string>();
  required = input<boolean>(false);
  readOnly = input<boolean>(false);
  value = input<string>('&nbsp;');
  type = input<string>('text');
  icon = input<string | null>(null);
  hideIcon = input<string | null>(null);
  hintText = input<string>();
  labelClassList = input<string>('fw-bold');
  inputTagClass = input<string>('');
  onHideIconClick = output();
  onInputChange = output<any>();

  showErrorMessage(control: FormControl, label: string) {
    return getErrorMessage(control, label);
  }

  inputChange(event: Event) {
    this.onInputChange.emit(event);
  }

  hideIconClickAction() {
    this.onHideIconClick.emit();
  }
}
