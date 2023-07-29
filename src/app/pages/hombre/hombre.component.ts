import { Component, OnInit } from '@angular/core';
import { BuzohService } from 'src/app/servicios/buzoh.service';
import { PantalonhService } from 'src/app/servicios/pantalonh.service';
import { RemerahService } from 'src/app/servicios/remerah.service';
import { BuzoH } from 'src/app/models/buzoh';
import { RemeraH } from 'src/app/models/remerah';
import { PantalonH } from 'src/app/models/pantalonh';
@Component({
  selector: 'app-hombre',
  templateUrl: './hombre.component.html',
  styleUrls: ['./hombre.component.css']
})
export class HombreComponent implements OnInit {
  responsiveOptions;
  displayModal: boolean = false;
  remeras: RemeraH[] = [];
  pantalones:PantalonH[];
  buzos:BuzoH[];
  constructor(private remeraH:RemerahService,private buzoH:BuzohService,private pantalonH:PantalonhService) { 
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
    this.remeraH.obtenerRemeraH().subscribe(remerah=>this.remeras=remerah)
    this.buzoH.obtenerBuzoH().subscribe(buzoh=>this.buzos=buzoh)
    this.pantalonH.obtenerPantalonH().subscribe(pantalonh=>this.pantalones=pantalonh)
  
    // this.servicioHombres.obtenerProductoH().subscribe(hombre=>this.collecionHombres=hombre)
  }
  showModalDialog() { 
    this.displayModal = true;
    alert("Lo agregaste al carrito")
}
}