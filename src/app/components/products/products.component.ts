import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  Products: any = {
    nomCommercial: '',
    //nLot: '',
    //exp: '',
    prix: '',
    quantite: '',
    //dosage: '',
    //conditionnement: '',
    //etat: 'non-confirme',
  };
  selectedFile: File | null = null;
  
  IsAlert: boolean = false;
  

  constructor(private gestion: GestionService) { }

  ngOnInit(): void {
  }
 
  submitForm() {
    if (!this.selectedFile) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('nomCommercial', this.Products.nomCommercial);
    formData.append('prix', this.Products.prix.toString());
    formData.append('quantite', this.Products.quantite.toString());
    formData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.gestion.addProduct(formData)
      .subscribe(
        response => {
          console.log('Produit enregistré avec succès', response);
          this.resetForm();
          this.OnAlerteOpen();
        },
        error => {
          console.error('Erreur lors de l\'enregistrement du produit', error);
        }
      );
    // Vous pouvez ajouter une conversion de la date et de l'heure ici si nécessaire
    /*this.gestion.addProduct(this.Products)
      .subscribe(
        response => {
          console.log('Produit enregistré avec succès', response);
          // Effectuez des actions supplémentaires si nécessaire
        },
        error => {
          console.error('Erreur lors de l\'enregistrement du produit', error);
          // Gérez les erreurs de manière appropriée
        }
      );
      this.Products = {
        nomCommercial: '',
        nLot: '',
        exp: '',
        prix: '',
        quantite: '',
        dosage: '',
        conditionnement: '',
        etat: 'non-confirme',
      };
      */
      
  }
  resetForm() {
    this.Products = {
      nomCommercial: '',
      prix: '',
      quantite: '',
    };
    this.selectedFile = null;
  }
  OnAlerteOpen() {
    console.log('Alerte ouverte');
    this.IsAlert = true;
  }
  OnAlerteClose() {
    console.log('Alerte fermée');
    this.IsAlert = false;
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  
}



