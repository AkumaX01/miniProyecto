import { Component } from '@angular/core';
import Place from 'src/app/interface/place';
import { PlacesService } from 'src/app/services/places.service';


@Component({
  selector: 'app-cons-baja-fire',
  templateUrl: './cons-baja-fire.component.html',
  styleUrls: ['./cons-baja-fire.component.css']
})
export class ConsBajaFireComponent {

  places: Place[];

  constructor(
    private placesService: PlacesService
  ) {
    this.places = [{
      nombre: " ",
      fecha: new Date(),
      hora: " ",
      aire: true,
      cuartos: 4,
      categoria: "Depa",
      imagen: " ",
      reserva: ["asd","asda"]
    }];
  }

  ngOnInit(): void {
    this.placesService.getPlaces().subscribe(places => {
      this.places = places;
    })
  }

  async onClickDelete(place: Place) {
    const response = await this.placesService.deletePlace(place);
    console.log(response);
  }

}
