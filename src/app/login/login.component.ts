import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CompartirUsuarioService } from '../compartir-usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordObtenida="";
  correoObtenido="";
  usuarioLogeado="";
  passwordUsuario="";

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private compartirUsuarioS: CompartirUsuarioService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/quienes']);
        this.usuarioLogeado=this.correoObtenido;
        this.passwordUsuario=this.passwordObtenida;
        this.enviarCorreo();
      })
      .catch(error => console.log(error));
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/quienes']);
      })
      .catch(error => console.log(error))
  }

  enviarCorreo(){
    this.compartirUsuarioS.actualizarDato(this.usuarioLogeado,this.passwordUsuario);
  }

}
