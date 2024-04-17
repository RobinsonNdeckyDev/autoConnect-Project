import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acheteurs',
  templateUrl: './acheteurs.component.html',
  styleUrls: ['./acheteurs.component.css'],
})
export class AcheteursComponent {
  dtOptions: DataTables.Settings = {};
  acheteurs: any[] = [];
  filteredAcheteurs: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  // Variable pour stocker le acheteur sélectionné
  selectedAcheteur: any;
  acheteurToEdit: any;

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private listeUsers: ListeUsersService,
    private route: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAcheteurs();

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

  getAcheteurs(): void {
    this.listeUsers.getAcheteurs().subscribe(
      (response: any) => {
        console.log(response.acheteur); // Affiche le tableau des propriétaires dans la console

        // Maintenant, vous pouvez accéder à l'array acheteur
        this.acheteurs = response.acheteur;

        // Initialisation de vos données d'acheteurs après réception des données
        this.filteredAcheteurs = this.acheteurs;
        console.log('acheteurs filtrer', this.filteredAcheteurs);
        this.isLoading = false;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des acheteurs : ",
          error
        );
      }
    );
  }

  // stoker le acheteur sélectionné
  // Detail du blog
  openAcheteurDetails(acheteur: any): void {
    // Stocke le acheteur sélectionné
    this.selectedAcheteur = acheteur;
    console.log(this.selectedAcheteur);
  }

  // Méthode pour préparer l'édition du blog sélectionné
  prepareEdit(acheteur: any) {
    // Copier les données du blog sélectionné dans blogToEdit
    this.acheteurToEdit = { ...acheteur };
  }

  // Supprimer acheteur
  supprimerAcheteur(acheteurId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cet acheteur ?',
      text: 'Vous allez supprimer cet acheteur !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, supprimer"
        this.listeUsers.deleteUser(acheteurId).subscribe(
          () => {
            console.log('Acheteur supprimé avec succès.');
            this.alertMessage(
              'success',
              'réussie',
              'acheteur supprimé avec succès'
            );
            this.getAcheteurs();
          },
          (error) => {
            console.error(
              "Une erreur s'est produite lors de la suppression de l'acheteur :",
              error
            );
            this.alertMessage(
              'error',
              'Oops',
              'Erreur lors de la suppression cet acheteur'
            );
            // Gérer l'erreur de suppression ce acheteur
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("La suppression de l'acheteur a été annulée.");
        this.alertMessage(
          'info',
          'Annulée',
          "Suppression de l'acheteur annulée"
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
