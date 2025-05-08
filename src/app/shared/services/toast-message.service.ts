import { Injectable } from '@angular/core';
import { IToastMessage } from '../interfaces/toastMessage.interface';
import { TOAST_HEADERS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  toasts: IToastMessage[] = [];

  private show(toast: IToastMessage) {
    this.toasts.push(toast);
  }

  remove(toast: IToastMessage) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  showSuccessToastMessage(message: string) {
    this.show({ header: TOAST_HEADERS.SUCCESS, message });
  }
  showErrorToastMessage(message: string) {
    this.show({ header: TOAST_HEADERS.ERROR, message });
  }
  showWarnToastMessage(message: string) {
    this.show({ header: TOAST_HEADERS.WARN, message });
  }
}
