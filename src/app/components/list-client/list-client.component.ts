import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  clients: any;


  clientSelect : any;
  formModification: FormGroup;

  recherche: string='';

  

  constructor(private authService: AuthentificationService ,  private router: Router, private formBuilder: FormBuilder) { 

    this.formModification = this.formBuilder.group({
      nom:['', Validators.required],
      email:['', Validators.required],
      adresse:['', Validators.required],
      telephone:['', Validators.required]
    });
  }
  
  
  
  ngOnInit(): void {
    this.getAllClients();

  }
  getAllClients(): void{
    this.authService.getAllClients().subscribe(
      clients => {
        this.clients = clients;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération de clients :', error);
      }
    );
  }

  afficheForm(client: any){
    this.clientSelect = client;
    this.formModification.patchValue({
      nom: client.nom,
      email : client.email,
      adresse : client.adresse,
      telephone : client.telephone

    });

  }
  
  soumettreFormulaire(){
    if(this.formModification.valid){
      
      const nom = this.formModification.value.nom;
      const email = this.formModification.value.email;
      const telephone = this.formModification.value.telephone;
      const adresse = this.formModification.value.adresse;
      const id = this.clientSelect.id;

      const clientModifier = {id, nom, email,adresse, telephone};

      this.authService.editClient(clientModifier).subscribe(() => {

       
        // Réinitialiser le formulaire et masquer le formulaire de modification
        this.formModification.reset();
        this.clientSelect = null;
      }, error => {
        console.error('Erreur lors de la modification du produit:', error);
        
      });
    }
  }

  deleteClient(Client: any):void{
    if(confirm('Voulez-vous vraiment supprimer ce client ?')){
      this.authService.deleteClient(Client).subscribe(() => {
        // Suppression réussie, recharger la liste des clients
        this.getAllClients();
      },
      error => {
        console.error('Une erreur s\'est produite lors de la suppression du client :', error);
      }
    );

    }
  }
  
 
  

}

interface Client{
  id: number;
  nom: string;
  email: string;
  telephone: string;
}

