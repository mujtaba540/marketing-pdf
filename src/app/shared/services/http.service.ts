import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { setQueryParams } from '../utils/app.utils';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);

  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(
      `${environment.BACKEND_URL}/${url}`,
      setQueryParams(params)
    );
  }

  post<T>(
    url: string,
    body: T,
    params?: Record<string, any>
  ): Observable<T> {
    return this.http.post<T>(
      `${environment.BACKEND_URL}/${url}`,
      body,
      setQueryParams(params)
    );
  }

  put<T>(url: string, body: T): Observable<T> {
    return this.http.put<T>(`${environment.BACKEND_URL}/${url}`, body);
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${environment.BACKEND_URL}/${url}`);
  }

  fileUpload(url: string, body: any, option: any): Observable<any> {
    return this.http.post<any>(
      `${environment.BACKEND_URL}/${url}`,
      body,
      option
    );
  }
}
