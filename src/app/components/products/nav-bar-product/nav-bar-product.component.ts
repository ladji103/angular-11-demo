import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, EventActionTypes} from '../../../state/product.state';

@Component({
  selector: 'app-nav-bar-product',
  templateUrl: './nav-bar-product.component.html',
  styleUrls: ['./nav-bar-product.component.css']
})
export class NavBarProductComponent implements OnInit {

  @Output() productEventAction: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }

  loadProducts() {
    this.productEventAction.emit(
      {
        type: EventActionTypes.GET_ALL_PRODUCTS
      }
    );
  }

  loadSelectedProduct() {
    this.productEventAction.emit(
      {
        type: EventActionTypes.GET_SELECTED_PRODUCTS
      }
    );
  }

  loadAvailableProduct() {
    this.productEventAction.emit(
      {
        type: EventActionTypes.GET_AVAILABLE_PRODUCTS
      }
    );
  }

  searchProducts(dataForm: any) {
    this.productEventAction.emit(
      {
        type: EventActionTypes.SEARCH_PRODUCTS,
        payload: dataForm
      }
    );
  }

  newProduct() {
    this.productEventAction.emit(
      {
        type: EventActionTypes.NEW_PRODUCT
      }
    );
  }
}
