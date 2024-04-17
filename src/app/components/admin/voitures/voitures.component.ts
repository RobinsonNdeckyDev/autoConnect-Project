import { Component } from '@angular/core';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { ListeVoituresService } from 'src/app/services/liste-voitures.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css'],
})
export class VoituresComponent {
  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";

  dtOptions: DataTables.Settings = {};

  annonces = true;
  listeVoitures: any[] = [];
  listeVoituresActives: any[] = [];
  annoncesVoituresFiltreesActives: any[] = [];
  annoncesVoituresFiltreesInactives: any[] = [];
  isLoading: boolean = true;

  // Variable pour stocker les proprietaires
  tabProprietaires: any[] = [];
  tabAcheteurs: any[] = [];
  tabCommentaires: any[] = [];
  tabCommentofAnnonce: any[] = [];
  infoProprietaire: any;

  // Variable pour stocker l'annonce sélectionné
  annonceSelectionnee: any;

  // Propriété pour stocker la valeur de recherche
  searchTermActive: string = '';
  searchTermInactive: string = '';

  constructor(
    public listeVoitureService: ListeVoituresService,
    private proprietaireService: ListeUsersService,
    private annonceServiceEtat: PublierAnnonceService,
    private commentaireService: CommentaireService
  ) {}

  afficherAnnonces() {
    this.annonces = !this.annonces;
  }

  ngOnInit(): void {
    // initialisation de la liste des anonces
    this.listesAnnonces();

    // initialisation de la liste des proprietaires
    this.listeAcheteurs();

    // Liste des commentaires
    this.listeCommentaires();

    // initialisation de la liste des proprietaires
    this.listeProprietaire();

    // testComment
    // this.testComment();

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

  // Avoir les commentaires sur une annonce
  getCommentOfAnnonce(annonceId: number): void {
    this.commentaireService.getCommentAnnnonceAdmin(annonceId).subscribe(
      (response) => {
        console.log("les commentaires sur l'annonce: ", response.commentaires);
        this.tabCommentofAnnonce = response.commentaires;
        console.log('tabCommentofAnnonce: ', this.tabCommentofAnnonce);

        // Pour chaque commentaire, trouvez l'emetteur
        this.tabCommentofAnnonce.forEach((commentaire: any) => {
          const prorietaireCommentaire = this.tabAcheteurs.find(
            (user: any) => user.id === commentaire.user_id
          );

          // Associez l'utilisateur et l'annonce
          commentaire.infosProprietaire = prorietaireCommentaire;
        });
      },
      (error) => {
        console.error("Une erreur s'est produite:", error);
        // this.alertMessage(
        //   'error',
        //   'Oops',
        //   'Erreur lors de la suppression ce proprietaire'
        // );
      }
    );
  }

  // Liste des voitures
  listesAnnonces(): void {
    // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    const categorieId = 1;
    const etatActive = 'accepter';
    const etatInactive = 'refuser';

    this.listeVoitureService.getAnnonces(categorieId).subscribe(
      (response: any) => {
        console.log(response.annonces);
        this.listeVoitures = response.annonces;

        this.annoncesVoituresFiltreesActives = this.listeVoitures.filter(
          (annonceVoiture) => annonceVoiture.etat === etatActive
        );
        console.log(
          'Annonces filtrées Actives : ',
          this.annoncesVoituresFiltreesActives
        );

        this.annoncesVoituresFiltreesInactives = this.listeVoitures.filter(
          (annonceVoiture) => annonceVoiture.etat === etatInactive
        );

        console.log(
          'Annonces filtrées Inactives : ',
          this.annoncesVoituresFiltreesInactives
        );
        this.isLoading = false;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des annonces : ",
          error
        );
      }
    );
  }

  // Détail d'une annonce

  // Méthode pour récupérer la liste des propriétaires
  listeProprietaire() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getProprietaires().subscribe((resp: any) => {
      this.tabProprietaires = resp.proprietaire;
    });
  }

  // Méthode pour récupérer la liste des acheteurs
  listeAcheteurs() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getAcheteurs().subscribe((resp: any) => {
      this.tabAcheteurs = resp.acheteur;
      console.log('tabAcheteurs: ', this.tabAcheteurs);
    });
  }

  // Méthode pour récupérer la liste des commentaires
  listeCommentaires() {
    // on recupere la liste des commentaires
    this.commentaireService.getcommentaires().subscribe((resp: any) => {
      console.log(resp.commentaires);
      this.tabCommentaires = resp.commentaires;
      console.log('tabCommentaires: ', this.tabCommentaires);
    });
  }

  // Méthode pour afficher les details d'une annonce
  afficherDetailAnnonce(voiture: any) {
    this.annonceSelectionnee = voiture;
    console.log(this.annonceSelectionnee);

    // On récupère le propriètaire de l'annonce
    console.log(this.annonceSelectionnee.user_id);

    this.propInfo();
  }

  // Informations du proprietaire
  propInfo() {
    // / On recherche le propriétaire qui a les infos de user_id
    this.infoProprietaire = this.tabProprietaires.find(
      (user: any) => user.id === this.annonceSelectionnee.user_id
    );
    console.log(
      'Informations du proprietaire à qui appartient cette annonce ',
      this.infoProprietaire
    );
    console.log(this.infoProprietaire);
  }

  idUserwhatsap: any;
  telUserWhatsapp: any;

  // Mise à jour de l'etat de l'annonce

  updateAnnonceStateActive(newState: string): void {
    // l'identifiant de l'annonce est stocké dans la propriété 'id'
    const annonceId = this.annonceSelectionnee.id;
    console.log('annonceId: ', annonceId);

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir activer cette annonce ?',
      text: 'Vous allez activer cette annonce !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, activer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, activer"
        this.annonceServiceEtat
          .updateAnnonceState(annonceId, newState)
          .subscribe(() => {
            // Mettre à jour l'état de l'annonce après avoir reçu la réponse du serveur
            this.annonceSelectionnee.etat = newState;
            this.alertMessage(
              'success',
              'Super',
              'Annonce activée avec succés'
            );
            this.listesAnnonces();
            this.listesAnnonces();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("L'activation de l'annonce a été annulée.");
        this.alertMessage('info', 'Annulée', "Activation de l'annonce annulée");
      }
    });
  }

  // Mise à jour de l'eta de l'annonce
  updateAnnonceStateInactive(newState: string): void {
    // l'identifiant de l'annonce est stocké dans la propriété 'id'
    const annonceId = this.annonceSelectionnee.id;

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir désactiver cette annonce ?',
      text: 'Vous allez désactiver cette annonce !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, désactiver',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, d"sactiver"
        this.annonceServiceEtat
          .updateAnnonceState(annonceId, newState)
          .subscribe(() => {
            // Mettre à jour l'état de l'annonce après avoir reçu la réponse du serveur
            this.annonceSelectionnee.etat = newState;
            this.alertMessage(
              'success',
              'Super',
              'Annonce désactivée avec succés'
            );
            this.listesAnnonces();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("La désactivation de l'annonce a été annulée.");
        this.alertMessage(
          'info',
          'Annulée',
          "Désctivation de l'annonce annulée"
        );
      }
    });
  }

  // supprimer Annonce
  detetedAnnonce(annonceId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette annonce ?',
      text: 'Vous allez supprimer cette annonce !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, d"sactiver"
        this.listeVoitureService.deleteAnnonce(annonceId).subscribe(
          (response) => {
            console.log(response);
            this.alertMessage(
              'success',
              'Super',
              'Annonce supprimée avec succés'
            );
            this.listesAnnonces();
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("La suppression de l'annonce a été annulée.");
        this.alertMessage(
          'info',
          'Annulée',
          "Suppression de l'annonce annulée"
        );
      }
    });
  }

  // Fonction pour filtrer les voitures actives en fonction du terme de recherche
  filterCarsActive(): void {
    // Si le terme de recherche est vide, afficher toutes les voitures
    if (!this.searchTermActive.trim()) {
      this.annoncesVoituresFiltreesActives = this.listeVoitures.filter(
        (annonceVoiture) => annonceVoiture.etat === 'accepter'
      );
    } else {
      // Sinon, filtrer les voitures dont le nom contient le terme de recherche
      this.annoncesVoituresFiltreesActives = this.listeVoitures.filter(
        (annonceVoiture) =>
          annonceVoiture.etat === 'accepter' &&
          annonceVoiture.nom
            .toLowerCase()
            .includes(this.searchTermActive.toLowerCase())
      );
    }
  }

  // Fonction appelée à chaque changement dans le champ de recherche
  onSearchChangeActive(): void {
    // Filtrer les voitures avec le nouveau terme de recherche
    this.filterCarsActive();
  }

  // Fonction pour filtrer les voitures inactives en fonction du terme de recherche
  filterCarsInactive(): void {
    // Si le terme de recherche est vide, afficher toutes les voitures
    if (!this.searchTermInactive.trim()) {
      this.annoncesVoituresFiltreesInactives = this.listeVoitures.filter(
        (annonceVoiture) => annonceVoiture.etat === 'refuser'
      );
    } else {
      // Sinon, filtrer les voitures dont le nom contient le terme de recherche
      this.annoncesVoituresFiltreesInactives = this.listeVoitures.filter(
        (annonceVoiture) =>
          annonceVoiture.etat === 'refuser' &&
          annonceVoiture.nom
            .toLowerCase()
            .includes(this.searchTermInactive.toLowerCase())
      );
    }
  }

  // Fonction appelée à chaque changement dans le champ de recherche
  onSearchChangeInactive(): void {
    // Filtrer les voitures avec le nouveau terme de recherche
    this.filterCarsInactive();
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

  // supprimer Commentaire
  detetedCommentaire(comentaireId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce commentaire ?',
      text: 'Vous allez supprimer ce commentaire !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, d"sactiver"
        this.commentaireService
          .deleteCommentAnnonceAdmin(comentaireId)
          .subscribe(
            (response) => {
              console.log(response);
              this.alertMessage(
                'success',
                'Supprimé',
                'commentaire supprimé avec succés'
              );
              this.listesAnnonces();
            },
            (error) => {
              console.log(error);
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log('La suppression du commentaire a été annulé.');
        this.alertMessage(
          'info',
          'Annulé',
          'Suppression du commentaire annulé'
        );
      }
    });
  }
}
