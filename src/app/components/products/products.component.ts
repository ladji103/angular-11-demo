import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {ActionEvent, AppDataState, DataStateEnum, EventActionTypes} from '../../state/product.state';
import {Observable, of, pipe} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';
import {EventDriverService} from '../../services/event.driver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$?: Observable<AppDataState<Product[]>>;
  readonly DataStatEnum = DataStateEnum;

  constructor(private productService: ProductService,
              private eventDriverService: EventDriverService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable
      .subscribe((event: ActionEvent) => this.onActions(event));
  }

  loadProducts() {
    this.products$ = this.productService.findProducts()
      .pipe(
        map(res => ({dataState: DataStateEnum.LOADED, data: res})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, error: err.message}))
      );
  }

  loadSelectedProduct() {
    this.products$ = this.productService.findSelectedProducts()
      .pipe(
        map(res => ({dataState: DataStateEnum.LOADED, data: res})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, error: err.message}))
      );
  }

  loadAvailableProduct() {
    this.products$ = this.productService.findAvailableProducts()
      .pipe(
        map(res => ({dataState: DataStateEnum.LOADED, data: res})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, error: err.message}))
      );
  }

  searchProducts(value: any) {
    this.products$ = this.productService.searchProducts(value.keyword)
      .pipe(
        map(res => ({dataState: DataStateEnum.LOADED, data: res})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, error: err.message}))
      );
  }

  onSelect(product: Product) {
    this.productService.select(product)
      .subscribe(res => product.selected = res.selected);
  }

  onDeleteProduct(product: Product) {
    let c = confirm('Etes-vous sûre de supprimer ce produit?');
    if (c) {
      this.productService.deleteProduct(product)
        .subscribe(res => this.loadProducts());
    }
  }

  onActions(event: ActionEvent) {
    switch (event.type) {
      case EventActionTypes.GET_ALL_PRODUCTS:
        this.loadProducts();
        break;
      case EventActionTypes.GET_SELECTED_PRODUCTS:
        this.loadSelectedProduct();
        break;
      case EventActionTypes.GET_AVAILABLE_PRODUCTS:
        this.loadAvailableProduct();
        break;
      case EventActionTypes.SEARCH_PRODUCTS:
        this.searchProducts(event.payload);
        break;
      case EventActionTypes.NEW_PRODUCT:
        this.router.navigateByUrl('/product');
        break;
      case EventActionTypes.SELECT_PRODUCT:
        this.onSelect(event.payload);
        break;
      case EventActionTypes.DELETE_PRODUCT:
        this.onDeleteProduct(event.payload);
        break;
      case EventActionTypes.EDIT_PRODUCT:
        this.router.navigateByUrl('/product/' + event.payload);
        break;


    }
  }
}
