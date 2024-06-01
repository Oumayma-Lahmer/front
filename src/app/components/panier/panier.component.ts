import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandeService } from 'src/app/services/commande.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier$: Observable<PanierResponse>;
  id!: number;
  quantite!: number;
  selectedFile: File |null = null;
  clientId : number | null = null;

  constructor( private panierService: PanierService, 
               private commandeService : CommandeService,) {
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

  /*passerCommande(){
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('clientId', 'clientIdGoesHere'); 

      this.commandeService.uploadOrdonnance(formData).subscribe(response => {
        console.log('File uploaded successfully');
        this.commandeService.saveCommande({ elements: this.panier }).subscribe(response => {
          console.log('Commande passée avec succès');
          this.panierService.clearPanier();
          this.loadPanier();
        }, error => {
          console.error('Erreur lors de la sauvegarde de la commande', error);
        });
      }, error => {
        console.error('Erreur lors du téléchargement de l\'ordonnance', error);
      });
    } else {
      alert('Veuillez télécharger une ordonnance.');
    }
  }
*/

}
interface PanierResponse {
  elemList: any[];
}