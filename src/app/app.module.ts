import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MujerComponent } from './pages/mujer/mujer.component';
import { HombreComponent } from './pages/hombre/hombre.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from "primeng/inputtext";


import {MenubarModule} from 'primeng/menubar'; //navbar
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import { TreeTableModule } from 'primeng/treetable';
import {CarouselModule} from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import {StyleClassModule} from 'primeng/styleclass';

import { AlertService } from './servicios/alert.service';
import { UsuarioService } from './servicios/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ConjuntosComponent } from './pages/conjuntos/conjuntos.component';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent,
    MujerComponent,
    HombreComponent,
    AccesoriosComponent,
    NosotrosComponent,
    ConjuntosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    DialogModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    RatingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    AppRoutingModule,
    StyleClassModule,
    TableModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [UsuarioService,AlertService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }