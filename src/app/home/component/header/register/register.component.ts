import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/home/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formulary: FormGroup;
  loading: boolean = false;

  constructor(private userService: UserService,
              private router: Router,
              private toastr: ToastrService) {
    this.formulary = new FormGroup({
      compledName: new FormControl('', Validators.required),
      compledSurname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSudmit() {
    this.loading = true;
    this.userService.register(this.formulary.value)
      .then(response => {
        this.toastr.success('Registro con éxito');
        console.log(response);
        this.loading = false;
        this.router.navigate(['/login'])
        return
      })
      .catch(error => {
        this.toastr.error(error);
      });

  }

}
