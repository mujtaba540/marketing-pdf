import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeUrl',
})
export class SanitizeUrlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);
  transform(value: any): unknown {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
