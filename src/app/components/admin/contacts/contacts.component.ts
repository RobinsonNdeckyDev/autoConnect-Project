import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeContactsService } from 'src/app/services/liste-contacts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  dtOptions: DataTables.Settings = {};
  messages: any[] = [];
  selectedMessage: any; // Pour stocker le message sélectionné
  isModalOpen: boolean = false; // Variable pour contrôler l'ouverture du modal
  isLoading: boolean = true;

  constructor(
    private listeContacts: ListeContactsService,
    private route: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getContacts();

    // dtoptions
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      pageLength: 6,
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

  // Liste des contacts
  getContacts(): void {
    this.listeContacts.getMessages().subscribe(
      (response: any) => {
        console.log(response.messages); // Affiche le tableau des categories dans la console

        // Maintenant, vous pouvez accéder à l'array categorie
        this.messages = response.messages;
        this.isLoading = false;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des categories : ",
          error
        );
      }
    );
  }

  // Supprimmer un abonné
  supprimerMessage(messageId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce contact?',
      text: 'Vous allez supprimer ce contact!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, supprimer"
        this.listeContacts.deleteMessage(messageId).subscribe(
          () => {
            console.log('le message a été supprimé avec succès.');
            // Réaliser d'autres actions après la suppression si nécessaire
            this.alertMessage(
              'success',
              'réussie',
              'Message supprimé avec succés'
            );

            this.getContacts();
          },
          (error) => {
            console.error(
              "Une erreur s'est produite lors de la suppression du message :",
              error
            );
            this.alertMessage(
              'error',
              'Oops',
              'Erreur lors de la suppression du message'
            );
            // Gérer l'erreur de suppression du message
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log('La suppression du contact a été annulée.');
        this.alertMessage('info', 'Annulée', 'Suppression du contact annulée');
      }
    });
  }

  // Méthode pour ouvrir le modal avec le message sélectionné
  openModal(message: any) {
    this.selectedMessage = message;
  }

  // Vider champ
  viderChamps() {
    // this.titre = '';
    // this.image = '';
    // this.description = '';
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
