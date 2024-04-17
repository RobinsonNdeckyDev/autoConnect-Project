import { Component } from '@angular/core';
import { ListeNewslettersService } from 'src/app/services/liste-newsletters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css'],
})
export class NewslettersComponent {
  dtOptions: DataTables.Settings = {};
  newsletters: any[] = [];
  isLoading: boolean = true;

  constructor(private listeNews: ListeNewslettersService) {}

  ngOnInit(): void {
    this.getNewsletters();

    // dtOptions
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

  // Liste des Blogs
  getNewsletters(): void {
    this.listeNews.getNewsletters().subscribe(
      (response: any) => {
        console.log(response.newsLetters); // Affiche le tableau des newsletters dans la console

        // Maintenant, vous pouvez accéder à l'array categorie
        this.newsletters = response.newsLetters;
        console.log(this.newsletters);
        this.isLoading = false;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des newsletters : ",
          error
        );
      }
    );
  }

  // Supprimmer un abonné
  subscriberDelete(newsId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cet abonné ?',
      text: 'Vous allez supprimer cet abonné !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, supprimer"
        this.listeNews.deleteNewsletter(newsId).subscribe(
          () => {
            console.log("L'abonné a été supprimé avec succès.");
            // Réaliser d'autres actions après la suppression si nécessaire
            this.alertMessage(
              'success',
              'réussie',
              'Abonné supprimé avec succés'
            );

            this.getNewsletters();
          },
          (error) => {
            console.error(
              "Une erreur s'est produite lors de la suppression de l'abonné :",
              error
            );
            this.alertMessage(
              'error',
              'Oops',
              "Erreur lors de la suppression de l'abonné"
            );
            // Gérer l'erreur de suppression de l'abonné
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("La suppression de l'abonné a été annulée.");
        this.alertMessage('info', 'Annulée', "Suppression de l'abonné annulée");
      }
    });
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
