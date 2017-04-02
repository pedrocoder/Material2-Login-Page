import { ValidationMessage} from './validation-message.interface';

export class ValidationMessageTypes {
    static readonly EmailInvalid: ValidationMessage = {
        propertyName: 'email',
        message: 'Invalid email'
    };
    static readonly Required: ValidationMessage = {
        propertyName: 'required',
        message: 'Required'
    };

    static readonly PasswordsNotMatching: ValidationMessage = {
        propertyName: 'equalTo',
        message: 'Passwords are not equal'
    };
}
