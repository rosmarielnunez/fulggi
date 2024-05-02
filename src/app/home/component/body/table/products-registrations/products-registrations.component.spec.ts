import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRegistrationsComponent } from './products-registrations.component';

describe('ProductsRegistrationsComponent', () => {
  let component: ProductsRegistrationsComponent;
  let fixture: ComponentFixture<ProductsRegistrationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsRegistrationsComponent]
    });
    fixture = TestBed.createComponent(ProductsRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
