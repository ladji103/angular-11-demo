import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../../models/product.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: number;
  product?: Product;
  productForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private productService: ProductService) {
    this.productId = activatedRoute.snapshot.params?.id;
    this.productForm = this.fb.group({
      id: null,
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      available: [false, Validators.required],
      selected: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.productId) {
      this.loadProductById();
    }
  }

  loadProductById() {
    this.productService.findProductById(this.productId)
      .subscribe(res => {
        this.product = res;
        this.productForm.setValue(res);
      });
  }

  onSubmit(formGroup: FormGroup) {
    this.productId ? this.updateProduct(formGroup.value) : this.saveProduct(formGroup.value);
  }

  saveProduct(product: Product) {
    this.productService.addProduct(product)
      .subscribe(res => {
        confirm('Produit ' + res.name + ' ajouté avec succès!');
      });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product)
      .subscribe(res => {
        confirm('Produit ' + res.name + ' modifié avec succès!');
      });
  }
}
