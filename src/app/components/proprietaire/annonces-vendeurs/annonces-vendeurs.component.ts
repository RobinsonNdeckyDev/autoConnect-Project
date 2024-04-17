import { getLocaleCurrencyCode } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'jquery';
import { ListeCategoriesService } from 'src/app/services/liste-categories.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';
import { CommentaireService } from 'src/app/services/commentaire.service';

@Component({
  selector: 'app-annonces-vendeurs',
  templateUrl: './annonces-vendeurs.component.html',
  styleUrls: ['./annonces-vendeurs.component.css'],
})
export class AnnoncesVendeursComponent {
  annonces = true;
  validesAnnonces: any[] = [];
  invalidesAnnonces: any[] = [];
  tabAcheteurs: any[] = [];
  tabCommentofAnnonce: any[] = [];
  tabCommentaires: any[] = [];
  tabUsers: any[] = [];
  filteredAnnoncesValides: any[] = [];
  filteredAnnoncesInvalides: any[] = [];
  isLoading: boolean = true;
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";


  // Variable pour stocker l'annonce sélectionné
  annonceSelectionnee: any;
  // variable pour stocker les infos du proprietaire
  infoProprietaire: any;
  // Infos annonce sélectionnée
  infoAnnonceSelected: any;
  // Variable pour stocker les infos de l'utilisateur connecté à partir du localstorage
  currentUser: any;

  // Attributs pour modifier une annonce
  nom: string = '';
  marque: string = '';
  couleur: string = '';
  etat: string = 'refuser';
  image!: File;
  prix!: number;
  description = '';
  climatisation: string = '';
  kilometrage: string = '';
  nbrePlace: string = '';
  localisation: string = '';
  moteur: string = '';
  annee: string = '';
  carburant: string = '';
  carosserie: string = '';
  categorie_id: number = 0;
  image1!: File;
  image2!: File;
  image3!: File;
  image4!: File;

  // searchTerms
  searchTermValide: any;
  searchTermInvalide: any;

  //Liste des années de 2000 à 2024
  years: number[] = Array.from({ length: 25 }, (_, index) => 2000 + index);

  // Liste des categories
  Categories: any[] = [];

  // Conrecteur

  constructor(
    private route: ActivatedRoute,
    private annoncesValidesProps: PublierAnnonceService,
    private updateAnnonceService: PublierAnnonceService,
    private acheteurService: ListeUsersService,
    private proprietaireService: ListeUsersService,
    private listeCategories: ListeCategoriesService,
    private commentaireService: CommentaireService
  ) {}

  afficherAnnonces() {
    this.annonces = !this.annonces;
  }

  ngOnInit() {
    // annonces valides
    this.listeAcheteurs();
    this.getCategories();
    this.annoncesValides();
    this.annoncesInvalides();
    this.getInfoCurrentUser();
    this.listeProprietaire();
    // Liste des commentaires
    this.listeCommentaires();
  }

  // methode pour les infos du user connecté
  getInfoCurrentUser() {
    let info: any = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(info);
    console.log('info currentUser: ', this.currentUser);
  }

  // Méthode pour récupérer la liste des acheteurs
  listeAcheteurs() {
    // on recupere la liste des utilisateurs
    this.acheteurService.getAcheteurs().subscribe((resp: any) => {
      console.log('response acheteur: ', resp);
      this.tabAcheteurs = resp.acheteur;
      console.log('tabAcheteurs: ', this.tabAcheteurs);
    });
  }

  // Méthode pour récupérer la liste des commentaires
  listeCommentaires() {
    // on recupere la liste des commentaires
    this.commentaireService.getcommentaires().subscribe(
      (resp: any) => {
        console.log(resp.commentaires);
        this.tabCommentaires = resp.commentaires;
        console.log('tabCommentaires: ', this.tabCommentaires);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Avoir les commentaires sur une annonce
  getCommentOfAnnonce(annonceId: number): void {
    this.commentaireService.getCommentAnnnonceProprietaire(annonceId).subscribe(
      (response) => {
        console.log(response);
        console.log("les commentaires sur l'annonce: ", response.commentaires);
        this.tabCommentofAnnonce = response.commentaires;
        console.log('tabCommentofAnnonce', this.tabCommentofAnnonce);
        console.log('tabAcheteurs: ', this.tabAcheteurs);

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

  // Annonces valides
  annoncesValides() {
    this.annoncesValidesProps.getAnnonceUserValide().subscribe(
      (response: any) => {
        console.log(response.annonces);
        this.validesAnnonces = response.annonces;
        console.log('Annonce valides: ', this.validesAnnonces);
        // Initialisation de annoncesValides
        this.filteredAnnoncesValides = [...this.validesAnnonces];
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Fonction pour filtrer les annonces invalides en fonction du terme de recherche
  filterAnnoncesValides(): void {
    // Si le terme de recherche est vide, afficher tous les blogs
    if (!this.searchTermValide.trim()) {
      this.filteredAnnoncesValides = [...this.validesAnnonces];
    } else {
      // Sinon, filtrer les annonces dont le nom contient le terme de recherche
      this.filteredAnnoncesValides = this.validesAnnonces.filter((annonce) =>
        annonce.nom.toLowerCase().includes(this.searchTermValide.toLowerCase())
      );
    }
  }

  // Fonction appelée à chaque changement dans le champ de recherche
  onSearchChangeValide(): void {
    // Filtrer les annonces valides avec le nouveau terme de recherche
    this.filterAnnoncesValides();
  }

  // Annonce invalides
  annoncesInvalides() {
    this.annoncesValidesProps.getAnnonceUserInvalide().subscribe(
      (response: any) => {
        console.log(response.annonces);
        this.invalidesAnnonces = response.annonces;
        console.log('Annonces invalides: ', this.invalidesAnnonces);
        // Initialisation de filteredAnnoncesInvalides
        this.filteredAnnoncesInvalides = [...this.invalidesAnnonces];
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Fonction pour filtrer les annonces invalides en fonction du terme de recherche
  filterAnnoncesInvalides(): void {
    // Si le terme de recherche est vide, afficher tous les annonces
    if (!this.searchTermInvalide.trim()) {
      this.filteredAnnoncesInvalides = [...this.invalidesAnnonces];
    } else {
      // Sinon, filtrer les annonces dont le nom contient le terme de recherche
      this.filteredAnnoncesInvalides = this.invalidesAnnonces.filter(
        (annonce) =>
          annonce.nom
            .toLowerCase()
            .includes(this.searchTermInvalide.toLowerCase())
        //   ||
        // annonce.description
        //   .toLowerCase()
        //   .includes(this.searchTermInvalide.toLowerCase())
      );
    }
  }

  // Fonction appelée à chaque changement dans le champ de recherche
  onSearchChangeInvalide(): void {
    // Filtrer les annonces invalides avec le nouveau terme de recherche
    this.filterAnnoncesInvalides();
  }

  // Méthode pour récupérer la liste des propriétaires
  listeProprietaire() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      console.log('proprietaires: ', response);
      this.tabUsers = response.proprietaire;
      console.log('tabUsers: ', this.tabUsers);
    });
  }

  // Méthode pour afficher les details d'une annonce valide
  afficherDetailAnnonceInvalide(annonce: any) {
    this.annonceSelectionnee = annonce;
    console.log('Annonce sélectionnée: ', this.annonceSelectionnee);

    // on stocke les infos de l'annonce selectionnée dans infoAnnonceselected
    this.infoAnnonceSelected = this.invalidesAnnonces.find(
      (annonce) => annonce.id === this.annonceSelectionnee
    );
    console.log('info annonce selected: ', this.infoAnnonceSelected);

    // Le proprietaire de l'annonce
    let proprietaire = this.infoAnnonceSelected.user_id;
    console.log("l'id du proprietaire", proprietaire);

    // On recherche le propriétaire qui a les infos de user_id
    this.infoProprietaire = this.tabUsers.find(
      (user: any) => user.id === proprietaire
    );
    console.log(
      'Informations du proprietaire à qui appartient cette annonce ',
      this.infoProprietaire
    );
    console.log(this.infoProprietaire.nom);
  }

  // Méthode pour afficher les details d'une annonce invalide
  afficherDetailAnnonceValide(annonce: any) {
    this.annonceSelectionnee = annonce;
    console.log('Annonce sélectionnée: ', this.annonceSelectionnee);

    // on stocke les infos de l'annonce selectionnée dans infoAnnonceselected
    this.infoAnnonceSelected = this.validesAnnonces.find(
      (annonce) => annonce.id === this.annonceSelectionnee
    );
    console.log('info annonce selected: ', this.infoAnnonceSelected);

    // Le proprietaire de l'annonce
    let proprietaire = this.infoAnnonceSelected.user_id;
    console.log("l'id du proprietaire", proprietaire);

    // On recherche le propriétaire qui a les infos de user_id
    this.infoProprietaire = this.tabUsers.find(
      (user: any) => user.id === proprietaire
    );
    console.log(
      'Informations du proprietaire à qui appartient cette annonce ',
      this.infoProprietaire
    );
    console.log(this.infoProprietaire.nom);
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
        // this.annonceServiceEtat
        //   .updateAnnonceState(annonceId, newState)
        //   .subscribe(() => {
        //     // Mettre à jour l'état de l'annonce après avoir reçu la réponse du serveur
        //     this.annonceSelectionnee.etat = newState;
        //     this.alertMessage(
        //       'success',
        //       'Super',
        //       'Annonce activée avec succés'
        //     );
        //     this.listesAnnonces();
        //     this.listesAnnonces();
        //   });
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

  // Alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 1500, // Durée en millisecondes avant la disparition
      timerProgressBar: true, // Barre de progression de la temporisation
      showConfirmButton: false, // Cacher le bouton de confirmation
    });
  }

  // Methode pour la modification d'une annonce
  getCategories() {
    this.listeCategories.getCategoriesProp().subscribe(
      (response: any) => {
        console.log('Liste des catégories: ', response.categories);
        this.Categories = response.categories;
        console.log('Categories', this.Categories);
      },
      (error) => {
        console.log('Erreur lors de la récupération des catégories: ', error);
      }
    );
  }

  // Méthode pour mettre à jour une annonce
  annonceUpdateOnly(idAnnonce: number) {
    console.log(
      "L'identifiant de l'annonce est: ",
      this.infoAnnonceSelected.id
    );

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir modifier cette annonce ?',
      text: 'Vous allez modifier cette annonce !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, modifier',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, modifier"
        let annonceAjour = {
          nom: this.infoAnnonceSelected.nom,
          marque: this.infoAnnonceSelected.marque,
          couleur: this.infoAnnonceSelected.couleur,
          image: this.infoAnnonceSelected.image as File,
          prix: this.infoAnnonceSelected.prix,
          description: this.infoAnnonceSelected.description,
          nbrePlace: this.infoAnnonceSelected.nbrePlace,
          localisation: this.infoAnnonceSelected.localisation,
          moteur: this.infoAnnonceSelected.moteur,
          annee: this.infoAnnonceSelected.annee,
          etat: this.infoAnnonceSelected.etat,
          carburant: this.infoAnnonceSelected.carburant,
          carosserie: this.infoAnnonceSelected.carosserie,
          kilometrage: this.infoAnnonceSelected.kilometrage,
          climatisation: this.infoAnnonceSelected.climatisation,
          categorie_id: this.infoAnnonceSelected.categorie_id,
          image1: this.infoAnnonceSelected.image1 as File,
          image2: this.infoAnnonceSelected.image2 as File,
          image3: this.infoAnnonceSelected.image3 as File,
          image4: this.infoAnnonceSelected.image4 as File,
          commentaires: [],
          signalements: [],
        };

        console.log('new annonce avant ajout: ', annonceAjour);

        this.updateAnnonceService
          .updateAnnonceOnly(idAnnonce, annonceAjour)
          .subscribe(
            (response) => {
              console.log(response);
              this.annoncesInvalides();
              this.alertMessage(
                'success',
                'Modifiée',
                'Annonce modifié avec succés'
              );
            },
            (error) => {
              console.log(error);
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("La modification de l'annonce a été annulée.");
        this.alertMessage(
          'info',
          'Annulée',
          "modification de l'annonce annulée"
        );
      }
    });
  }

  // File img
  onFileChange(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  // File img1
  img1(event: any) {
    this.image1 = event.target.files[0] as File;
    console.warn(event.target.files[0]);
  }

  // File img1
  img2(event: any) {
    this.image2 = event.target.files[0] as File;
    console.warn(event.target.files[0]);
  }

  // File img1
  img3(event: any) {
    this.image3 = event.target.files[0] as File;
    console.warn(event.target.files[0]);
  }

  // File img1
  img4(event: any) {
    this.image4 = event.target.files[0] as File;
    console.warn(event.target.files[0]);
  }

  // vider champs
  viderChamps() {
    this.nom = '';
    this.marque = '';
    this.couleur = '';
    this.description = '';
    this.prix = 0;
    this.nbrePlace = '';
    this.localisation = '';
    this.moteur = '';
    this.annee = '';
    this.carburant = '';
    this.carosserie = '';
    this.kilometrage = '';
    this.climatisation = '';
    this.categorie_id = 0;
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
              // this.listesAnnonces();
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
