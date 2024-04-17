import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { ListeUtilitairesService } from 'src/app/services/liste-utilitaires.service';
import { ListeVoituresService } from 'src/app/services/liste-voitures.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';

@Component({
  selector: 'app-utilitaires',
  templateUrl: './utilitaires.component.html',
  styleUrls: ['./utilitaires.component.css'],
})
export class UtilitairesComponent {

  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";
  
  listeUtilitaires: any;
  ListeAnnonces: any[] = [];
  utilitaireId?: number;
  utilitaireDetails: any;
  tabProprietaires: any[] = [];
  proprietaireInfo: any;
  utilitaireSelected: any;
  searchTerm: string = '';
  fiteredUtilitaires: any[] = [];
  isLoading: boolean = true;

  constructor(
    private listeUtilitaireService: ListeUtilitairesService,
    private listeAnnonceService: PublierAnnonceService,
    private proprietaireService: ListeUsersService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getProprietaire();

    this.getAnnoncesValides();
  }

  // Méthode pour récupérer la liste des propriétaires
  getProprietaire() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      console.log(response);
      console.log(response);
      this.tabProprietaires = response.proprietaire;
      console.log('liste props: ', this.tabProprietaires);
    });
  }

  // Liste des annonces mises en avant
  getAnnoncesValides() {
    let categorie = 3;

    this.listeAnnonceService.getAnnonceValideProp().subscribe(
      (response: any) => {
        console.log(response);
        // liste utilitaires
        this.ListeAnnonces = response.annonces;
        console.log('utilitaires: ', this.ListeAnnonces);

        this.listeUtilitaires = this.ListeAnnonces.filter(
          (element: any) => element.categorie_id === categorie
        );
        console.log('listeUtilitaires filtrées: ', this.listeUtilitaires);

        // Pour chaque annonce, trouvez l'utilisateur concernée
        this.listeUtilitaires.forEach((annonce: any) => {
          const prorietaireAnnonce = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );
          console.log('prorietaireAnnonce: ', prorietaireAnnonce);

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonce;
        });

        // Initialisation de filteredUtilitaires avec les Utilitaires récupérés
        this.fiteredUtilitaires = [...this.listeUtilitaires];
        console.log('fiteredUtilitaires: ', this.fiteredUtilitaires);
        // Mettre isLoading à false une fois les données chargées
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details blog
  redirectToDetails(utilitaireId: number) {
    this.utilitaireSelected = utilitaireId;
    console.log(this.utilitaireSelected);
    this.route.navigate([
      'vehicules/utilitaires/detailUtilitaire',
      utilitaireId,
    ]);
  }

  // Fonction pour filtrer les motos en fonction du terme de recherche

  filterUtilitaire(): void {
    // Si le terme de recherche est vide, afficher tous les blogs
    if (!this.searchTerm.trim()) {
      this.fiteredUtilitaires = [...this.listeUtilitaires];
    } else {
      // Sinon, filtrer les blogs dont le titre ou la description contient le terme de recherche
      this.fiteredUtilitaires = this.listeUtilitaires.filter(
        (utilitaire: any) =>
          utilitaire.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Fonction appelée à chaque changement dans le champ de recherche
  onSearchChange(): void {
    // Filtrer les blogs avec le nouveau terme de recherche
    this.filterUtilitaire();
  }
}
