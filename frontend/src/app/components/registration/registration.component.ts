import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRequest} from "../../interfaces/user.model";
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  loading = false;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      street: ['', [Validators.required]],
      line2: [''],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
  }
  private userRequestFromForm(): UserRequest {
    return {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      addresses: [
        {
          id: null,
          street: this.registrationForm.value.street,
          line2: this.registrationForm.value.line2,
          city: this.registrationForm.value.city,
          country: this.registrationForm.value.country,
          state: this.registrationForm.value.state,
          zipCode: this.registrationForm.value.zipCode,
        }
      ]
    }
  }
  onSubmit(): void {
    if (!this.registrationForm.valid) {
      return;
    }
    this.loading = true;
    const userRequest = this.userRequestFromForm();
    if (userRequest) {
      this.apiService.registerUser(userRequest).subscribe(
        (data) => {
          this.loading = false;
          this.authService.setCurrentUser(data.user);
          this.authService.setToken(data.token);
          this.router.navigate(['/']);
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
    }
  }
}
