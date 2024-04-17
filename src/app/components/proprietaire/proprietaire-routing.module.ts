import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainVendeurComponent } from './main-vendeur/main-vendeur.component';
import { AnnoncesVendeursComponent } from './annonces-vendeurs/annonces-vendeurs.component';
import { ProfilVendeurComponent } from './profil-vendeur/profil-vendeur.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { ProprietaireGard } from 'src/app/guards/proprietaire-guard.guard';
import { HttpClientModule } from '@angular/common/http';
// import { ModifierAnnonceComponent } from './modifier-annonce/modifier-annonce.component';


const routes: Routes = [
  {
    path: '',
    component: MainVendeurComponent,
    children: [
      {
        path: 'proprietaire',
        component: PublierAnnonceComponent, canActivate: [ProprietaireGard]
      },
      {
        path: 'mes_annonces',
        children: [
          { path: '', component: AnnoncesVendeursComponent },
        ],
      },
      {
        path: 'mon_profil',
        component: ProfilVendeurComponent,
      },
      {
        path: 'publierAnnonce',
        component: PublierAnnonceComponent,
      },
      {
        path: '',
        redirectTo: 'mes_annonces',
        pathMatch: 'full',
      },
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
  ],
  exports: [RouterModule]
})
export class ProprietaireRoutingModule { }
