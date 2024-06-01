import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistreComponent } from './components/registre/registre.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { ListClientComponent } from './components/list-client/list-client.component';

import { StockComponent } from './components/stock/stock.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsComponent } from './components/products/products.component';
import { ListProduitsComponent } from './components/list-produits/list-produits.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { ContactComponent } from './components/contact/contact.component';
import { PanierComponent } from './components/panier/panier.component';
import { OrdonnanceComponent } from './components/ordonnance/ordonnance.component';
import { CommandeComponent } from './components/commande/commande.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'registre', component: RegistreComponent },
  { path: '', redirectTo: '/acc', pathMatch: 'full' },
  {path: 'layout', component: LayoutComponent},
  {path: 'acc', component: AcceuilComponent},
  {path: 'cli', component: ListClientComponent},
  {path: 'stock', component: StockComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'prod', component: ProductsComponent},
  {path: 'listProduit', component: ListProduitsComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'dashbord', component: DashbordAdminComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'panier', component: PanierComponent},
  {path: 'ordonnance', component: OrdonnanceComponent},
  {path: 'commande', component: CommandeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
