import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { error } from 'jquery';
import { ListeMotosService } from 'src/app/services/liste-motos.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { ListeUtilitairesService } from 'src/app/services/liste-utilitaires.service';
import { ListeVoituresService } from 'src/app/services/liste-voitures.service';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css'],
})
export class AccueilAdminComponent {
  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";

  dtOptions: DataTables.Settings = {};

  public chart: any;
  proprietaires: any;
  proprietairesFiltres: any;

  // Motos
  listeDesMotos: any[] = [];
  listeMotosFiltree: any[] = [];
  nbreMotos: number = 0;
  // Motos

  // Voitures
  listeDesVoitures: any[] = [];
  listeVoituresFiltree: any[] = [];
  nbreVoitures: number = 0;
  // Voitures

  // Utilitaires
  listeDesUtilitaires: any[] = [];
  listeUtilitairesFiltree: any[] = [];
  nbreUtilitaires: number = 0;
  // Utilitaires

  constructor(
    private listeUsers: ListeUsersService,
    private listeMotos: ListeMotosService,
    private listeVoitures: ListeVoituresService,
    private listeUtilitaires: ListeUtilitairesService
  ) {}

  ngOnInit(): void {
    // charts
    this.createChart();

    // liste des proprietaires
    this.getproprietaires();

    // Liste Motos
    this.getMotos();

    // Liste Motos
    this.getVoitures();

    // Liste Utilitaires
    this.getUtilitaires();

    // dtoptions
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      pageLength: 2,
      pagingType: 'simple_numbers',
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',

        paginate: {
          first: '<<', // Personnalise le texte de la flèche pour la première page
          previous: '<', // Personnalise le texte de la flèche pour la page précédente
          next: '>', // Personnalise le texte de la flèche pour la page suivante
          last: '>>', // Personnalise le texte de la flèche pour la dernière page
        },
      },

      // drawCallback: function () {
      //   $('.dataTables_wrapper table').addClass('table-bordered'); // Ajoute une classe pour les bordures horizontales
      // },
    };
  }

  // Liste des proprietaires
  getproprietaires(): void {
    this.listeUsers.getProprietaires().subscribe(
      (response: any) => {
        console.log(response.proprietaire); // Affiche le tableau des propriétaires dans la console

        // Maintenant, vous pouvez accéder à l'array proprietaire
        this.proprietaires = response.proprietaire;

        // Initialisation de vos données d'acheteurs après réception des données
        this.proprietairesFiltres = this.proprietaires;
        console.log('proprietaires filtrer', this.proprietairesFiltres);
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des proprietaires : ",
          error
        );
      }
    );
  }

  // chart circulaire
  createChart() {
    this.chart = new Chart('MonChart', {
      type: 'doughnut',

      data: {
        labels: ['Propriétaires', 'Annonces'],
        datasets: [
          {
            data: [467, 576],
            backgroundColor: ['black', '#0F42A8'],
          },
        ],
      },
      options: {
        aspectRatio: 2, // Ajuste la hauteur du graphique
        cutout: '70%', // Ajuste la taille du trou au milieu du donut
        plugins: {
          legend: {
            display: true,
            position: 'bottom', // Place la légende en bas
          },
        },
      },
    });
  }

  // liste annonces motos
  getMotos() {
    // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    const categorieId = 2;
    const etat = 'accepter';

    this.listeMotos.getAnnonces(categorieId).subscribe(
      (response: any) => {
        console.log(response);
        this.listeDesMotos = response.annonces;
        console.log(this.listeDesMotos);

        this.listeMotosFiltree = this.listeDesMotos.filter(
          (annonceMoto: any) => annonceMoto.etat === 'accepter'
        );

        console.log(this.listeMotosFiltree);
        console.log(this.listeMotosFiltree.length);

        this.nbreMotos = this.listeMotosFiltree.length;
        console.log('nbre de motos ', this.nbreMotos);
      },
      (error) => {
        console.log('Oops erreur lors de la récupération des motos');
      }
    );
  }

  // liste annonces Voitures
  getVoitures() {
    // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    const categorieId = 1;
    const etat = 'accepter';

    this.listeVoitures.getAnnonces(categorieId).subscribe(
      (response: any) => {
        console.log(response);
        this.listeDesVoitures = response.annonces;

        this.listeVoituresFiltree = this.listeDesVoitures.filter(
          (annonceMoto: any) => annonceMoto.etat === 'accepter'
        );

        console.log(this.listeVoituresFiltree);
        console.log(this.listeVoituresFiltree.length);

        this.nbreVoitures = this.listeVoituresFiltree.length;
        console.log('nbre de voitures ', this.nbreVoitures);
      },
      (error) => {
        console.log('Oops erreur lors de la récupération des voitures');
      }
    );
  }

  // liste annonces Voitures
  getUtilitaires() {
    // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    const categorieId = 3;
    const etat = 'accepter';

    this.listeUtilitaires.getAnnonces(categorieId).subscribe(
      (response: any) => {
        console.log(response);
        this.listeDesUtilitaires = response.annonces;

        this.listeUtilitairesFiltree = this.listeDesUtilitaires.filter(
          (annonceMoto: any) => annonceMoto.etat === 'accepter'
        );

        console.log(this.listeUtilitairesFiltree);
        console.log(this.listeUtilitairesFiltree.length);

        this.nbreUtilitaires = this.listeUtilitairesFiltree.length;
        console.log('nbre de Utilitaires ', this.nbreUtilitaires);
      },
      (error) => {
        console.log('Oops erreur lors de la récupération des Utilitaires');
      }
    );
  }
}
