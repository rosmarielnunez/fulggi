import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/home/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {

  recoverFormulary: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private auth: Auth,
    private toastr: ToastrService) {
    this.recoverFormulary = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  async send() {
    try {
      const email = this.recoverFormulary.value.email;

      await this.userService.recoverPassword(email);

      this.toastr.success('En breve recibirás un correo para recuperar tu contraseña');

      console.log('Email enviado');
      this.router.navigate(['/login'])
      return

    } catch (error) {
      console.error('Error al enviar el email:', error);

    }
  }

}
