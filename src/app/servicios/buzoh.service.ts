import { Injectable } from '@angular/core';
import { BuzoH } from '../models/buzoh';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class BuzohService {

  private usuarioCollection:AngularFirestoreCollection <BuzoH>


  constructor(private db: AngularFirestore) {
    this.usuarioCollection= db.collection('buzoh')
  
   }
   obtenerBuzoH(){
    return this.usuarioCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}