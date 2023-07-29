import { Injectable } from '@angular/core';
import { Aros } from '../models/aros';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ArosService {

  private usuarioCollection:AngularFirestoreCollection <Aros>


  constructor(private db: AngularFirestore) {
    this.usuarioCollection= db.collection('Aros')
  
   }
   obtenerAros(){
    return this.usuarioCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}