import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {filter} from "rxjs";
import {UserResponse, UserUpdate} from "../../interfaces/user.model";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: UserResponse | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private notification: NzNotificationService) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      street: ['', [Validators.required]],
      line2: [''],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(
      filter((user) => !!user)
    ).subscribe((user) => {
      this.currentUser = user;
      this.profileForm.patchValue({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        street: user?.addresses[0]?.street,
        line2: user?.addresses[0]?.line2,
        city: user?.addresses[0]?.city,
        country: user?.addresses[0]?.country,
        state: user?.addresses[0]?.state,
        zipCode: user?.addresses[0]?.zipCode,
      });
    });
  }

  private userRequestFromForm(): UserUpdate | undefined {
    if (this.currentUser) {
      return {
        id: this.currentUser.id,
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        email: this.profileForm.value.email,
        addresses: [
          {
            id: this.currentUser.addresses[0].id,
            street: this.profileForm.value.street,
            line2: this.profileForm.value.line2,
            city: this.profileForm.value.city,
            country: this.profileForm.value.country,
            state: this.profileForm.value.state,
            zipCode: this.profileForm.value.zipCode,
          }
        ]
      };
    }
    return undefined;
  }

  onSubmit(): void {
    if (!this.profileForm.valid) {
      return;
    }
    this.loading = true;
    const userRequest = this.userRequestFromForm();
    if (this.currentUser && userRequest) {
      this.apiService.updateUser(userRequest, this.currentUser.id).subscribe(
        (data) => {
          this.loading = false;
          this.authService.setCurrentUser(data);
          this.notification.success('Succes', 'Profilul a fost actualizat cu succes');
        },
        (error) => {
          this.loading = false;
          this.notification.error('Error', 'Profilul nu a putut fi actualizat');
          console.error(error);
        }
      );
    }
  }
}
