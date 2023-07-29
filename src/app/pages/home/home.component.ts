import { Component, OnInit } from '@angular/core';
import { Novedades } from 'src/app/models/novedades';
import { NovedadesService } from 'src/app/servicios/novedades.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  responsiveOptions;
  collecionNovedades: Novedades[] = [];
  displayModal: boolean = false;
  

  constructor(private servicioNovedades:NovedadesService) { 
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  }
  promo:string []=[
    "../../../assets/carouselglab1.png",
    
  ]
  ngOnInit(): void {
    this.servicioNovedades.obtenerNovedades().subscribe(novedades=>this.collecionNovedades=novedades)

  }
  showModalDialog() { 
    this.displayModal = true;
    alert("Lo agregaste al carrito")
}
}