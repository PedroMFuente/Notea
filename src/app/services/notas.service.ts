import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nota } from '../model/nota';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private myCollection:AngularFirestoreCollection<any>;
  

  constructor(private authS:AuthService,private fire:AngularFirestore) {
    this.myCollection= fire.collection<any>(environment.notasCollection);
   }

  agregaNota(nuevaNota:Nota):Promise<any>{
    return this.myCollection.add(nuevaNota);
  }
  /*
  leeNotas():Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
    return this.myCollection.get();
  }*/

  leeNotas(): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
    return this.myCollection.ref.where('email','==',this.authS.user.email).get();
  }

  /**
   *  Realiza la lectura de firebase de una nota dada por una clave
   * @param id la clave del documento (nota) a leer
   * @return un obseravble con la informacion de la nota seleccionada
   */
  leeNota(id:any):Observable<any>{
    return this.myCollection.doc(id).get();
  }

  actualizaNota(id:any, nuevaNota:Nota):Promise<void>{
    return this.myCollection.doc(id).set({titulo:nuevaNota.titulo, texto:nuevaNota.texto, email:nuevaNota.email});
  }

  borraNota(id:any):Promise<void>{
    return this.myCollection.doc(id).delete();
  }
  //Fin crud básico
  leerNotasPorCriterio(){
    //por implementar
  }
}
