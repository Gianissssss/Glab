import { Component, OnInit } from '@angular/core';
import { AnillosService } from 'src/app/servicios/anillos.service';
import { Anillos } from 'src/app/models/anillos';
import { CollaresService } from 'src/app/servicios/collares.service';
import { ArosService } from 'src/app/servicios/aros.service';
import { Collares } from 'src/app/models/collares';
import { Aros } from 'src/app/models/aros';
@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit {
  responsiveOptions;
  collecionAnillos: Anillos[] = [];
  collecionAros: Aros[];
  collecionCollares:Collares[];
  displayModal: boolean = false;
  constructor(private servicioAnillos:AnillosService, private servicioAros:ArosService, private servicioCollares:CollaresService) {
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

  ngOnInit(): void {
    this.servicioAnillos.obtenerAnillos().subscribe(anillos=>this.collecionAnillos=anillos)
    this.servicioAros.obtenerAros().subscribe(aros=>this.collecionAros=aros)
    this.servicioCollares.obtenerCollares().subscribe(collares=>this.collecionCollares=collares)
  }
  showModalDialog() { 
    this.displayModal = true;
    alert("Lo agregaste al carrito")
}

}