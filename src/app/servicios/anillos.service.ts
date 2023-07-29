import { Injectable } from '@angular/core';
import { Anillos } from '../models/anillos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AnillosService {
  private usuarioCollection:AngularFirestoreCollection <Anillos>


  constructor(private db: AngularFirestore) {
    this.usuarioCollection= db.collection('anillos')
  
   }
   obtenerAnillos(){
    return this.usuarioCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}