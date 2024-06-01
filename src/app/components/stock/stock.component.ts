import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  products : any;

  productSelect : any;
  formModification: FormGroup;

  constructor(private gestion: GestionService, private router: Router,  private formBuilder: FormBuilder) { 
    this.formModification = this.formBuilder.group({
      nomCommercial:['', Validators.required],
      quantite:['', Validators.required],
      prix:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllproducts();
  }
  getAllproducts(): void{
    this.gestion.getAllProducts().subscribe(
      product => {
        this.products= product;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération de product :', error);
      }
    );
  }

  afficheForm(product: any){
    this.productSelect = product;
    this.formModification.patchValue({
      nomCommercial: product.nomCommercial,
      quantite: product.quantite,
      prix: product.prix,
    });

  }

  soumettreFormulaire(){
    if(this.formModification.valid){
      
      const nomCommercial = this.formModification.value.nomCommercial;
      const quantite = this.formModification.value.quantite;
      const prix = this.formModification.value.prix;
      const id = this.productSelect.id;

      const produitModifier = {id, nomCommercial, quantite, prix};

      this.gestion.editProduct(produitModifier).subscribe(() => {

       
        // Réinitialiser le formulaire et masquer le formulaire de modification
        this.formModification.reset();
        this.productSelect = null;
      }, error => {
        console.error('Erreur lors de la modification du produit:', error);
        
      });
    }
  }

}
