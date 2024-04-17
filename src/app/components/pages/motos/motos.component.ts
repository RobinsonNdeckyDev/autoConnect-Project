import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeMotosService } from 'src/app/services/liste-motos.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  styleUrls: ['./motos.component.css'],
})
export class MotosComponent {

  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";
  
  listeMotos: any;
  tabProprietaires: any;
  ListeAnnonces: any;
  motoSelected: any;
  proprietaireInfo: any;
  searchTerm: string = '';
  fiteredMotos: any[] = [];
  isLoading: boolean = true;

  constructor(
    private listeMotoService: ListeMotosService,
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
    let categorie = 2;

    this.listeAnnonceService.getAnnonceValideProp().subscribe(
      (response: any) => {
        console.log(response);
        // liste motos
        this.ListeAnnonces = response.annonces;
        console.log('annonces: ', this.ListeAnnonces);

        this.listeMotos = this.ListeAnnonces.filter(
          (element: any) => element.categorie_id === categorie
        );
        console.log('Liste motos', this.listeMotos);

        // Pour chaque annonce, trouvez l'utilisateur concernée
        this.listeMotos.forEach((annonce: any) => {
          const prorietaireAnnonce = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );
          console.log('prorietaireAnnonce: ', prorietaireAnnonce);

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonce;
        });

        // Initialisation de filteredMotos avec les Motos récupérés
        this.fiteredMotos = [...this.listeMotos];
        console.log('filteredMotos: ', this.fiteredMotos);
        // Mettre isLoading à false une fois les données chargées
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details blog
  redirectToDetails(motoId: number) {
    this.motoSelected = motoId;
    console.log(this.motoSelected);
    this.route.navigate(['vehicules/motos/detailMoto', motoId]);
  }

  // Fonction pour filtrer les motos en fonction du terme de recherche

  filterMotos(): void {
    // Si le terme de recherche est vide, afficher tous les blogs
    if (!this.searchTerm.trim()) {
      this.fiteredMotos = [...this.listeMotos];
    } else {
      // Sinon, filtrer les blogs dont le titre ou la description contient le terme de recherche
      this.fiteredMotos = this.listeMotos.filter((moto: any) =>
        moto.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Fonction appelée à chaque changement dans le champ de recherche
  onSearchChange(): void {
    // Filtrer les blogs avec le nouveau terme de recherche
    this.filterMotos();
  }
}
