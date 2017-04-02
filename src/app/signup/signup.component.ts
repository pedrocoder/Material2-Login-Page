import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { fadeInOutTrigger } from '../animations';
import { ValidationMessageTypes } from '../shared/validation-message-types';
import { SignupRequest } from './signup-request.interface';
import { SignupService } from './signup.service';
import { DialogService } from '../shared/dialog.service';
@Component({
  selector: 'arria-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [fadeInOutTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  @Output() toggleForm = new EventEmitter();

  public signupForm: FormGroup;
  public firstName: FormControl;
  public surname: FormControl;
  public email: FormControl;
  public password: FormControl;
  public repeatedPassword: FormControl;

  public signupFormShowing = false;
  public isSubmissionAttempted = false;
  public requiredMessage = ValidationMessageTypes.Required;
  public invalidEmailMessage = ValidationMessageTypes.EmailInvalid;
  public passwordsNotMatchingMessage = ValidationMessageTypes.PasswordsNotMatching;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService, private dialogService: DialogService) {}

  ngOnInit() {
    this.firstName = new FormControl('', Validators.required);
    this.surname = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.compose([CustomValidators.email, Validators.required]));
    this.password = new FormControl('', Validators.required);
    this.repeatedPassword = new FormControl('', Validators.compose([CustomValidators.equalTo(this.password), Validators.required]));

    this.signupForm = this.formBuilder.group({
      firstName: this.firstName,
      surname: this.surname,
      email: this.email,
      password: this.password,
      repeatedPassword: this.repeatedPassword,
    });
  }

  clearForm () {
    this.isSubmissionAttempted = false;
    this.signupForm.reset();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const request: SignupRequest = {
        firstName: this.firstName.value,
        surname: this.surname.value,
        email: this.email.value,
        password: this.password.value,
        repeatedPassword: this.repeatedPassword.value,
      };
      this.signupService.signup(request)
        .subscribe(
          data => {
            console.log('signup call was made succesfully');
            this.clearForm();
            this.onToggleForm();
          },
          err => this.dialogService.openNotificationMessageDialog('Error', 'Error occured. Server might be down. Please try again later.')
        );
    } else {
      this.isSubmissionAttempted = true;
    }
  }

  onToggleForm() {
    this.signupFormShowing = !this.signupFormShowing;
    this.toggleForm.emit();
  }
}
