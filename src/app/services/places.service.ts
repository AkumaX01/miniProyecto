import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Place from '../interface/place'
import Place2 from '../interface/place2';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private firestore: Firestore) { }

  addPlace(place: Place) {
    const placeRef = collection(this.firestore, 'places');
    return addDoc(placeRef, place);
  }

  getPlaces(): Observable<Place[]> {
    const placeRef = collection(this.firestore, 'places');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Place[]>;
  }

  deletePlace(place: Place) {
    const placeDocRef = doc(this.firestore, `places/${place.id}`);
    return deleteDoc(placeDocRef);
  }
  
  addPlace2(place: Place2) {
    const placeRef = collection(this.firestore, 'places2');
    return addDoc(placeRef, place);
  }

  getPlaces2(): Observable<Place2[]> {
    const placeRef = collection(this.firestore, 'places2');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Place2[]>;
  }

  deletePlace2(place: Place2) {
    const placeDocRef = doc(this.firestore, `places2/${place.id}`);
    return deleteDoc(placeDocRef);
  }

}
