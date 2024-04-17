import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.css'],
})
export class VendeursComponent {
  dtOptions: DataTables.Settings = {};
  proprietaires: any[] = [];
  proprietairesFiltres: any[] = [];
  recherche: string = '';
  isLoading: boolean = true;

  // Variable pour stocker le proprietaire sélectionné
  selectedProprietaire: any;
  proprietaireToEdit: any;

  constructor(
    private listeUsers: ListeUsersService,
    private route: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getproprietaires();

    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      pageLength: 5,
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
    };
  }

  getproprietaires(): void {
    this.listeUsers.getProprietaires().subscribe(
      (response: any) => {
        console.log(response.proprietaire); // Affiche le tableau des propriétaires dans la console

        // Maintenant, vous pouvez accéder à l'array proprietaire
        this.proprietaires = response.proprietaire;

        // Initialisation de vos données d'acheteurs après réception des données
        this.proprietairesFiltres = this.proprietaires;
        console.log('proprietaires filtrer', this.proprietairesFiltres);
        // Mettre isLoading à false une fois les données chargées
        this.isLoading = false;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des proprietaires : ",
          error
        );
      }
    );
  }

  // stocker le proprietaire sélectionné
  // Detail du blog
  openProprietaireDetails(proprietaire: any): void {
    // Stocke le proprietaire sélectionné
    this.selectedProprietaire = proprietaire;
    console.log(this.selectedProprietaire);
  }

  // Méthode pour préparer l'édition du blog sélectionné
  prepareEdit(proprietaire: any) {
    // Copier les données du blog sélectionné dans blogToEdit
    this.proprietaireToEdit = { ...proprietaire };
  }

  // Supprimer proprietaire
  supprimerProprietaire(proprietaireId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cet proprietaire ?',
      text: 'Vous allez supprimer cet proprietaire !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, supprimer"
        this.listeUsers.deleteUser(proprietaireId).subscribe(
          () => {
            console.log('Le proprietaire a été supprimé avec succès.');
            this.alertMessage(
              'success',
              'réussie',
              'proprietaire supprimé avec succès'
            );
            this.getproprietaires();
          },
          (error) => {
            console.error(
              "Une erreur s'est produite lors de la suppression cet proprietaire :",
              error
            );
            this.alertMessage(
              'error',
              'Oops',
              'Erreur lors de la suppression ce proprietaire'
            );
            // Gérer l'erreur de suppression ce proprietaire
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log('La suppression du proriétaire a été annulée.');
        this.alertMessage(
          'info',
          'Annulée',
          'Suppression du proriétaire annulée'
        );
      }
    });
  }

  // Alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 2000, // Durée en millisecondes avant la disparition
      timerProgressBar: true, // Barre de progression de la temporisation
      showConfirmButton: false, // Cacher le bouton de confirmation
    });
  }
}
