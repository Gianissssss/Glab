import { Injectable } from '@angular/core';
import { PantalonH } from '../models/pantalonh';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PantalonhService {

  private usuarioCollection:AngularFirestoreCollection <PantalonH>


  constructor(private db: AngularFirestore) {
    this.usuarioCollection= db.collection('pantalonh')
  
   }
   obtenerPantalonH(){
    return this.usuarioCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}