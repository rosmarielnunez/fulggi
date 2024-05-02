import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../model/products';
import { SearchService } from '../../services/search.service'; 
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements AfterViewInit {
  searchByLetter: string = '';
  products: Products[] = [];
  isSearching = false;
  showFirstLastButtons = true;
  pageIndex = 0;
  pageSize = 10;
  lastDocument: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

 constructor(private productService: ProductsService,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.getProducts()
    this.searchService.getSearchByLetter().subscribe(value => {
    this.searchByLetter = value;
    this.isSearching = true;
    });
  }

  getProducts() {
    this.productService.getProductsPage(this.lastDocument, this.pageSize).subscribe((data: Products[]) =>{
      if (data.length > 0) {
        this.products = data;
        this.isSearching = true;
        console.log(this.products)
      }
    });
  }

  ngAfterViewInit(){
    if (this.paginator) {
    this.paginator.page.subscribe(() => {
      this.pageIndex = this.paginator.pageIndex;
      this.getProducts();
      console.log(Response)
    });
   }
  }

  getProductsByCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe((data: Products[]) => {
      this.products = data;
      this.isSearching = true;
    });
  }

}
