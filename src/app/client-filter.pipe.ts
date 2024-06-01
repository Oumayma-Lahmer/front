import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientFilter'
})
export class ClientFilterPipe implements PipeTransform {

  transform(clients: any, recherche: string): any {
    if(!recherche){
      return clients;
    }
    return clients.filter((client: any) =>
      client.nom.toLowerCase().includes(recherche.toLowerCase()) 
    );
  }

}
