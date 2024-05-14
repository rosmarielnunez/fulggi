import { Injectable } from '@angular/core';
import { Products } from '../model/products';
import { collection, query, orderBy, startAfter, limit, getDocs, endAt } from "firebase/firestore";
import { Observable } from 'rxjs';
import { Firestore, collectionData } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private firestore: Firestore) {

  }

  getProductsPage(startAfterDoc: any, endBeforeDoc: any, pageSize: number = 10): Observable<Products[]> {
    const productRef = collection(this.firestore, 'product');
    let q: any;

    if (startAfterDoc) {
      q = query(productRef, orderBy('productName'), startAfter(startAfterDoc), limit(pageSize));
    } else if (endBeforeDoc) {
      q = query(productRef, orderBy('productName'), endAt(endBeforeDoc), limit(pageSize));
    } else {
      q = query(productRef, orderBy('productName'), limit(pageSize));
    }

    return new Observable((observer) => {
      getDocs(q).then(documentSnapshots => {
        const data = documentSnapshots.docs.map(doc => doc.data()) as Products[];
        observer.next(data);
      }).catch(error => {
        observer.error(error);
      });
    });
  }

}
