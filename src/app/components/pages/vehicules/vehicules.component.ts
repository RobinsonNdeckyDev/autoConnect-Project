import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css'],
})
export class VehiculesComponent {

  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";

  
  // liste des véhicules
  listemotos: any;
  listeVoitures: any;
  listeUtilitaires: any;
  tabProprietaires: any[] = [];
  annonceVoitureFiltered: any[] = [];
  annonceMotoFiltered: any[] = [];
  annonceUtilitaireFiltered: any[] = [];

  // constructeur
  constructor(
    private listeAnnonceService: PublierAnnonceService,
    private proprietaireService: ListeUsersService,
    private route: Router
  ) {}

  // initialisation
  ngOnInit(): void {
    // Proprietaires
    this.getProprietaire();
    // annonces en avant
    this.getAnnoncesEnAvant();
  }

  // Liste des proprietaires
  getProprietaire() {
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      this.tabProprietaires = response.proprietaire;
    });
  }

  // redirection vers la page details voiture
  redirectToDetailsVoiture(voitureId: number) {
    this.route.navigate(['vehicules/voitures/detailVoiture', voitureId]);
  }

  // redirection vers la page details moto
  redirectToDetailsMoto(motoId: number) {
    this.route.navigate(['vehicules/motos/detailMoto', motoId]);
  }

  // redirection vers la page details utilitaire
  redirectToDetailsUtilitaire(utilitaireId: number) {
    this.route.navigate([
      'vehicules/utilitaires/detailUtilitaire',
      utilitaireId,
    ]);
  }

  // Liste des annonces mises en avant
  getAnnoncesEnAvant() {
    this.listeAnnonceService.getAnnonceMisesEnAvant().subscribe(
      (response: any) => {
        console.log(response);
        // liste voitures
        this.listeVoitures = response.annoncesMisesEnAvant.voiture;

        // Pour chaque annonce de voiture, trouvez l'utilisateur concernée
        this.listeVoitures.forEach((annonce: any) => {
          const prorietaireAnnonceVoiture = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonceVoiture;
        });

        // Initialisation de annonceVoitureFiltered
        this.annonceVoitureFiltered = [...this.listeVoitures];
        console.log('annonceVoitureFiltered: ', this.annonceVoitureFiltered);

        // Pour chaque annonce de voiture, trouvez l'utilisateur concernée

        // liste motos
        this.listemotos = response.annoncesMisesEnAvant.moto;
       
        // Pour chaque annonce de moto, trouvez l'utilisateur concernée
        this.listemotos.forEach((annonce: any) => {
          const prorietaireAnnonceMoto = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonceMoto;
        });

        // Initialisation de annonceMotoFiltered
        this.annonceMotoFiltered = [...this.listemotos];
        console.log('annonceMotoFiltered: ', this.annonceMotoFiltered);

        // Pour chaque annonce de moto, trouvez l'utilisateur concernée

        // liste utilitaires
        this.listeUtilitaires = response.annoncesMisesEnAvant.utilitaire;
        
        // Pour chaque annonce de utilitaire, trouvez l'utilisateur concernée
        this.listeUtilitaires.forEach((annonce: any) => {
          const prorietaireAnnonceUtilitaire = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonceUtilitaire;
        });

        // Initialisation de anonceUtilitaireFiltered
        this.annonceUtilitaireFiltered = [...this.listeUtilitaires];
        console.log('annonceUtilitaireFiltered: ', this.annonceUtilitaireFiltered);

        // Pour chaque annonce de utilitaire, trouvez l'utilisateur concernée
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
}
