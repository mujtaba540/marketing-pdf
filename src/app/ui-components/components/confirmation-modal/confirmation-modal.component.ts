import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_ACTIONS } from '../../../shared/constants/app.constants';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  private activeModal = inject(NgbActiveModal);
  @Input() modalLabel!: string;
  actions = MODAL_ACTIONS;
  closeModal(arg: string) {
    this.activeModal.close(arg);
  }
}
