import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { fadeInOutTrigger } from '../animations';
import { ValidationMessageTypes } from '../shared/validation-message-types';
@Component({
  selector: 'arria-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInOutTrigger]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public userName: FormControl;
  public password: FormControl;

  public isLoginFormHidden = false;
  public footerFlexHeight = '20';
  public isSubmissionAttempted = false;
  public requiredMessage = ValidationMessageTypes.Required;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userName = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.loginForm = this.formBuilder.group({
      userName: this.userName,
      password: this.password
    });
  }

  public toggleLoginForm() {
    this.isLoginFormHidden = !this.isLoginFormHidden;
    this.footerFlexHeight = this.isLoginFormHidden ? '70' : '20';
  }
  onSubmit(): void {
    this.isSubmissionAttempted = true;
  }
}
