import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UploadFileEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('uploadFile', featureReducer),
    EffectsModule.forFeature([UploadFileEffects])
  ]
})
export class UploadFileStoreModule { }
