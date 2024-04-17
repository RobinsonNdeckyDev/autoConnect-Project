import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NewslettersComponent } from './newsletters/newsletters.component';
import { VendeursComponent } from './vendeurs/vendeurs.component';
import { AcheteursComponent } from './acheteurs/acheteurs.component';
import { SignalementsComponent } from './signalements/signalements.component';
import { VoituresComponent } from './voitures/voitures.component';
import { MotosComponent } from './motos/motos.component';
import { UtilitairesComponent } from './utilitaires/utilitaires.component';
import { DtsVoitureComponent } from './dts-voiture/dts-voiture.component';
import { DtsMotoComponent } from './dts-moto/dts-moto.component';
import { DtsUtilitaireComponent } from './dts-utilitaire/dts-utilitaire.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';

const routes: Routes = [
  {
    path: '',
    component: MainAdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Accueil_Admin',
        component: AccueilAdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'annonces',
        children: [
          {
            path: 'voitures',
            children: [
              { path: '', component: VoituresComponent },
              { path: 'dtsVoiture', component: DtsVoitureComponent },
            ],
          },
          {
            path: 'motos',
            children: [
              { path: '', component: MotosComponent },
              { path: 'dtsmoto', component: DtsMotoComponent },
            ],
          },
          {
            path: 'utilitaires',
            children: [
              { path: '', component: UtilitairesComponent },
              { path: 'dtsUtilitaire', component: DtsUtilitaireComponent },
            ],
          },
        ],
      },
      { path: 'annonces/voitures/detail/:id', component: DtsVoitureComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'profil_Admin', component: ProfilAdminComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'newsletters', component: NewslettersComponent },
      { path: 'utilisateurs/vendeurs', component: VendeursComponent },
      { path: 'utilisateurs/acheteurs', component: AcheteursComponent },
      { path: 'signalements', component: SignalementsComponent },
      { path: 'proprietaires', component: VendeursComponent },
      { path: 'acheteurs', component: AcheteursComponent },
      { path: '', redirectTo: 'Accueil_Admin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
