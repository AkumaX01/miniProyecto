import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  contactanos:any;
  constructor(private formBuilder: FormBuilder) { 
    this.messages = [];
  }

  messages: Message[];

  addMessages() {
      this.messages = [
          { severity: 'success', summary: 'Enviado:', detail: 'Gracias por tu comentario, lo tomaremos en cuenta' },
      ];
  }

  ngOnInit(): void {
    this.contactanos = this.formBuilder.group({
      fname: new FormControl('',[Validators.required]),
      lname: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('',[Validators.required,Validators.minLength(9)]),
      message: new FormControl('',[Validators.required])
    });
  }
  
  // palabrasOb(limit: string[]) {
  //   return (control: AbstractControl) => {




  //     let band: Boolean = false;
  //     let fechasInvalidas = this.fechasRestringidas;
  //     for (let i = 0; i <= fechasInvalidas.length; i++) {
  //       if (control.value == fechasInvalidas[i]) {
  //         this.fechaError = control.value;
  //         band = false;
  //         this.asientosc = 0;
  //         break;
  //       } else {
  //         band = true;
  //       }
  //     }
  //     if (band == true) {
  //       console.log("no hubo error en")
  //       console.log("Validacion cupollenoo:" + control.value);

  //       return null;

  //     } else  //si pasa aca se muestra el mensaje
  //       return { cupollenoo: true }

  //   }

  // }
}
