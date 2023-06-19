import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PlacesService } from 'src/app/services/places.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;
  pas1: string = "";
  pas2: string = "";
  band: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private placesService: PlacesService
  ) {
    this.formReg = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      Conpassword: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.pas1 === this.pas2){
      console.log(this.pas1+"-"+this.pas2)
      this.band = false;
      console.log("true")
    }else{
      this.band = true;
      console.log("Falso")
      console.log(this.pas1+"-"+this.pas2)
    }
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.newPlace()
        Swal.fire({
          title: 'Registro Exitoso!!',
          text: 'Serás redirigido en unos segundos...',
          timer: 2000,
          timerProgressBar: true,
          didClose: () => {
            window.location.href = '/login'; // Reemplaza con la URL a la que deseas redirigir
          }
        });
      })
      .catch(error => console.log(error));
  }
  
  async newPlace() {
    console.log("llama pa");
    console.log(this.formReg.value)
    const response = await this.placesService.addPlace2(this.formReg.value);
    console.log(response);
  }
}
