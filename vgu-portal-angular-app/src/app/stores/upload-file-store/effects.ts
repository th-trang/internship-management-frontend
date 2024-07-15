import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, takeUntil } from 'rxjs/operators';
import {serializeError} from 'serialize-error';
import * as fromFileUploadActions from './actions';
import { UploadFileService } from '../../services/file-upload.service';

@Injectable()
export class UploadFileEffects {
  uploadRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromFileUploadActions.ActionTypes.UPLOAD_REQUEST),
      concatMap(action =>
        this.fileUploadService.uploadFile(action.payload.file).pipe(
          takeUntil(
            this.actions$.pipe(
              ofType(fromFileUploadActions.ActionTypes.UPLOAD_CANCEL)
            )
          ),
          map(event => this.getActionFromHttpEvent(event)),
          catchError(error => of(this.handleError(error)))
        )
      )
    )
  )

  constructor(
    private fileUploadService: UploadFileService,
    private actions$: Actions<fromFileUploadActions.Actions>
  ) { }

  private getActionFromHttpEvent(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent: {
        return new fromFileUploadActions.UploadStartedAction();
      }
      case HttpEventType.UploadProgress: {
        return new fromFileUploadActions.UploadProgressAction({
          progress: Math.round((100 * event.loaded) / event.total)
        });
      }
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          return new fromFileUploadActions.UploadCompletedAction();
        } else {
          return new fromFileUploadActions.UploadFailedAction({
            error: event.statusText
          });
        }
      }
      default: {
        return new fromFileUploadActions.UploadFailedAction({
          error: `Unknown Event: ${JSON.stringify(event)}`
        });
      }
    }
  }

  private handleError(error: any) {
    const friendlyErrorMessage = serializeError(error).message;
    return new fromFileUploadActions.UploadFailedAction({
      error: friendlyErrorMessage
    });
  }
}