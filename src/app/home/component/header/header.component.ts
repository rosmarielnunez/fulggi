import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../model/products';
import { SearchService } from '../../services/search.service'; 
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  opened = false;
  products: Products[] = [];
  isSearching = false;
  searchResults: Products[] = [];
  searchByLetter ='';
  loggedIn: boolean = false;




  constructor(private productsService: ProductsService,
              private searchService: SearchService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(){
    this.loggedIn = this.userService.isLoggetIn();
  }
 
  onSearchSubmit() {
    this.searchService.setSearchByLetter(this.searchByLetter);

  }

  onCategorySelected(category: string) {
    this.productsService.getProductsByCategory(category).subscribe(products => {
      this.searchService.setSearchByLetter(category);
      this.isSearching = true;
      console.log(products);
    });
  }
  
  onLogout() {
    this.userService.logout();
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

}

