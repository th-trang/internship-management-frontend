import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {  provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from "@angular/material/core"; 
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(RouterModule.forChild(routes)),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(MatNativeDateModule),
    //provideStore(featureReducer, { metaReducers }),
    importProvidersFrom(StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    })),
    importProvidersFrom(StoreModule.forRoot()),
    importProvidersFrom(EffectsModule.forRoot([])),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule)
]
};
