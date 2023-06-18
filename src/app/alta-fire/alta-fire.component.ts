import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-alta-fire',
  templateUrl: './alta-fire.component.html',
  styleUrls: ['./alta-fire.component.css']
})
export class AltaFireComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private placesService: PlacesService
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      fecha: new FormControl(),
      hora: new FormControl(),
      aire: new FormControl(),
      cuartos: new FormControl(),
      categoria: new FormControl(),
      imagen: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    console.log(this.formulario.value)
    const response = await this.placesService.addPlace(this.formulario.value);
    console.log(response);
  }

}
