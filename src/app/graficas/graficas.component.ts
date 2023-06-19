
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import Place from 'src/app/interface/place';
import { PlacesService } from 'src/app/services/places.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  places: Place[];

  aux: number[];
  aux1: string[];
  constructor(
    private placesService: PlacesService
  ) {
    this.places = [{
      nombre: " ",
      fecha: new Date(),
      hora: " ",
      aire: "true",
      cuartos: 4,
      categoria: "Depa",
      imagen: " ",
      reserva: ["asd","asda"]
    }];
  }
  
  public barChartOptions:any={
    scalesShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[]=["2006","2007","2008","2009","2010","2010","2012",];
  public barChartType:string='bar';
  public barChartLegend:boolean=true;

  public barChartData:any[]=[
    {data: [65,59,80,81,56,55,40], label: 'Series A'},
    {data: [28,48,40,19,86,27,90], label: 'Series B'}
  ];

  //events
  public chartClicked(e:any):void{
    console.log(e);
  }
  public chartHovered(e:any):void{
    console.log(e);
  }


  rellenar(places1){
    this.aux1 = [];
    for (let i = 0; i < places1.length; i++) {
      this.aux1.push(places1[i].nombre); // Agregar 'element' al array utilizando push()
    }

  }
  rellenar2(places1) {
    this.aux = []; // Inicializar this.aux como un array vacío
  
    for (let i = 0; i < places1.length; i++) {
      this.aux.push(places1[i].reserva.length);
    }
  
    this.barChartData.push({ data: this.aux, label: 'Reservas' });
  }
  
  ngOnInit(): void {
    this.placesService.getPlaces().subscribe(places => {
      console.log(places);
      this.places = places;
      console.log(this.places);
      this.rellenar(places);
      this.rellenar2(places);
      console.log(this.barChartLabels);
      console.log(this.barChartData);
      this.update();
    })
  }

  update(){
    this.barChartLabels = this.aux1;
    this.barChartData = [{ data: this.aux, label: 'Reservas' }];

  }

}
