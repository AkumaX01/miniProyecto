import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Place from 'src/app/interface/place';
import { PlacesService } from 'src/app/services/places.service';



@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  places: Place;
  parametro: string = "";
  date: any;
  minimumDate: Date = new Date();
  arrayDeFechas: Date[];

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.places = {
      nombre: " ",
      fecha: new Date(),
      hora: " ",
      aire: true,
      cuartos: 4,
      categoria: "Depa",
      imagen: " ",
      reserva: ["asd","asda"]
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parametro = params['parametro'];
    });
    this.placesService.getPlaceById(this.parametro).subscribe(places => {
      console.log(places);
      this.places = places;
      console.log(places.reserva);
      const arrayDeTexto: string[] = places.reserva;

      const arrayDeFechas: Date[] = arrayDeTexto.map((texto: string) => new Date(texto));
      this.arrayDeFechas = arrayDeFechas;
      for (let i = 0; i < arrayDeFechas.length; i++) {
        const fechaActual = arrayDeFechas[i];
        fechaActual.setDate(fechaActual.getDate() + 1);
      }

      //this.places.reserva: Date[] = places.reserva.map((texto: string) => new Date(texto));
      
      console.log(arrayDeFechas)
    })
  }

  update(): void{
    const fechaFormateada = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    this.placesService.editDoc(this.parametro, fechaFormateada);
  }
}
