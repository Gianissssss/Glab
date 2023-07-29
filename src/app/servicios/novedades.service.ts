import { Injectable } from '@angular/core';
import { Novedades } from '../models/novedades';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  private usuarioCollection:AngularFirestoreCollection <Novedades>


  constructor(private db: AngularFirestore) {
    this.usuarioCollection= db.collection('novedades')
  
   }
   obtenerNovedades(){
    return this.usuarioCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}