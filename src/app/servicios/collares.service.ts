import { Injectable } from '@angular/core';
import { Collares } from '../models/collares';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CollaresService {

  private usuarioCollection:AngularFirestoreCollection <Collares>


  constructor(private db: AngularFirestore) {
    this.usuarioCollection= db.collection('Collares')
  
   }
   obtenerCollares(){
    return this.usuarioCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    
  }
}