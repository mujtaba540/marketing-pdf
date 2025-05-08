import { Component, inject, Input, input } from '@angular/core';
import { ButtonComponent } from '../../../ui-components/components/button/button.component';
import { NgbActiveModal, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preview-img',
  imports: [ButtonComponent, NgbCarouselModule],
  templateUrl: './preview-img.component.html',
  styleUrl: './preview-img.component.scss',
})
export class PreviewImgComponent {
  private activeModal = inject(NgbActiveModal);

  @Input() imgSrc!: string;

  closeModal() {
    this.activeModal.close();
  }
}
