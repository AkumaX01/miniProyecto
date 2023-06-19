import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlacesService } from 'src/app/services/places.service';
import Place from 'src/app/interface/place';

@Component({
  selector: 'app-alta-fire',
  templateUrl: './alta-fire.component.html',
  styleUrls: ['./alta-fire.component.css']
})
export class AltaFireComponent implements OnInit {

  formulario: FormGroup;
  places: Place;

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
      imagen: new FormControl(),
      reserva: new FormControl()
    })

    this.places = {
      nombre: " ",
      fecha: new Date(),
      hora: " ",
      aire: "true",
      cuartos: 4,
      categoria: "Depa",
      imagen: " ",
      reserva: [String(new Date())]
    };
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    console.log(this.formulario.value)
    this.places = this.formulario.value;
    this.places.reserva = ["2000-09-13","2001-12-10"];
    console.log(this.places)
    const response = await this.placesService.addPlace(this.places);
    console.log(response);
  }

}
