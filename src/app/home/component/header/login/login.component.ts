import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/home/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormulary: FormGroup;
  loading: boolean = false;

  constructor(  private userService: UserService,
                private router: Router) {
    this.loginFormulary = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  signIn() {
    this.loading = true;
    this.userService.login(this.loginFormulary.value)
      .then(response => {
        console.log(response);
        this.loading = false;
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));

  }

  loginGoogle() {
    this.loading = true;
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response)
        this.loading = false;
        this.router.navigate(['/home'])
      })
      .catch(error => console.log(error));
  }
}
