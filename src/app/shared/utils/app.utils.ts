import { FormControl } from '@angular/forms';
import { ACCESS_TOKEN, AUTH_USER } from '../constants/app.constants';
import { HttpParams } from '@angular/common/http';

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function setAuthUser(user: any) {
  localStorage.setItem(AUTH_USER, JSON.stringify(user));
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getAuthUser() {
  return localStorage.getItem(AUTH_USER);
}

export function deleteAuthUser() {
  localStorage.removeItem(AUTH_USER);
}

export function deleteAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}

export function setJWTToken(): Record<string, string | string[]> {
  return { Authorization: `Bearer ${getAccessToken()}` };
}

export function getErrorMessage(control: FormControl, label: string) {
  let errorMessage = '';
  const labelText = label ? label : 'Field';
  if (control.hasError('required')) {
    errorMessage = `${labelText} is required`;
  } else if (control.hasError('email')) {
    errorMessage = `Enter a valid email address`;
  } else if (control.hasError('minlength')) {
    errorMessage = `${labelText} should have minimum ${
      control.getError('minlength').requiredLength
    } characters `;
  } else if (control.hasError('maxlength')) {
    errorMessage = `${labelText} should have maximum ${
      control.getError('maxlength').requiredLength
    } characters`;
  } else if (control.hasError('passwordNoMatch')) {
    errorMessage = `${labelText} doesnot match with password`;
  } else if (control.hasError('minAge')) {
    errorMessage = `Age must be at least 18 years old`;
  } else if (control.hasError('min')) {
    errorMessage = `${labelText} should have minimum ${
      control.getError('min').min
    } `;
  }
  return errorMessage;
}

// -------------- set query params -------------
export function setQueryParams(params?: Record<string, any>) {
  return params ? { params: new HttpParams({ fromObject: params }) } : {};
}

export function parseNumber(value: any): number {
  if (typeof value === 'string') {
    const num = Number(value.replace(/,/g, ''));
    return isNaN(num) ? 0 : num;
  }
  if (typeof value === 'number') {
    return value;
  }
  return 0;
}
