import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../models/product.model';
import {ActionEvent, EventActionTypes} from '../../../../state/product.state';
import {EventDriverService} from '../../../../services/event.driver.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | null = null;
  // @Output() productEventActions: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor(private eventDriverService: EventDriverService) {
  }

  ngOnInit(): void {
  }

  getStatSelected(selected: boolean): string {
    return selected ? 'OUI' : 'NON';
  }

  onSelect(product: Product) {
    // this.productEventActions.emit({
    //   type: EventActionTypes.SELECT_PRODUCT,
    //   payload: product
    // });
    this.eventDriverService.publishEvent({
      type: EventActionTypes.SELECT_PRODUCT,
      payload: product
    });
  }

  editProduct(product: Product) {
    // this.productEventActions.emit({
    //   type: EventActionTypes.EDIT_PRODUCT,
    //   payload: product.id
    // });
    this.eventDriverService.publishEvent({
      type: EventActionTypes.EDIT_PRODUCT,
      payload: product.id
    });
  }

  onDeleteProduct(product: Product) {
    // this.productEventActions.emit({
    //   type: EventActionTypes.DELETE_PRODUCT,
    //   payload: product
    // });
  this.eventDriverService.publishEvent({
      type: EventActionTypes.DELETE_PRODUCT,
      payload: product
    });
  }
}
