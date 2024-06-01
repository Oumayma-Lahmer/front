import { Component, OnInit } from '@angular/core';

import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {

  CommandeList: any[] = [];
  constructor(private commandeService: CommandeService) { }
  ngOnInit(): void {
    this.loadCommandeList();
  }
  loadCommandeList() {
    this.commandeService.getAllCommand().subscribe(
      (commande: any[]) => {
        console.log('Données de commande récupérées avec succès :', commande);
        this.CommandeList = commande.filter(commande=> commande.etat === 'Non confirmée');
      },
      error => {
        console.error('Erreur lors du chargement de la liste des commandes', error);
        
      }
    );
  }
  toggleDetails(commande: any) {
    commande.showDetails = !commande.showDetails;
  }
  accepterCommande(commande: any) {
    commande.etat = 'Non confirmée'
    if (confirm('Voulez-vous vraiment accepter cette commande ?')) {
      commande.etat = 'confirmé';
      this.commandeService.updateCommande(commande).subscribe(
        response => {
          console.log('Commande accepté avec succès', response);
        },
        error => {
          console.error('Erreur lors de l\'acceptation du commande', error);
        }
      );
    }
  }
  annulerCommande(commande: any) {
    if (confirm('Voulez-vous vraiment annuler cette commande ?')) {
      commande.etat = 'nonconfirme';
      this.commandeService.updateCommande(commande).subscribe(
        response => {
          console.log('Commande annulé avec succès', response);
        },
        error => {
          console.error('Erreur lors de l\'annulation du rendez-vous', error);
        }
      );
    }
  }
  supprimerCommande(Commande: any):void{
    if(confirm('Voulez-vous vraiment supprimer cette commande ?')){
      this.commandeService.deleteCommande(Commande).subscribe(() => {
        // Suppression réussie, recharger la liste des clients
        this.loadCommandeList();
      },
      error => {
        console.error('Une erreur s\'est produite lors de la suppression du client :', error);
      }
    );

    }
  }
  updateCommande(commande: any) {
    // Créer une nouvelle date au format "yyyy-MM-dd"
    const formattedDate = new Date(commande.date).toISOString().substr(0, 10);
    // Copier le commande et mettre à jour la date formatée
    const updatedCommande = { ...commande, date: formattedDate };
    this.commandeService.updateCommande(updatedCommande).subscribe(
      response => {
        console.log('Commmande mis à jour avec succès', response);
      },
      error => {
        console.error('Erreur lors de la mise à jour du commande', error);
      }
    );
  }
}