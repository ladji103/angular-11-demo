import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, EventActionTypes} from '../../../state/product.state';
import {EventDriverService} from '../../../services/event.driver.service';

@Component({
  selector: 'app-nav-bar-product',
  templateUrl: './nav-bar-product.component.html',
  styleUrls: ['./nav-bar-product.component.css']
})
export class NavBarProductComponent implements OnInit {

  // @Output() productEventAction: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor(private eventDriverService: EventDriverService) {
  }

  ngOnInit(): void {
  }

  loadProducts() {
    // this.productEventAction.emit(
    //   {
    //     type: EventActionTypes.GET_ALL_PRODUCTS
    //   }
    // );
    this.eventDriverService.publishEvent(
      {
        type: EventActionTypes.GET_ALL_PRODUCTS
      }
    );
  }

  loadSelectedProduct() {
    this.eventDriverService.publishEvent(
      {
        type: EventActionTypes.GET_SELECTED_PRODUCTS
      }
    );
  }

  loadAvailableProduct() {
    this.eventDriverService.publishEvent(
      {
        type: EventActionTypes.GET_AVAILABLE_PRODUCTS
      }
    );
  }

  searchProducts(dataForm: any) {
    this.eventDriverService.publishEvent(
      {
        type: EventActionTypes.SEARCH_PRODUCTS,
        payload: dataForm
      }
    );
  }

  newProduct() {
    this.eventDriverService.publishEvent(
      {
        type: EventActionTypes.NEW_PRODUCT
      }
    );
  }
}
