import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { ListeUtilitairesService } from 'src/app/services/liste-utilitaires.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import { SignalementService } from 'src/app/services/signalement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-utilitaire',
  templateUrl: './detail-utilitaire.component.html',
  styleUrls: ['./detail-utilitaire.component.css'],
})
export class DetailUtilitaireComponent {

  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";
  
  listeVoitures: any;
  voitureId?: number;
  voitureDetails: any;
  tabProprietaires: any[] = [];
  proprietaireInfo: any;
  voitureSelected: any;
  raisonSignal: string = '';
  commentaire: string = '';
  tabCommentaires: any[] = [];
  AnnoncesEnAvantFiltered: any[] = [];
  commentAnnonce: any;
  userComment: any;
  topComments: any;
  annonceId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private listeUtilitaireService: ListeUtilitairesService,
    private listeAnnonceService: PublierAnnonceService,
    private proprietaireService: ListeUsersService,
    private commentService: CommentaireService,
    private signalService: SignalementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.annonceId = params['id'];
      this.getProprietaire();
      this.identifiantVoiture();
      this.getCommentaires();
      this.getAnnoncesEnAvant();
      this.getVoiture();
    });
  }

  identifiantVoiture() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.voitureId = +id;
    }
  }

  getProprietaire() {
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      this.tabProprietaires = response.proprietaire;
    });
  }

  getVoiture() {
    if (this.voitureId !== undefined) {
      let idVoiture: number = this.voitureId;
      this.listeUtilitaireService.infoUtilitaire(idVoiture).subscribe(
        (response: any) => {
          this.voitureDetails = response.annonce;
          this.proprietaireInfo = this.tabProprietaires.find(
            (user: any) => user.id === this.voitureDetails.user_id
          );
        },
        (error) => {
          console.log(
            'Erreur lors de la récupération des détails de la voiture: ',
            error
          );
        }
      );
    }
  }

  getCommentaires() {
    this.commentService.getcommentaires().subscribe(
      (response: any) => {
        this.tabCommentaires = response.commentaires;
        let identifiantAnnonce: number = Number(this.annonceId);
        this.commentAnnonce = this.tabCommentaires.filter(
          (comment) => parseInt(comment.annonce_id, 10) === identifiantAnnonce
        );
        this.topComments = this.commentAnnonce.slice(0, 3);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAnnoncesEnAvant() {
    this.listeAnnonceService.getAnnonceMisesEnAvant().subscribe(
      (response: any) => {
        this.listeVoitures = response.annoncesMisesEnAvant.utilitaire;

        console.log('Liste utilitaires', this.listeVoitures);

        // Pour chaque annonce, trouvez l'utilisateur concernée
        this.listeVoitures.forEach((annonce: any) => {
          const prorietaireAnnonce = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );
          console.log('prorietaireAnnonce: ', prorietaireAnnonce);

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonce;
        });

        // Initialisation de filteredSignalements avec les signalements récupérés
        this.AnnoncesEnAvantFiltered = [...this.listeVoitures];
        console.log('AnnoncesEnAvantFiltered: ', this.AnnoncesEnAvantFiltered);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  redirectToDetails(voitureId: number) {
    this.router.navigate(['vehicules/voitures/detailVoiture', voitureId]);
  }

  addSignal(idAnnonce: number) {
    if (this.raisonSignal == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner le motif');
    } else {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir signaler cette annonce ?',
        text: 'Vous allez signaler cette annonce !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0F42A8',
        cancelButtonColor: 'black',
        confirmButtonText: 'Oui, signaler',
      }).then((result) => {
        if (result.isConfirmed) {
          let newSignal: any = {
            description: this.raisonSignal,
          };

          this.signalService.signalAnnonce(idAnnonce, newSignal).subscribe(
            (response) => {
              this.alertMessage(
                'success',
                'Signalée',
                "Signalement de l'annonce effectué avec succès"
              );
            },
            (error) => {
              this.alertMessage(
                'warning',
                'Impossible',
                'Vous devez vous connecter pour soumettre un signalement'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log("Le signalement de l'annonce a été annulée.");
          this.alertMessage(
            'info',
            'Annulée',
            "Signalement de l'annonce annulée"
          );
        }
      });
    }
  }

  addComment(idAnnonce: number) {
    if (this.commentaire == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner un commentaire');
    } else {
      let newComment: any = {
        commentaire: this.commentaire,
      };

      this.commentService.commentAnnonce(idAnnonce, newComment).subscribe(
        (response) => {
          this.alertMessage(
            'success',
            'Envoyé',
            'Commentaire effectué avec succès'
          );
          this.getCommentaires();
        },
        (error) => {
          this.alertMessage(
            'warning',
            'Impossible',
            'Vous devez vous connecter pour soumettre un commentaire'
          );
        }
      );
    }
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

  cleanForm() {
    this.raisonSignal = '';
  }
}
