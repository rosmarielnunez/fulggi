import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchTerm: string): any {
    if (!searchTerm || searchTerm.trim() === '') {
      return products;
    }

    return products.filter(product =>
      (product.productName && typeof product.productName === 'string' &&
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (product.flavor && typeof product.flavor === 'string' &&
       product.flavor.toLowerCase().includes(searchTerm.toLowerCase()))
            
    );
  }

}
