import { Component, Input } from '@angular/core';

@Component({
  selector: 'arria-notification-message-dialog',
  templateUrl: './notification-message-dialog.component.html',
  styleUrls: ['./notification-message-dialog.component.scss']
})
export class NotificationMessageDialogComponent {
  public title: string;
  public message: string;
}
