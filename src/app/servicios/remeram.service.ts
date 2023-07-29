import { Injectable } from '@angular/core';
import { RemeraM } from '../models/remeram';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RemeramService {

  private usuarioCollection:AngularFirestoreCollection <RemeraM>


  constructor(private db: AngularFirestore) {
    this.usuarioCollection= db.collection('remeram')
  
   }
   obtenerRemeraM(){
    return this.usuarioCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}