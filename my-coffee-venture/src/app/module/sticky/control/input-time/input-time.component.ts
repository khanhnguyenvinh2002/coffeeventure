import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputMask } from 'primeng/inputmask';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTimeComponent),
    multi: true
  }]
})
export class InputTimeComponent implements OnInit {
  @Input() disabled: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  /**
   * Holds the current value of the slider
   */
  viewValue = null;
  _value = null;
  get value(): any {
    return this._value;
  }
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.viewValue = this.transformValueToView(this._value);
      this.onChange(v);
      this.change.emit(v);
    }
  }
  private transformValueToView(value: string) {
    if (value) {
      const values = value.replace(/-/g, ':').split(':');
      const hour = values[0];
      const minute = values[1];
      return `${this.pad(hour)}:${this.pad(minute)}`;
    } else {
      return null;
    }
  }

  /**
   * Invoked when the model has been changed
   */
  onChange: (_: any) => void = (_: any) => { };

  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => { };

  constructor(public cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  /**
   * Method that is invoked on an update of a model.
   */
  updateChanges() {
    this.onChange(this._value);
  }

  ///////////////
  // OVERRIDES //
  ///////////////

  /**
   * Writes a new item to the element.
   * @param value the value
   */
  writeValue(value: string): void {
    const result = this.checkStringDate(value);
    if (result.result && this._value !== result.value) {
      this._value = result.value;
      this.updateChanges();
    } else if (!result.result) {
      this._value = null;
      this.updateChanges();
    }
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control receives a blur event.
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private checkStringDate(stringValue: string | Date | null): any {
    const result = {
      result: true,
      value: null
    };

    if (stringValue) {
      const date = new Date(stringValue);
      if (isNaN(date.getDate())) {
        result.result = false;
        this.viewValue = null;
      } else {
        const hour = date.getHours();
        const minute = date.getMinutes();
        if (!this.isValidDate(hour, minute)) {
          result.result = false;
          this.viewValue = null;
        } else {
          result.value = `${this.pad(hour)}:${this.pad(minute)}`;
          this.viewValue = `${this.pad(hour)}:${this.pad(minute)}`;
        }
      }
    }
    return result;
  }

  private pad(a: number | string): string {
    if (+a < 10) {
      return '0' + +a;
    } else {
      return '' + +a;
    }
  }

  /**
   * Check valid date
   */
  private isValidDate(hour: number, minute: number): boolean {
    const now = new Date();
    const d = new Date(now.getUTCFullYear(), now.getMonth(), now.getDate(), hour, minute);
    if (d.getHours() === +hour && d.getMinutes() === +minute) {
      return true;
    }
    return false;
  }

  public onBlurInputMask(): void {
    if (!this.viewValue) {
      this.resetValue();
    } else {
      this.viewValue = this.viewValue.replace(/-/g, ':');
      const values = this.viewValue.split(':');
      const hour = values[0];
      const minute = values[1];
      if (this.isValidDate(hour, minute)) {
        this.value = `${this.pad(hour)}:${this.pad(minute)}`;
      } else {
        this.resetValue();
      }
    }
  }

  public onCompleteInputMask(): void {
    if (this.viewValue) {
      const values = this.viewValue.split(':');
      const hour = values[0];
      const minute = values[1];
      if (this.isValidDate(hour, minute)) {
        this.value = `${this.pad(hour)}:${this.pad(minute)}`;
      } else {
        this.value = null;
      }
    }
  }

  public onInput(control: InputMask): void {
    // When clear
    if (control.value === control.slotChar) {
      this.resetValue();
    } else {
      if (!control.isCompleted()) {
        this.value = null;
      }
    }
  }

  private resetValue(): void {
    this.value = null;
    this.viewValue = null;
    // tslint:disable-next-line:no-string-literal
    if (this.cd && !this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }
}
