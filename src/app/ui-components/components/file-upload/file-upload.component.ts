import { NgClass } from '@angular/common';
import { Component, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [NgClass],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  multiple = input<boolean>(false);
  disabled = input<boolean>(false);
  accept = input<string>('*');
  selectedFiles = output<FileList>();

  onClick(): void {
    this.fileInput.nativeElement.click();
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.setDragOverStyle(true);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.setDragOverStyle(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.setDragOverStyle(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.setDragOverStyle(false);

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(files: FileList): void {
    this.selectedFiles.emit(files);
  }

  setDragOverStyle(isDragOver: boolean): void {
    const uploadDiv = this.fileInput.nativeElement.previousElementSibling;
    if (isDragOver) {
      uploadDiv.classList.add('dragover');
    } else {
      uploadDiv.classList.remove('dragover');
    }
  }
}
