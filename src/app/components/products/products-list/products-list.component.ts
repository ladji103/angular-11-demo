import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../models/product.model';
import {ActionEvent, AppDataState, DataStateEnum, EventActionTypes} from '../../../state/product.state';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products$?: Observable<AppDataState<Product[]>>;
  @Output() productEventActions: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStatEnum = DataStateEnum;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  getStatSelected(selected: boolean): string {
    return selected ? 'OUI' : 'NON';
  }

  onSelect(product: Product) {
    this.productEventActions.emit({
      type: EventActionTypes.SELECT_PRODUCT,
      payload: product
    });
  }

  onDeleteProduct(product: Product) {
    this.productEventActions.emit({
      type: EventActionTypes.DELETE_PRODUCT,
      payload: product
    });
  }

  editProduct(product: Product) {
    this.productEventActions.emit({
      type: EventActionTypes.EDIT_PRODUCT,
      payload: product.id
    });
  }
}
