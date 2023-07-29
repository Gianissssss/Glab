import { Injectable } from '@angular/core';
import { Conjuntos } from '../models/conjuntos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ConjuntosService {
  private conjuntosCollection:AngularFirestoreCollection <Conjuntos>


  constructor(private db: AngularFirestore) {
    this.conjuntosCollection= db.collection('conjuntos')
   }
   obtenerConjuntos(){
    return this.conjuntosCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}