import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Place from '../interface/place'
import Place2 from '../interface/place2';
import { arrayUnion, getFirestore, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private firestore: Firestore) { }

  addPlace(place: Place) {
    const placeRef = collection(this.firestore, 'Sitios');
    return addDoc(placeRef, place);
  }

  editDoc(name: string, nuevoDato) { 

    updateDoc(doc(getFirestore(),'Sitios', name), { reserva: arrayUnion(nuevoDato) })
      .then(() => {
        console.log('Nuevo dato agregado al array en Firestore');
      })
      .catch(error => {
        console.error('Error al agregar el nuevo dato al array en Firestore:', error);
    });
    
  }

  getPlaces(): Observable<Place[]> {
    const placeRef = collection(this.firestore, 'Sitios');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Place[]>;
  }

  deletePlace(place: Place) {
    const placeDocRef = doc(this.firestore, `Sitios/${place.id}`);
    return deleteDoc(placeDocRef);
  }
  
  addPlace2(place: Place2) {
    const placeRef = collection(this.firestore, 'places2');
    return addDoc(placeRef, place);
  }

  getPlaceById(placeId: string): Observable<Place> {
    const placeDocRef = doc(this.firestore, 'Sitios', placeId);
    return new Observable<Place>((observer) => {
      getDoc(placeDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const place = {
              id: docSnapshot.id,
              ...docSnapshot.data()
            } as Place;
            observer.next(place);
          } else {
            observer.error('El documento no existe');
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  getPlaces2(place : Place) {
    const placeRef = collection(this.firestore, `Sitios/${place}`);
    return collectionData(placeRef) as Observable<Place[]>;
  }

  deletePlace2(place: Place2) {
    const placeDocRef = doc(this.firestore, `places2/${place.id}`);
    return deleteDoc(placeDocRef);
  }

}
