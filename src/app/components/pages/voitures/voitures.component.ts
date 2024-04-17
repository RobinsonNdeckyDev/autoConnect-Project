import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { ListeVoituresService } from 'src/app/services/liste-voitures.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css'],
})
export class VoituresComponent {

  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";
  
  listeVoitures: any;
  ListeAnnonces: any[] = [];
  voitureId?: number;
  voitureDetails: any;
  tabProprietaires: any[] = [];
  proprietaireInfo: any;
  voitureSelected: any;
  filteredVoitures: any[] = [];
  // Propriété pour stocker la valeur de recherche
  searchTerm: string = '';
  listeVoituresSearch: any;
  isLoading: boolean = true;

  constructor(
    private listeVoitureService: ListeVoituresService,
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
    let categorie = 1;

    this.listeAnnonceService.getAnnonceValideProp().subscribe(
      (response: any) => {
        console.log(response);
        // liste voitures
        this.ListeAnnonces = response.annonces;
        console.log('voitures: ', this.ListeAnnonces);

        this.listeVoitures = this.ListeAnnonces.filter(
          (element: any) => element.categorie_id === categorie
        );
        console.log('listeVoitures filtrées: ', this.listeVoitures);

        // Pour chaque annonce, trouvez l'utilisateur concernée
        this.listeVoitures.forEach((annonce: any) => {
          const prorietaireAnnonce = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );
          console.log('prorietaireAnnonce: ', prorietaireAnnonce);

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonce;
        });

        // Initialisation de filteredVoitures avec les signalements récupérés
        this.filteredVoitures = [...this.listeVoitures];
        console.log('filteredVoitures: ', this.filteredVoitures);
        // Mettre isLoading à false une fois les données chargées
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details blog
  redirectToDetails(voitureId: number) {
    this.voitureSelected = voitureId;
    console.log(this.voitureSelected);
    this.route.navigate(['vehicules/voitures/detailVoiture', voitureId]);
  }

  // Fonction pour filtrer les motos en fonction du terme de recherche

  filterVoiture(): void {
    // Si le terme de recherche est vide, afficher tous les blogs
    if (!this.searchTerm.trim()) {
      this.filteredVoitures = [...this.listeVoitures];
    } else {
      // Sinon, filtrer les blogs dont le titre ou la description contient le terme de recherche
      this.filteredVoitures = this.listeVoitures.filter((annonce: any) =>
        annonce.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Fonction appelée à chaque changement dans le champ de recherche
  onSearchChange(): void {
    // Filtrer les blogs avec le nouveau terme de recherche
    this.filterVoiture();
  }
}
