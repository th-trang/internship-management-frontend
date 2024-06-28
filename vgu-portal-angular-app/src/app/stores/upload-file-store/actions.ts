import { Action } from "@ngrx/store";

export enum ActionTypes {
    UPLOAD_REQUEST = '[File Upload Form] Request',
    UPLOAD_CANCEL = '[File Upload Form] Cancel',
    UPLOAD_RESET = '[File Upoad Form] Reset',
    UPLOAD_STARTED = '[File Upload API] Started',
    UPLOAD_PROGRESS = '[File Upload API] Progress',
    UPLOAD_COMPLETED = '[File Upload API] Success',
    UPLOAD_FAILED = '[File Upload API] Failed',
}

export class UploadRequestAction implements Action {
    readonly type = ActionTypes.UPLOAD_REQUEST;
    constructor(public payload: { file: File }) { }
}

export class UploadCancelAction implements Action {
    readonly type = ActionTypes.UPLOAD_CANCEL;
}

export class UploadResetAction implements Action {
    readonly type = ActionTypes.UPLOAD_RESET;
}

export class UploadStartedAction implements Action {
    readonly type = ActionTypes.UPLOAD_STARTED;
}

export class UploadProgressAction implements Action {  
    readonly type = ActionTypes.UPLOAD_PROGRESS;
    constructor(public payload: { progress: number }) { }
}

export class UploadFailedAction implements Action {
    readonly type = ActionTypes.UPLOAD_FAILED;
    constructor(public payload: { error: string }) { }
}

export class UploadCompletedAction implements Action {
    readonly type = ActionTypes.UPLOAD_COMPLETED;
}

export type Actions = 
    | UploadRequestAction 
    | UploadCancelAction 
    | UploadResetAction 
    | UploadStartedAction 
    | UploadProgressAction 
    | UploadFailedAction 
    | UploadCompletedAction;