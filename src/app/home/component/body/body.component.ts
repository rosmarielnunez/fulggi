import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../model/products';
import { SearchService } from '../../services/search.service';
import { PagesService } from '../../services/pages.service';
import { PageEvent } from '@angular/material/paginator';
import { collection, limit, orderBy } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  searchByLetter: string = '';
  products: Products[] = [];
  isSearching = false;
  pageSize = 10;
  last: any;
  first: any;


  constructor(private productService: ProductsService,
    private searchService: SearchService,
    private pagesService: PagesService,
    private firestore: Firestore) {
  }

  ngOnInit() {
    this.getProducts()
    this.searchService.getSearchByLetter().subscribe(value => {
      this.searchByLetter = value;
      this.isSearching = true;
    });
  }

  getProducts() {
    this.pagesService.getProductsPage(this.first, this.last, this.pageSize).subscribe((data: Products[]) => {
      if (data.length > 0) {
        this.products = data;
        this.first = data[0];
        this.last = data[data.length - 1];
        this.isSearching = true;
        console.log(this.products);
      }
    });
  }

  nextPage() {
    this.pagesService.getProductsPage(this.last, null, this.pageSize).subscribe((data: Products[]) => {
      console.log('Next page - Data:', data)
      if (data.length > 0) {
        this.products = data;
        this.first = data[0];
        this.last = data[data.length - 1];
        console.log('Next page - Data:', this.first, this.last, data)
      }
    });
  }

  previousPage() {
    this.pagesService.getProductsPage(this.first, null, this.pageSize).subscribe((data: Products[]) => {
      console.log('Previous page - Data:', data)
      if (data.length > 0) {
        this.products = data;
        this.first = data[0];
        this.last = data[data.length - 1];
        console.log('Previous page - Data:', this.first, this.last, data)
      }
    })

  }


  getProductsByCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe((data: Products[]) => {
      this.products = data;
      this.isSearching = true;
    });
  }

}
