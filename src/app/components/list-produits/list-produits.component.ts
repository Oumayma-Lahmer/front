import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/services/gestion.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.css']
})
export class ListProduitsComponent implements OnInit {

  produits: any[] = [];
  quantite : number = 1;
  message: string ='';
  constructor(private gestion: GestionService, private panierService: PanierService) { }

  ngOnInit(): void {
    this.productList();
  }

  productList() {
    this.gestion.getAllProducts().subscribe(
      (produit: any[]) => {
        this.produits = this.filterDuplicates(produit) ;
        
      },
      error => {
        console.error('Erreur lors du chargement de la liste des produits', error);
        
      }
    );
  }
  filterDuplicates(products: any[]): any[] {
    const uniqueProducts = new Map();
    products.forEach(product => {
      const key = `${product.nomCommercial}_${product.imageUrl}_${product.prix}`;
      if (!uniqueProducts.has(key)) {
        uniqueProducts.set(key, product);
      }
    });
    return Array.from(uniqueProducts.values());
  }


 ajoutProduitPanier(id: number): void {
  this.panierService.ajouterAuPanier(id, this.quantite).subscribe(response => {
    console.log('Produit ajouté au panier avec succès', response);
    this.message = 'Produit ajouté au panier avec succès';
  }, error => {
    console.error('Erreur lors de l\'ajout du produit au panier', error);
    this.message = 'Erreur lors de l\'ajout du produit au panier';

  });
  
 }
 incrementQuantity() {
  this.quantite++;
}

decrementQuantity() {
  if (this.quantite > 1) {
    this.quantite--;
  }
}

}
