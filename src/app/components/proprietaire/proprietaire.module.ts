import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProprietaireRoutingModule } from './proprietaire-routing.module';
import { MainVendeurComponent } from './main-vendeur/main-vendeur.component';
import { AnnoncesVendeursComponent } from './annonces-vendeurs/annonces-vendeurs.component';
import { ProfilVendeurComponent } from './profil-vendeur/profil-vendeur.component';
import { SidebarVendeurComponent } from './sidebar-vendeur/sidebar-vendeur.component';
import { NavbarVendeurComponent } from './navbar-vendeur/navbar-vendeur.component';
import { RouterModule } from '@angular/router';
import { LogoutProprietaireComponent } from './logout-proprietaire/logout-proprietaire.component';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import DataTables from 'datatables.net';
// import { ModifierAnnonceComponent } from './modifier-annonce/modifier-annonce.component';



@NgModule({
  declarations: [
    MainVendeurComponent,
    AnnoncesVendeursComponent,
    ProfilVendeurComponent,
    SidebarVendeurComponent,
    NavbarVendeurComponent,
    LogoutProprietaireComponent,
    PublierAnnonceComponent,
    // ModifierAnnonceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProprietaireRoutingModule,
    FormsModule,
    // DataTables
  ]
})
export class ProprietaireModule { }
