import {
  Component,
  forwardRef,
  inject,
  Injector,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { NgClass } from '@angular/common';
import { getErrorMessage } from '../../../shared/utils/app.utils';

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true,
    },
  ],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',
})
export class InputRadioComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  private injector = inject(Injector);

  inputChange = output<any>();
  label = input<string>('');
  isSubmitted = input<boolean>();
  classList = input<string>('');
  name = input.required<string | number>();
  options =
    input<
      { value: string | boolean | number; label: string; name: string }[]
    >();

  control!: FormControl;
  value!: any;
  disabled!: boolean;
  private destroy: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.setComponentControl();
  }

  getOptionName(name: string) {
    return `${name}_${this.name()}`;
  }

  setComponentControl(): void {
    const injectedControl = this.injector.get(NgControl);

    switch (injectedControl.constructor) {
      case NgModel: {
        const { control, update } = injectedControl as NgModel;
        this.control = control;

        this.control.valueChanges
          .pipe(
            tap((value: any) => update.emit(value)),
            takeUntil(this.destroy)
          )
          .subscribe();
        break;
      }
      case FormControlName: {
        this.control = this.injector
          .get(FormGroupDirective)
          .getControl(injectedControl as FormControlName);
        break;
      }
      default: {
        this.control = (injectedControl as FormControlDirective)
          .form as FormControl;
        break;
      }
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};
  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onOptionChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouch();
    this.inputChange.emit(value);
  }

  showErrorMessage(control: FormControl, label: string) {
    return getErrorMessage(control, label);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
