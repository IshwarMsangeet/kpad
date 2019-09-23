import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../common-services/auth.service';
import { AlertService } from '../common-services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMsg:boolean = false;
  constructor( private authService: AuthService,
                private formBuilder: FormBuilder,
                private alertService: AlertService,
                private router: Router) { }

  ngOnInit() {
    this.errorMsg = false;
    this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
  }

  // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        if(this.authService.login(this.f.username.value, this.f.password.value)){
          this.router.navigate(['']);
        } else{
          this.errorMsg = true;
          this.loading = false;
        }
    }
}
