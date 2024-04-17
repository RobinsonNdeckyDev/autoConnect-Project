import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VendeursComponent } from './vendeurs/vendeurs.component';
import { AcheteursComponent } from './acheteurs/acheteurs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { NewslettersComponent } from './newsletters/newsletters.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SignalementsComponent } from './signalements/signalements.component';
import { VoituresComponent } from './voitures/voitures.component';
import { MotosComponent } from './motos/motos.component';
import { UtilitairesComponent } from './utilitaires/utilitaires.component';
import { DtsVoitureComponent } from './dts-voiture/dts-voiture.component';
import { DtsMotoComponent } from './dts-moto/dts-moto.component';
import { DtsUtilitaireComponent } from './dts-utilitaire/dts-utilitaire.component';
import { LogoutAdminComponent } from './logout-admin/logout-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { FormsModule } from '@angular/forms';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { HttpClientModule } from '@angular/common/http';
// import DataTables from 'datatables.net';




@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    VendeursComponent,
    AcheteursComponent,
    BlogsComponent,
    NewslettersComponent,
    CategoriesComponent,
    ContactsComponent,
    AccueilAdminComponent,
    MainAdminComponent,
    SignalementsComponent,
    VoituresComponent,
    MotosComponent,
    UtilitairesComponent,
    DtsVoitureComponent,
    DtsMotoComponent,
    DtsUtilitaireComponent,
    LogoutAdminComponent,
    ProfilAdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    // DataTables
  ],
  providers: [ListeUsersService],
})
export class AdminModule {}
