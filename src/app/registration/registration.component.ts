import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  standalone: false
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  firstnameVal: any;
  lastnameVal: any;
  invalidpasswordMsg: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      }
    );
  }
  get f() {
    return this.registerForm.controls;
  }
  validatePassword(event: any) {
    const passValue = event.target.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
    if (passValue && passValue.length < 8){
      this.registerForm.get('password')?.setErrors({ invalid: true });
      this.invalidpasswordMsg = "Password should be a minimum of eight characters long."
    } else if (this.registerForm.get('password')?.value && !passwordPattern.test(this.registerForm.get('password')?.value)) {
      this.invalidpasswordMsg = "assword must contain at least one uppercase and one lowercase letter";
      this.registerForm.get('password')?.setErrors({ invalid: true });
    } else {
      this.registerForm.get('password')?.setErrors(null);
      this.invalidpasswordMsg = '';
    }
  }
  getFirstName(event: any){
    this.firstnameVal = event.target.value;
  }
  getLastName(event: any){
    this.lastnameVal = event.target.value;
  }
  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const lastnameLength = this.lastnameVal.length;
      this.userService.getUserPhotos(lastnameLength)
      .pipe(first())
      .subscribe((users: any)  => {
        if (users && users.thumbnailUrl){
          this.saveUserDetails(users.thumbnailUrl);
        }
      });
  }
  saveUserDetails(imageUrl: any){
    const saveuserObj = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      thumbnailUrl: imageUrl
    }
    this.userService.register(saveuserObj)
    .pipe(first())
    .subscribe(
      (data: any) => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
