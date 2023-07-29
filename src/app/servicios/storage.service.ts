import { Injectable } from '@angular/core';
import {getDownloadURL, getStorage, ref, UploadResult, uploadString} from 'firebase/storage'
import { url } from 'inspector';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private respuesta:UploadResult
 

  private storage = getStorage()//creamos una variable privada
  constructor() { }

  //obtener la referencia del storage ----(en este caso lo obtenemos con linea getStorage())
  //Dar la ruta donde se va a guardar la imagen dentro del storage (en referenciaImagen)
  // Creamos la tarea que se encarga de subir la imagen (en este caso estamos usando el metodo uploadString())
  // Obtener la URL de la imagen subida

 async subirImagen(nombre:string, imagen:string){//creamos una funcion asincrona con los datos que va a tener la iamgen para luego llamarla (nombre para asignarle un nombre y imagen para darle una direccion)
  try{  //para capturar el error, le propociono un camino para que el programa sia funcionando
  let referenciaImagen =ref(this.storage,'Mujer/'+nombre) //creamos la variable para importarla arriba, los parametros son storage y la url (donde quiero que este)
    this.respuesta= await uploadString(referenciaImagen,imagen,'data_url')// se encarga de subir la imagen enn el storage
    .then(resp=>{//devuelve una promesa en caso de algun error, la promesa te promete realizar una funcion en el futuro
        return resp
    })
  } 
  catch(error){//capturamos el error
    console.log(error)
    return this.respuesta
  }
    

    return this.respuesta
  }//dentro de la carpeta bebidas, me guarda la imagen con el nombre que le pusimos

  obtenerUrlImagen(respuesta:UploadResult){
   return getDownloadURL(respuesta.ref)//nos devuelve la referencia a la imagen, lo retorna
  }
}