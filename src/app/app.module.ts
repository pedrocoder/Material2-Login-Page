import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupService } from './signup/signup.service';
import { NotificationMessageDialogComponent } from './notification-message-dialog/notification-message-dialog.component';
import { DialogService } from './shared/dialog.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationMessageDialogComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [SignupService, DialogService],
  bootstrap: [AppComponent],
  entryComponents: [
    NotificationMessageDialogComponent,
  ]
})
export class AppModule { }
