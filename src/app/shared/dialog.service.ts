import { Observable } from 'rxjs/Rx';
import { NotificationMessageDialogComponent } from '../notification-message-dialog/notification-message-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    public openNotificationMessageDialog(title: string, message: string): Observable<void> {
        let dialogRef: MdDialogRef<NotificationMessageDialogComponent>;
        dialogRef = this.dialog.open(NotificationMessageDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    }
}
