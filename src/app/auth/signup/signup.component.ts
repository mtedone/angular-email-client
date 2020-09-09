import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private matchValidator: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService
  ) {}
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchValidator.validate] }
  );

  ngOnInit(): void {}

  showErrors() {
    const passwordTouched = this.authForm.get('password').touched;
    const passwordConfirmationTouched = this.authForm.get(
      'passwordConfirmation'
    ).touched;
    return (
      this.authForm.errors && passwordTouched && passwordConfirmationTouched
    );
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value).subscribe({
      next: (response) => {
        //Navigate to some other route
      },

      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({
            noConnection: true,
          });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
