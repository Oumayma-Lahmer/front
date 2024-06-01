import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private baseUrl = 'http://localhost:8080/api/produit';
  private panierElemSubject= new BehaviorSubject<PanierResponse>({ elemList: [] });
  public panierElem$ = this.panierElemSubject.asObservable();

  constructor(private http: HttpClient) {}

  ajouterAuPanier(id: number, quantite: number): Observable<any> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('quantite', quantite.toString());

    return this.http.post<any>(`${this.baseUrl}/addToPanier`,{}, { params, withCredentials: true }).pipe(
      map(response => {
        this.loadPanier(); // Load the cart after adding the item
        return response;
      })
    );
   
  }

  getPanier(): Observable<PanierResponse> {
   /* return this.http.get<PanierResponse>(`${this.baseUrl}/panier`, { withCredentials: true }).pipe(
      map(response => {
        this.panierElemSubject.next(response);
        return response;
      })
    ); 
   */
    return this.http.get<any>(`${this.baseUrl}/panier`, { withCredentials: true });
  }

  getPanierCount(): Observable<number> {
    return this.panierElem$.pipe(
      map(response => response.elemList.length)
    );
  }

  retirerDuPanier(id: number): void {
    this.http.delete(`${this.baseUrl}/removeFromPanier/${id}`, { withCredentials: true }).subscribe(
      () => this.loadPanier(),
      error => console.error('Erreur lors de la suppression du produit du panier', error)
    );
  }

  clearPanier(): void {
    this.panierElemSubject.next({ elemList: [] });
  }

  loadPanier(): void {
    /*this.getPanier().subscribe(panier => {
      this.panierElemSubject.next(panier);
    },
    error => {
      console.error('Failed to load panier', error);
    }
  );*/
  this.http.get<PanierResponse>(`${this.baseUrl}/panier`, { withCredentials: true }).subscribe(
    response => this.panierElemSubject.next(response),
    error => console.error('Erreur lors du chargement du panier', error)
  );
  }
}

interface PanierResponse {
  elemList: any[];
}
