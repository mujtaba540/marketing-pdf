import { NgClass } from '@angular/common';
import {
  Component,
  Injector,
  computed,
  forwardRef,
  inject,
  input,
  output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, NgSelectModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit, OnDestroy {
  private injector = inject(Injector);

  public control!: FormControl;
  public value!: any;
  destroy: Subject<void> = new Subject<void>();
  disabled!: boolean;

  label = input<string>('');
  isSubmitted = input<boolean>();
  placeholder = input<string>('Please select');
  name = input.required<string>();
  required = input<boolean>(false);
  readonly = input<boolean>(false);
  size = input<string>('md');
  width = input<string>('auto');
  isDataLoading = input<boolean>(false);

  prefix = input<boolean>();
  clerable = input<boolean>(false);
  icon = input<string>();
  additionalLabel = input<string>();
  loader = input<boolean>(false);
  items = input.required<any[]>();
  bindLabel = input<string>('name');
  bindValue = input<string>('id');
  multiple = input<boolean>(false);
  selectClassList = input<string>('');

  inputChange = output<string | number>();
  valueChange = output();
  change = output<any>();
  clear = output<any>();
  selectionFocus = output<any>();
  additionalLabelClick = output<any>();

  public ngOnInit(): void {
    this.setComponentControl();
  }

  //Output Event function

  additionalLabelEvent(event: any) {
    this.additionalLabelClick.emit(this.control);
  }

  onClear(event: any) {
    this.valueChange.emit(event);
    const item = computed(
      () => this.items()?.filter((a) => a[this.bindValue()] == event)[0],
    );
    this.clear.emit(item());
  }
  onSelectionChange(event: any) {
    const item = computed(() =>
      this.items()?.filter((a) => a[this.bindValue()] == event),
    );
    this.onChange(event);
    this.onTouch();
    this.change.emit(item());
    this.valueChange.emit(event);
  }

  onFocus() {
    this.selectionFocus.emit(null);
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
            takeUntil(this.destroy),
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

  //value Accessor functions
  onChange: any = () => {};
  onTouch: any = () => {};
  private onTouched: any = () => {};
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

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnDisabledChange(fn: () => void): void {
    this.onChange = fn;
  }
  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
