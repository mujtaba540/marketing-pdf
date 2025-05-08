import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastMessageService } from '../../../shared/services/toast-message.service';
import {
  TOAST_DELAY,
  TOAST_HEADERS,
} from '../../../shared/constants/app.constants';
import { IToastIcons } from '../../../shared/interfaces/toastMessage.interface';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200; ',
  },
})
export class ToastComponent implements OnInit, OnDestroy {
  toastService = inject(ToastMessageService);
  delay = TOAST_DELAY;
  toastIcons!: IToastIcons[];

  ngOnInit(): void {
    this.toastIcons = [
      {
        title: TOAST_HEADERS.SUCCESS,
        icon: 'fa-solid fa-circle-check',
        class: 'bg-warning text-white',
      },
      {
        title: TOAST_HEADERS.ERROR,
        icon: 'fa-solid fa-circle-xmark',
        class: 'bg-danger text-white',
      },
      {
        title: TOAST_HEADERS.WARN,
        icon: 'fa-solid fa-circle-exclamation',
        class: 'bg-danger text-white',
      },
    ];
  }

  getIcon(header: string) {
    return this.toastIcons.find((e) => e.title === header)?.icon;
  }

  getClass(header: string) {
    return this.toastIcons.find((e) => e.title === header)?.class;
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
