import { Injectable } from '@angular/core';
import { PantalonM } from '../models/pantalonm';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PantalonmService {

  private usuarioCollection:AngularFirestoreCollection <PantalonM>


  constructor(private db: AngularFirestore) {
    this.usuarioCollection= db.collection('pantalonm')
  
   }
   obtenerPantalonM(){
    return this.usuarioCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}