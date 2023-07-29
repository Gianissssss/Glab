import { Component, OnInit } from '@angular/core';
import { Conjuntos } from 'src/app/models/conjuntos';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service'; 
import { ConjuntosService } from 'src/app/servicios/conjuntos.service';
import { BuzoMService } from 'src/app/servicios/buzom.service';
import { BuzohService } from 'src/app/servicios/buzoh.service';
import { PantalonhService } from 'src/app/servicios/pantalonh.service';
import { PantalonmService } from 'src/app/servicios/pantalonm.service';
import { RemerahService } from 'src/app/servicios/remerah.service';
import { RemeramService } from 'src/app/servicios/remeram.service';
import { BuzoM } from 'src/app/models/buzom';
import { PantalonH } from 'src/app/models/pantalonh';
import { RemeraH } from 'src/app/models/remerah';
import { PantalonM } from 'src/app/models/pantalonm';
import { RemeraM } from 'src/app/models/remeram';
import { BuzoH } from 'src/app/models/buzoh';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  buzomujer = new FormGroup({
    Producto:new FormControl('',Validators.required),
    Color:new FormControl('',Validators.required),
    Precio:new FormControl('',Validators.required),
    Img: new FormControl('',Validators.required),
    Cantidad: new FormControl('',Validators.required)
  })

  imagen:string //url
  nombreImagen:string

  responsiveOptions;

  collecionConjuntos: Conjuntos[];
  collecionPantalonH:PantalonH[];
  collecionPantalonM:PantalonM[];
  collecionRemeraH:RemeraH[];
  collecionRemeraM:RemeraM[];
  collecionBuzoH:BuzoH[];

  collecionBuzoM:BuzoM[];
  mujerSeleccionado:BuzoM;
  
  
  textoBoton!:string;
  modalVisible:boolean=false;
  adminVisible=false;
  eliminarVisible!:boolean;

  constructor(private servicioStorage:StorageService, private servicioConjuntos:ConjuntosService, private remeraM:RemeramService, private remeraH:RemerahService, private buzoM:BuzoMService, private buzoH:BuzohService, private pantalonm:PantalonmService, private pantalonh:PantalonhService) { 
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
    this.pantalonh.obtenerPantalonH().subscribe(pantalonh=>this.collecionPantalonH=pantalonh)
    this.pantalonm.obtenerPantalonM().subscribe(pantalonm=>this.collecionPantalonM=pantalonm)
    this.remeraH.obtenerRemeraH().subscribe(remerah=>this.collecionRemeraH=remerah)
    this.remeraM.obtenerRemeraM().subscribe(remeram=>this.collecionRemeraM=remeram)
    this.buzoH.obtenerBuzoH().subscribe(buzoh=>this.collecionBuzoH=buzoh)
    this.buzoM.obtenerBuzoM().subscribe(buzom=>this.collecionBuzoM=buzom)
}
async agregarProductoM(){
  if(this.buzomujer.valid){
  let nuevobuzom:BuzoM={
  Producto:this.buzomujer.value.Producto!,
  Color:this.buzomujer.value.Color!,
  Cantidad:this.buzomujer.value.Cantidad!,
  Img:this.buzomujer.value.Img!,
  Precio:this.buzomujer.value.Precio!,
  idProducto:""
}
await this.servicioStorage.subirImagen(this.nombreImagen,this.imagen)
  .then(
    async res=>{//devuelve la respuesta tipo UploadResult
    this.servicioStorage.obtenerUrlImagen(res).//trabajamos con una promesa
    then(
      async url=>{//nos devuelve la url
        await this.buzoM.crearBuzoM(nuevobuzom,url)
       .then(buzom=>{
          alert("El producto fue agregado con exito")
         this.modalVisible=false
        })
       .catch((error)=>{
        alert("El libro no pudo ser cargado\nError: "+error);
       }) 
      }
    )   
    })
  }
  else{
    alert("El formulario no esta completo")
  }
}


 editarBuzoM(){
  let datos:BuzoM={
    Producto:this.buzomujer.value.Producto!,
    Color:this.buzomujer.value.Color!,
    Cantidad:this.buzomujer.value.Cantidad!,
    idProducto:this.mujerSeleccionado.idProducto,
     Img:this.mujerSeleccionado.Img,
     Precio:this.buzomujer.value.Precio!
   }
  this.buzoM.modificarBuzo(this.mujerSeleccionado.idProducto,datos).then((buzom)=>{
     alert("EL Producto FUE MODIFICADO CON EXITO")
  })
   .catch((error)=>{
     alert("El Producto no pudo ser modificado\nError: "+error);
   })
 }
 mostrarDialogo(){
  this.textoBoton ="Agregar Producto"
  this.modalVisible=true
  this.adminVisible=true
  this.ngOnInit()
}

 mostrarEditar(mujerSeleccionado:BuzoM){
 this.mujerSeleccionado =mujerSeleccionado
 this.textoBoton="Editar Producto"
 this.modalVisible=true;

  this.buzomujer.setValue({
    Producto:mujerSeleccionado.Producto,
    Cantidad:mujerSeleccionado.Cantidad,
    Color:mujerSeleccionado.Color,
    Img:mujerSeleccionado.Img,
    Precio:mujerSeleccionado.Precio
  })
 }
  cargarDatos(){
  if(this.textoBoton==="Agregar Producto"){
   this.agregarProductoM()
 }
 else if(this.textoBoton==="Editar Producto"){
    this.editarBuzoM()
  }
  this.modalVisible=false
  this.buzomujer.reset()
  }

 mostrarEliminar(mujerSeleccionado:BuzoM){
  this.mujerSeleccionado=mujerSeleccionado
    this.eliminarVisible=true
 }

 borrarProductoM(){
  this.buzoM.eliminarBuzo(this.mujerSeleccionado.idProducto).then((resp)=>{
   alert("El producto fue eliminado con exito")
 })
  .catch((error)=>{
    alert("El producto no pudo ser eliminado\nError: "+error)
    })
  this.eliminarVisible=false
  }


 cargarImagen(event:any){
 let archivo =event.target.files[0]
 let reader = new FileReader()
  if(archivo!=undefined){//si mi archivo es diferente a undefined
    reader.readAsDataURL(archivo)//lee el archivo y lo convierte en una url
   reader.onloadend = () =>{//cuando finaliza la carga
      let url = reader.result //me devuelve el resultado (url)
     if(url!=null){ //si la url es distinta de nula
        this.nombreImagen= archivo.name
       this.imagen =url.toString()
      }
    }
  }
  }
}

