import { Component, OnInit } from '@angular/core';
import { BuzoMService } from 'src/app/servicios/buzom.service';
import { PantalonmService } from 'src/app/servicios/pantalonm.service';
import { RemeramService } from 'src/app/servicios/remeram.service';
import { BuzoM } from 'src/app/models/buzom';
import { RemeraM } from 'src/app/models/remeram';
import { PantalonM } from 'src/app/models/pantalonm';
@Component({
  selector: 'app-mujer',
  templateUrl: './mujer.component.html',
  styleUrls: ['./mujer.component.css']
})
export class MujerComponent implements OnInit {
  responsiveOptions;
  remeras: RemeraM[] = [];
  pantalones:PantalonM[];
  buzos:BuzoM[];
  displayModal: boolean = false;

  constructor(private remeraM:RemeramService, private buzoM:BuzoMService,private pantalonM:PantalonmService) { 
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
  ];}

  ngOnInit(): void {
    this.remeraM.obtenerRemeraM().subscribe(remeram=>this.remeras=remeram)
    this.buzoM.obtenerBuzoM().subscribe(buzom=>this.buzos=buzom)
    this.pantalonM.obtenerPantalonM().subscribe(pantalonm=>this.pantalones=pantalonm)
  }
  showModalDialog() { 
    this.displayModal = true;
    alert("Lo agregaste al carrito")
}
}