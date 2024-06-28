import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dropzone]',
  standalone: true
})
export class DropzoneDirective {

  constructor() { }

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();
  @Output() hoverEdned = new EventEmitter<boolean>();
  
  @HostListener('drop', ['$event'])
  onDrop($event) {
      $event.preventDefault();
      this.dropped.emit($event.dataTransfer.files);
      this.hovered.emit(false);
  }


  @HostListener('dragover', ['$event'])
  onDragOver($event: DragEvent) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.hovered.emit(false);
  }
}
