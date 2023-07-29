import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import { LoginGoogleService } from 'src/app/servicios/login-google.service';

import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  usuario = new FormGroup ({
    Nombre: new FormControl ('',Validators.required),
    Contrasena: new FormControl ('',Validators.required)
  })
  
  usuarioSeleccionado:Usuario;

  collecionDeUsuario: Usuario[];

  modalVisible:boolean=false;

  logueado = false

 

  constructor(private router:Router, private login:UsuarioService,private google:LoginGoogleService, private servicioUsuarios:UsuarioService) { }

  usuarios=this.servicioUsuarios.obtenerUsuarios();
  items: MenuItem[]=[];
  adminVisible=false;
  textoBoton: string;

  ngOnInit(): void {
    this.logueado = this.login.estaLogueado()
    this.google.getUser()
    this.items = [
      {
        label:'Inicio',
        routerLink:'home'
       },
        
      {
      label:'Tienda',
    icon:'pi pi-shopping-bag',
    items:[{
       label:'Mujer',
         icon:'pi pi-tag',
         routerLink:'mujer'
            },
          {
          label:'Hombre',
               icon:'pi pi-tag',
               routerLink:'hombre'
             },
             {
              label:'Accesorios',
             icon:'pi pi-tag',
             routerLink:'accesorios'
            },
            {
              label:'Conjuntos',
              icon:'pi pi-tag',
              routerLink:'conjuntos'
            }
           ]
         },
        {
           label:'Nosotros',
           icon:'pi pi-phone',
           routerLink:'nosotros'
         },
         {
          label:'Admin',
           icon:'pi pi-user',
           routerLink:'admin',
           visible:this.adminVisible
         }
     ];
     this.servicioUsuarios.obtenerUsuarios().subscribe(usuario=>this.collecionDeUsuario=usuario)
}

// verificarUsuario(){
//   this.usuarios.forEach(usuario =>{
//     if(this.usuario.valid){
//     if(usuario==this.collecionDeUsuario){
//       alert("Iniciaste sesion correctamente")
//     }
//     else{
//       alert("El usuario no esta registrado")
//     }
//     }
//     else{
//       alert("Hubo un problema para iniciar sesion")
//     }
//   })
//  }

 mostrarDialogo(){
  this.textoBoton ="Iniciar Sesion"
  this.modalVisible=true
  this.adminVisible=true
  this.ngOnInit()
}

 iniciaSesion(){
  this.servicioUsuarios.login(this.usuario,this.collecionDeUsuario)
  this.modalVisible=false
  this.router.navigateByUrl("admin")
 }

iniciarSesionConGoogle(){
  this.google.loginWithGoogle()
  this.ngOnInit()
  this.modalVisible=false
  this.router.navigateByUrl("admin")
// }
}

cerrarSesionConGoogle(){
  this.google.logOut()
  this.adminVisible=false
  this.ngOnInit()
}


CerrarSesion(){
  this.login.logOut()
  this.router.navigateByUrl("/")
  this.ngOnInit()
}

}