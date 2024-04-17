import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import { SignalementService } from 'src/app/services/signalement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signalements',
  templateUrl: './signalements.component.html',
  styleUrls: ['./signalements.component.css'],
})
export class SignalementsComponent {
  dtOptions: DataTables.Settings = {};

  constructor(
    private http: HttpClient,
    private listeSignalService: SignalementService,
    private listeAcheteurService: ListeUsersService,
    private annoncesValideService: PublierAnnonceService
  ) {}

  tabSignalements: any[] = [];
  tabAnnoncesValides: any[] = [];
  tabAnnoncesSignalees: any[] = [];
  tabAcheteurs: any[] = [];
  filteredSignalements: any[] = [];
  annonceAcheteurSignal: any;
  infoUserSignal: any;
  infoAnnonceSignal: any;
  annonceUserSignal: any;
  isLoading: boolean = true;

  // Annonce sélectionnée
  annonceSelected: any;
  // Propriété pour stocker la valeur de recherche
  searchTerm: string = '';

  ngOnInit(): void {
    // Annonces valides
    this.getAnnoncesValides();

    // Liste acheteurs
    this.getAcheteurs();

    // liste signalements
    this.getSignals();

    // dtOptions
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

  // get annonces
  getAnnoncesValides() {
    this.annoncesValideService.getAnnonceValideProp().subscribe(
      (response: any) => {
        console.log('annoncesValides', response);
        this.tabAnnoncesValides = response.annonces;
        console.log('TabAnnoncesValides', this.tabAnnoncesValides);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  // Get signals
  getSignals() {
    // test TabAnnonces Valides
    console.log('tabAnnoncesValides: ', this.tabAnnoncesValides);

    // Exécution
    this.listeSignalService.listeSignals().subscribe(
      (response: any) => {
        console.log('listeSignalements: ', response);
        this.tabSignalements = response.signalements;
        console.log('TabSignalements: ', this.tabSignalements);

        // Pour chaque signalement, trouvez l'utilisateur et l'annonce concernée
        this.tabSignalements.forEach((signalement) => {
          const acheteurSignal = this.tabAcheteurs.find(
            (user) => user.id === signalement.user_id
          );
          console.log('AcheteurSignal: ', acheteurSignal);

          const annonceSignal = this.tabAnnoncesValides.find(
            (annonce) => annonce.id === signalement.annonce_id
          );
          console.log('annonceSignal: ', annonceSignal);

          // Associez l'utilisateur et l'annonce au signalement
          signalement.infoUserSignal = acheteurSignal;
          signalement.infoAnnonceSignal = annonceSignal;
        });

        // Vérifiez les signalements après traitement
        console.log('TabSignalements après traitement: ', this.tabSignalements);
        // Initialisation de filteredSignalements avec les signalements récupérés
        this.filteredSignalements = [...this.tabSignalements];
        console.log('filteredSignalements: ', this.filteredSignalements);
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Get acheteurs
  getAcheteurs() {
    this.listeAcheteurService.getAcheteurs().subscribe(
      (response: any) => {
        console.log('listeAcheteurs: ', response);
        this.tabAcheteurs = response.acheteur;
        console.log('listeAcheteurs: ', this.tabAcheteurs);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Méthode pour afficher les details d'une annonce
  afficherDetailAnnonce(signal: any) {
    this.annonceSelected = signal;
    console.log(this.annonceSelected);
  }

  // Méthode supprimer un signalement
  deleteSignalement(signalId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce signalement ?',
      text: 'Vous allez supprimer ce signalement !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, supprimer"
        // Appeler la méthode de votre service pour supprimer une categorie
        this.annoncesValideService.supprimerAnnonceSignale(signalId).subscribe(
          (response) => {
            console.log(response);
            console.log('Signalement supprimé avec succès.');
            this.alertMessage(
              'success',
              'Cool',
              'Signalement supprimé avec succès.'
            );

            this.getSignals();
          },
          (error) => {
            console.error(
              "Une erreur s'est produite lors de la suppression du signalement: ",
              error
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log('La suppression du signalement a été annulé.');
        this.alertMessage(
          'info',
          'Annulée',
          'Suppression du signalement annulé'
        );
      }
    });
  }

  // Fonction pour filtrer les signalements en fonction du terme de recherche

  filterSignals(): void {
    // Si le terme de recherche est vide, réinitialisez filteredSignalements pour afficher tous les signalements
    if (!this.searchTerm.trim()) {
      this.filteredSignalements = [...this.tabSignalements];
    } else {
      // Filtrer les signalements dont le nom de l'annonce contient le terme de recherche
      this.filteredSignalements = this.tabSignalements.filter(
        (signal) =>
          signal.infoAnnonceSignal &&
          signal.infoAnnonceSignal.nom
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Fonction appelée à chaque changement dans le champ de recherche
  onSearchChange(): void {
    // Filtrer les signalements avec le nouveau terme de recherche
    this.filterSignals();
  }

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
