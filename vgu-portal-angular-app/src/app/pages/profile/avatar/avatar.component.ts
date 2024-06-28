import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AvatarComponent,
    }
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent implements OnInit, ControlValueAccessor {

  file: string = '';
  onChange = (fileUrl: string) => { };
  onTouched = () => { };
  disabled: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }


  //this method is called by the Forms module to write a value into a form control
  writeValue(obj: any): void {
    this.file = obj;
  }

  //this callback function is called when the control's value changes in the UI
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  //this callback function is called to report the parent when the control is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  //this method is to transmit the states (disabled or enabled) of the form control
  //via Forms API
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFileChange($event: any) {
    const files = $event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.resetInput();
      this.openAvatarEditor(_file).subscribe((result) => {
        if(result) {
          this.file = result;
          this.onChange(this.file);
        }
      })
    }
  }

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

  openAvatarEditor(image: string): Observable<any> {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: image,
    });
    return dialogRef.afterClosed();
  }
}
