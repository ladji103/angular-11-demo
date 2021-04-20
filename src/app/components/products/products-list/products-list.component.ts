import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../models/product.model';
import {ActionEvent, AppDataState, DataStateEnum, EventActionTypes} from '../../../state/product.state';
import {ProductService} from '../../../services/product.service';
import {EventDriverService} from '../../../services/event.driver.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products$?: Observable<AppDataState<Product[]>>;
  // @Output() productEventActions: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStatEnum = DataStateEnum;

  constructor(private eventDriverService: EventDriverService) {
  }

  ngOnInit(): void {
  }


  onActionEvent(event: ActionEvent) {
    this.eventDriverService.publishEvent(event);
  }
}
