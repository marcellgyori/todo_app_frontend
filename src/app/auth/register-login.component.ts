import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'auth-dialog',
  templateUrl: 'register-login.component.html',
  styleUrls: ['register-login.component.scss'],
})
export class AuthDialog {
  public breakpoint: number; // Breakpoint observer code
  public formGroup: FormGroup;
  public message: string = '';
  public wrongInputStatus = false;
  public loading = false;
  public hide = true;
  public submitted = false;
  public isRegister: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isRegister = data.isRegister;
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
    if (this.isRegister) {
      this.formGroup = this.formBuilder.group({
        email: ['', Validators.required],
        name: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    } else {
      this.formGroup = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }
  }

  get f() {
    return this.formGroup.controls;
  }

  openSnackBar() {
    this._snackBar.openFromComponent(ValidationMessageComponent, {
      duration: 5000,
    });
  }

  onAuth() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    let user = new User();
    user.email = this.f.email.value;
    user.password = this.f.password.value;
    if (this.isRegister) {
      user.name = this.f.name.value;
    }
    if (this.isRegister) {
      this.authService
        .register(user)
        .pipe(first())
        .subscribe(
          (data: User) => {
            if (data.message !== undefined) {
              this.loading = false;
              this.wrongInputStatus = true;
              this.message = data.message;
            } else {
              this.openSnackBar();
              this.dialog.closeAll();
            }
          },
          () => {
            this.loading = false;
          }
        );
    } else {
      this.authService
        .login(user)
        .pipe(first())
        .subscribe(
          (data: User) => {
            if (data.message !== undefined) {
              this.loading = false;
              this.wrongInputStatus = true;
              this.message = data.message;
            } else {
              location.reload();
              this.dialog.closeAll();
            }
          },
          () => {
            this.loading = false;
          }
        );
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }
}

@Component({
  selector: 'snack-bar-component-registration-successful',
  templateUrl: 'registration-successful.component.html',
  styles: [
    `
      .registration-successful {
        color: #424242;
      }
    `,
  ],
})
export class ValidationMessageComponent {}
