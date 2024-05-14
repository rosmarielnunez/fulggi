import { Injectable } from '@angular/core';
import { Products } from '../model/products';
import { Firestore, collection, addDoc, collectionData, query, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsByCategory: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>([]);
  public readonly productsByCategory$: Observable<Products[]> = this.productsByCategory.asObservable();

  constructor(private firestore: Firestore) { }

  addProduct(product: Products) {
    const productRef = collection(this.firestore, 'product');
    const productData = { ...product, productName: new Date() };
    console.log(productData)
    return addDoc(productRef, productData);
  }

  getProducts(): Observable<Products[]> {
    const productRef = collection(this.firestore, 'product');
    return collectionData(productRef, { idField: 'id' }) as Observable<Products[]>;
  }

  getProductsByCategory(category: string): Observable<Products[]> {
    const productRef = collection(this.firestore, 'product');
    const q = query(productRef, where('category', '==', category));
    const products$ = collectionData(q, { idField: 'id' }) as Observable<Products[]>;

    products$.subscribe(products => {
      this.productsByCategory.next(products);
    });

    return products$;
  }
}
