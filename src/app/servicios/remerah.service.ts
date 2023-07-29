import { Injectable } from '@angular/core';
import { RemeraH } from '../models/remerah';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RemerahService {

  private usuarioCollection:AngularFirestoreCollection <RemeraH>


  constructor(private db: AngularFirestore) {
    this.usuarioCollection= db.collection('remerah')
  
   }
   obtenerRemeraH(){
    return this.usuarioCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}