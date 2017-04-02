import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { FormGroup, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { SignupService } from './signup.service';
import { DialogService } from '../shared/dialog.service';

import { SignupComponent } from './signup.component';
class SignupServiceStub {
  signup() { return Observable.of('test'); }
}
class DialogServiceStub {
  openNotificationMessageDialog() { return Observable.of(); }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signupService: SignupServiceStub;
  let dialogService: DialogServiceStub;
  const expectedEmail = 'test@gmail.com';
  const invalidEmail = '';
  const expectedMessage = 'test';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ SignupComponent ],
      providers: [
        { provide: SignupService, useClass: SignupServiceStub },
        { provide: DialogService, useClass: DialogServiceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([SignupService, DialogService], (es, ds) => {
    signupService = es;
    dialogService = ds;
  }));

  function setFormToValid () {
    component.signupForm.get('firstName').setValue(expectedMessage);
    component.signupForm.get('surname').setValue(expectedMessage);
    component.signupForm.get('email').setValue(expectedEmail);
    component.signupForm.get('password').setValue(expectedMessage);
    component.signupForm.get('repeatedPassword').setValue(expectedMessage);
  }

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.signupForm instanceof FormGroup).toBe(true);
  });

  describe('onSubmit', () => {
    it('should send correct parameters in signup request', () => {
      const emailSendSpy = spyOn(signupService, 'signup').and.returnValue(Observable.of());
      setFormToValid();
      component.onSubmit();
      expect(signupService.signup).toHaveBeenCalledWith(
        {
          firstName: expectedMessage,
          surname: expectedMessage,
          email: expectedEmail,
          password: expectedMessage,
          repeatedPassword: expectedMessage,
        }
      );
    });
    it('should not send request when form email is invalid', () => {
      const signupSpy = spyOn(signupService, 'signup').and.returnValue(Observable.of());
      setFormToValid();
      component.signupForm.get('email').setValue(invalidEmail);
      component.onSubmit();
      expect(signupService.signup).not.toHaveBeenCalled();
    });

    it('should not send request when firstName is required', () => {
      const signupSpy = spyOn(signupService, 'signup').and.returnValue(Observable.of());
      setFormToValid();
      component.signupForm.get('firstName').setValue('');
      component.onSubmit();
      expect(signupService.signup).not.toHaveBeenCalled();
    });
    it('should not send request when surname is required', () => {
      const signupSpy = spyOn(signupService, 'signup').and.returnValue(Observable.of());
      setFormToValid();
      component.signupForm.get('surname').setValue('');
      component.onSubmit();
      expect(signupService.signup).not.toHaveBeenCalled();
    });
    it('should not send request when password is required', () => {
      const signupSpy = spyOn(signupService, 'signup').and.returnValue(Observable.of());
      setFormToValid();
      component.signupForm.get('password').setValue('');
      component.onSubmit();
      expect(signupService.signup).not.toHaveBeenCalled();
    });
    it('should not send request when repeated password is required', () => {
      const signupSpy = spyOn(signupService, 'signup').and.returnValue(Observable.of());
      setFormToValid();
      component.signupForm.get('repeatedPassword').setValue('');
      component.onSubmit();
      expect(signupService.signup).not.toHaveBeenCalled();
    });
    it('should not send request when password and repeated password are not the same', () => {
      const signupSpy = spyOn(signupService, 'signup').and.returnValue(Observable.of());
      setFormToValid();
      component.signupForm.get('repeatedPassword').setValue('differentValue');
      component.onSubmit();
      expect(signupService.signup).not.toHaveBeenCalled();
    });
    it('should clear and toggle form when signup service call is successful', () => {
      const clearFormSpy = spyOn(component, 'clearForm');
      const toggleFormSpy = spyOn(component, 'onToggleForm');
      setFormToValid();
      component.onSubmit();
      expect(component.clearForm).toHaveBeenCalled();
      expect(component.onToggleForm).toHaveBeenCalled();
    });
    it('should error dialog when signup is not successful', () => {
      const signupSpy = spyOn(signupService, 'signup').and.returnValue(Observable.throw('error!'));
      const dialogSpy = spyOn(dialogService, 'openNotificationMessageDialog');
      setFormToValid();
      component.onSubmit();
      expect(dialogService.openNotificationMessageDialog).toHaveBeenCalled();
    });
  });
});
