import { Component, OnInit } from '@angular/core';
import { Conjuntos } from 'src/app/models/conjuntos';
import { ConjuntosService } from 'src/app/servicios/conjuntos.service';

@Component({
  selector: 'app-conjuntos',
  templateUrl: './conjuntos.component.html',
  styleUrls: ['./conjuntos.component.css']
})
export class ConjuntosComponent implements OnInit {

  responsiveOptions;
  collecionConjuntos:Conjuntos[]
  displayModal:boolean=false;
  constructor(private servicioConjuntos:ConjuntosService) {
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
    this.servicioConjuntos.obtenerConjuntos().subscribe(conjuntos=>this.collecionConjuntos=conjuntos)

  }
  showModalDialog() { 
    this.displayModal = true;
    alert("Lo agregaste al carrito")
}

}