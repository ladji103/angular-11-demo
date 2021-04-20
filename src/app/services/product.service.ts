import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) {
  }

  findProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  findSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products?selected=true');
  }

  findAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products?available=true');
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products?name_like=' + keyword);
  }

  select(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this.http.put<Product>('http://localhost:3000/products/' + product.id, product);
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/products/' + product.id);
  }

  findProductById(id: number): Observable<Product> {
    return this.http.get<Product>('http://localhost:3000/products/' + id,);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/products', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('http://localhost:3000/products/' + product.id, product);
  }
}
