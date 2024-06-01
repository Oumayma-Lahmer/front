import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistreComponent } from './components/registre/registre.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { SalaireComponent } from './components/salaire/salaire.component';
import { ProductsComponent } from './components/products/products.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { StockComponent } from './components/stock/stock.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClientFilterPipe } from './client-filter.pipe';
import { AlertComponent } from './components/alert/alert.component';
import { ListCommandeComponent } from './components/list-commande/list-commande.component';
import { ListProduitsComponent } from './components/list-produits/list-produits.component';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopWidgetComponent } from './components/top-widget/top-widget.component';
import { ContactComponent } from './components/contact/contact.component';
import { PanierComponent } from './components/panier/panier.component';
import { OrdonnanceComponent } from './components/ordonnance/ordonnance.component';
import { CommandeComponent } from './components/commande/commande.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    RegistreComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    AcceuilComponent,
    SalaireComponent,
    ProductsComponent,
    ListClientComponent,
    StockComponent,
    ProfileComponent,
    ClientFilterPipe,
    AlertComponent,
    ListCommandeComponent,
    ListProduitsComponent,
    DashbordAdminComponent,
    SidebarComponent,
    TopWidgetComponent,
    ContactComponent,
    PanierComponent,
    OrdonnanceComponent,
    CommandeComponent,
   
    
  ],
  imports: [
ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
