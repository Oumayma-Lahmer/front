import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CommandeService } from 'src/app/services/commande.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css',
  
  ]
})
export class PanierComponent implements OnInit {

  panier$: Observable<PanierResponse>;
  id!: number;
  quantite!: number;
  selectedFile: File |null = null;
  clientId : number | null = null;

  constructor( private panierService: PanierService, 
               private commandeService : CommandeService,
              private authService: AuthentificationService) {
                this.panier$ = this.panierService.panierElem$;          
                }

  ngOnInit(): void {
    
    this.panierService.loadPanier();
    /*this.panierService.panierElem$.subscribe(data => {
      this.panier = data.elemList;
    }); */

  }
  /*
  ajouterAuPanier(): void {
    this.panierService.ajouterAuPanier(this.id, this.quantite).subscribe(response => {
      console.log('Produit ajouté au panier', response);
      this.loadPanier();
    }, error => {
      console.error('Erreur lors de l\'ajout au panier', error);
    });
  }
  
  loadPanier(): void {
    this.panierService.getPanier().subscribe(data => {
      this.panier = data.elemList || [];
    }, error => {
      console.error('Erreur lors de la récupération du panier', error);
    });
  }
  */

  retirerDuPanier(id:number): void {
   /*
    this.panierService.retirerDuPanier(elem.produit.id).subscribe(() => {
      this.loadPanier();
    });
   */
    this.panierService.retirerDuPanier(id);
  }
  clearPanier(): void {
    this.panierService.clearPanier();
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }
  passerCommande() {
    if (this.selectedFile) {
      this.panier$.subscribe(panier => {
        const produitIds = panier.elemList.map(elem => elem.produit.id);
        const formData = new FormData();
        formData.append('file', this.selectedFile!);
  
        // Correctly fetch the client ID
        const clientId = this.getClientId(); 
        formData.append('clientId', clientId.toString()); 
  
        produitIds.forEach((id, index) => formData.append(`produitIds[${index}]`, id.toString()));
  
        this.commandeService.uploadOrdonnance(formData).subscribe(response => {
          console.log('File uploaded successfully');
  
          this.commandeService.saveCommande({
            clientId: clientId, // Ensure this key matches what the backend expects
            ordonnancePath: response.filePath,
            produits: panier.elemList
          }).subscribe(() => {
            console.log('Commande passée avec succès');
            this.panierService.clearPanier();
            this.panierService.loadPanier();
          }, error => {
            console.error('Erreur lors de la sauvegarde de la commande', error);
          });
        }, error => {
          console.error('Erreur lors du téléchargement de l\'ordonnance', error);
        });
      });
    } else {
      alert('Veuillez télécharger une ordonnance.');
    }
  }
  
  getClientId(): number {
    // Fetch the client ID from the appropriate source, e.g., user service or context
    // This is just a placeholder. Replace with actual implementation.
    return 102; // Replace with actual method to get the client ID
  }
  /*
  passerCommande(){
    if (this.selectedFile) {
      this.panier$.subscribe(panier => {
        const produitIds = panier.elemList.map(elem => elem.produit.id );
        const formData = new FormData();
        formData.append('file', this.selectedFile!);
        const clientId = 102;
        formData.append('clientId', clientId.toString());
       //formData.append('clientId',this.clientId ? this.clientId.toString():''); 
        produitId.forEach((id,index)=> formData.append(`produitIds[${index}]`, id.toString()));
        this.commandeService.uploadOrdonnance(formData).subscribe(response => {
          console.log('File uploaded successfully');
          this.commandeService.saveCommande({
            clientId: this.clientId,
            ordonnancePath: response.filePath,
            produits: panier.elemList
          }).subscribe(() => {
            console.log('Commande passée avec succès');
            this.panierService.clearPanier();
            this.panierService.loadPanier();
          }, error => {
            console.error('Erreur lors de la sauvegarde de la commande', error);
          });
        }, error => {
          console.error('Erreur lors du téléchargement de l\'ordonnance', error);
        });
      });
          /*const newCommande = {elements: this.panier$,
            clientId: this.clientId,
            ordonnancePath: response.filePath}
          this.commandeService.saveCommande(newCommande).subscribe(response => {
            console.log('Commande passée avec succès');
            this.panierService.clearPanier();
            this.panierService.loadPanier();
          }, error => {
            console.error('Erreur lors de la sauvegarde de la commande', error);
          });
        }, error => {
          console.error('Erreur lors du téléchargement de l\'ordonnance', error);
        });
      });////////////////////////////////////////////////////////////////
     
    } else {
      alert('Veuillez télécharger une ordonnance.');
    }
  }

*/
getTotalPrice(elemList: any[]): number {
  return elemList.reduce((total, elem) => total + (elem.produit.prix * elem.quantite), 0);
}
}
interface PanierResponse {
  elemList: any[];
}