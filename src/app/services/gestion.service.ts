import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private productsApi = 'http://localhost:8080/api/produit';

  constructor(private http: HttpClient) { }

  saveProducts(products: any): Observable<any> {
    return this.http.post(`${this.productsApi}/save`, products);
  }


  getAllProducts(): Observable<any>{
    const productlist = `${this.productsApi}/list`;
    return this.http.get<any>(productlist);
  }

  editProduct(product: any):Observable<any>{
    const editUrl = `${this.productsApi}/${product.id}`;
    return this.http.put(editUrl, product);
  }

  /* ajoutProduitPanier(id:number, quantite: number):Observable<any>{
    const ajoutUrl = `${this.productsApi}/addToPanier`;
    const body = new URLSearchParams();
    body.set('id', id.toString());
    body.set('quantite', quantite.toString());
    return this.http.post(ajoutUrl,body.toString(),{
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })

    });
  } */
  addProduct(product: FormData): Observable<any> {
    return this.http.post(`${this.productsApi}/addProduct`, product);
  }

}
