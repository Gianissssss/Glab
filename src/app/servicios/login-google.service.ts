import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class LoginGoogleService {

  isLoged = false

  constructor(private auth:AngularFireAuth, private cookie: CookieService) { }

  async loginWithGoogle(){
    let referenceProvider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(referenceProvider)
    .then(sesion=>sesion.user?.getIdToken().then(token=>this.cookie.set("idToken",token)));
    this.isLoged=true;
    
  }

  getUser(){
    this.auth.authState.subscribe(
      async user=>{
        let token = await user?.getIdToken()
        console.log(token)
      }
    )
  }

  logOut(){
    this.auth.signOut().then(
      ()=>{
        this.cookie.delete("idToken");
        this.isLoged=false;
      }
    )
  }

  getToken(){
    return this.cookie.get('idToken')
  }
  estaLogueado(){
    if(this.cookie.get("sesionIniciada")==="true"){
      this.isLoged = true
    }
    return this.isLoged
    alert("Usted inició sesión")
  }
}