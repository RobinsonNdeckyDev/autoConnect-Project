import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { ListeCategoriesService } from 'src/app/services/liste-categories.service';
import { ListeMotosService } from 'src/app/services/liste-motos.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  styleUrls: ['./motos.component.css'],
})
export class MotosComponent {
  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";
  
  annonces = true;
  annoncesMotosFiltreesActives: any[] = [];
  annoncesMotosFiltreesInactives: any[] = [];

  listeMotos: any[] = [];
  tabCommentaires: any[] = [];
  tabAcheteurs: any[] = [];
  tabCommentofAnnonce: any[] = [];
  listeMotosActives: any[] = [];
  annoncesMotosFiltrees: any[] = [];
  categories: any[] = [];

  // Variable pour stocker l'annonce sélectionné
  annonceSelectionnee: any;

  // Propriété pour stocker la valeur de recherche
  searchTermActive: string = '';
  searchTermInactive: string = '';
  isLoading: boolean = true;

  constructor(
    public listeMotoService: ListeMotosService,
    private proprietaireService: ListeUsersService,
    private annonceServiceEtat: PublierAnnonceService,
    private listeCategories: ListeCategoriesService,
    private commentaireService: CommentaireService,
    private http: HttpClient
  ) {}

  afficherAnnonces() {
    this.annonces = !this.annonces;
  }

  ngOnInit(): void {
    this.listesAnnonces();

    // initialisation de la liste des proprietaires
    this.listeProprietaire();

    // initialisation de la liste des proprietaires
    this.listeAcheteurs();

    // Liste des commentaires
    this.listeCommentaires();

    this.getCategories();
  }

  // Liste Categories
  getCategories(): void {
    this.listeCategories.getCategories().subscribe(
      (response: any) => {
        // Affiche le tableau des categories dans la console
        console.log(response.categories);

        // accéder à l'array categorie
        this.categories = response.categories;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des categories : ",
          error
        );
      }
    );
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

  // Liste des voitures
  listesAnnonces(): void {
    // Remplacez par l'ID de la catégorie POUR récupérer les annonces
    let categorieId = 2;
    // console.log(typeof(categorieId));
    const etatActive = 'accepter';
    const etatInactive = 'refuser';

    this.listeMotoService.getAnnonces(categorieId).subscribe(
      (response: any) => {
        console.log('annonces motos:', response.annonces);
        this.listeMotos = response.annonces;
        console.log('listeMotos:', this.listeMotos);

        this.annoncesMotosFiltreesInactives = this.listeMotos.filter(
          (annonceMoto) => annonceMoto.etat == etatInactive
        );
        console.log(
          'Annonces filtrées motos Inactives : ',
          this.annoncesMotosFiltreesInactives
        );

        this.annoncesMotosFiltreesActives = this.listeMotos.filter(
          (annonceMoto) => annonceMoto.etat === etatActive
        );

        console.log(
          'Annonces filtrées motos Inactives : ',
          this.annoncesMotosFiltreesActives
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
      this.tabUsers = resp.proprietaire;
    });
  }

  // Variable pour stocker les utilisateurs
  tabUsers: any[] = [];
  infoProprietaire: any;

  // Méthode pour afficher les details d'une annonce
  afficherDetailAnnonce(moto: any) {
    this.annonceSelectionnee = moto;
    console.log(this.annonceSelectionnee);

    // On récupère le propriètaire de l'annonce
    console.log(this.annonceSelectionnee.user_id);

    // On recherche le propriétaire qui a les infos de user_id
    this.infoProprietaire = this.tabUsers.find(
      (user: any) => user.id === this.annonceSelectionnee.user_id
    );
    console.log(
      'Informations du proprietaire à qui appartient cette annonce ',
      this.infoProprietaire
    );
    console.log(this.infoProprietaire.nom);
  }

  idUserwhatsap: any;
  telUserWhatsapp: any;

  // Mise à jour de l'etat de l'annonce

  updateAnnonceStateInactive(newState: string): void {
    // Supposons que l'identifiant de l'annonce est stocké dans la propriété 'id'
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
            // Mettre à jour l'état de l'annonce dans votre frontend après avoir reçu la réponse du serveur
            this.annonceSelectionnee.etat = newState;
            this.alertMessage(
              'success',
              'Désactivée',
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

  // Mise à jour de l'etat de l'annonce

  updateAnnonceStateActive(newState: string): void {
    // l'identifiant de l'annonce est stocké dans la propriété 'id'
    const annonceId = this.annonceSelectionnee.id;

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
            this.listesAnnonces();
            this.alertMessage(
              'success',
              'Activée',
              'Annonce activée avec succés'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("L'activation de l'annonce a été annulée.");
        this.alertMessage('info', 'Annulée', "Activation de l'annonce annulée");
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
        this.listeMotoService.deleteAnnonce(annonceId).subscribe(
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

  // Fonction pour filtrer les motos actives en fonction du terme de recherche
  filterCarsActive(): void {
    // Si le terme de recherche est vide, afficher toutes les motos
    if (!this.searchTermActive.trim()) {
      this.annoncesMotosFiltreesActives = this.listeMotos.filter(
        (annonceVoiture) => annonceVoiture.etat === 'accepter'
      );
    } else {
      // Sinon, filtrer les motos dont le nom contient le terme de recherche
      this.annoncesMotosFiltreesActives = this.listeMotos.filter(
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
    // Filtrer les motos avec le nouveau terme de recherche
    this.filterCarsActive();
  }

  // Fonction pour filtrer les motos inactives en fonction du terme de recherche
  filterCarsInactive(): void {
    // Si le terme de recherche est vide, afficher toutes les voitures
    if (!this.searchTermInactive.trim()) {
      this.annoncesMotosFiltreesInactives = this.listeMotos.filter(
        (annonceVoiture) => annonceVoiture.etat === 'refuser'
      );
    } else {
      // Sinon, filtrer les voitures dont le nom contient le terme de recherche
      this.annoncesMotosFiltreesInactives = this.listeMotos.filter(
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
}
