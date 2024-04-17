import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { ListeMotosService } from 'src/app/services/liste-motos.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import { SignalementService } from 'src/app/services/signalement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-moto',
  templateUrl: './detail-moto.component.html',
  styleUrls: ['./detail-moto.component.css'],
})
export class DetailMotoComponent {

  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";
  
  listeMotos: any;
  motoId?: number;
  motoDetails: any;
  tabProprietaires: any[] = [];
  listeMotosFiltered: any[] = []; 
  proprietaireInfo: any;
  motoSelected: any;
  raisonSignal: string = '';
  commentaire: string = '';
  commentaires: any[] = [];
  tabCommentaires: any[] = [];
  commentAnnonce: any;
  userComment: any;
  topComments: any;
  annonceId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private listeMotoService: ListeMotosService,
    private listeAnnonceService: PublierAnnonceService,
    private proprietaireService: ListeUsersService,
    private commentService: CommentaireService,
    private signalService: SignalementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'annonce depuis les paramètres de l'URL
    this.route.params.subscribe((params) => {
      this.annonceId = params['id'];
      console.log('id: ' + this.annonceId);

      this.getCommentaires();

      this.getProprietaire();

      // id voiture
      this.identifiantMoto();

      // detail du blog
      this.getMoto();

      // Annonce en avant
      this.getAnnoncesEnAvant();
    });
  }

  // identifiant moto
  identifiantMoto() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.motoId = +id;
    }
  }

  // Méthode pour récupérer la liste des propriétaires
  getProprietaire() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      this.tabProprietaires = response.proprietaire;
      console.log('liste props: ', this.tabProprietaires);
    });
  }

  // Infos annonce
  getMoto() {
    if (this.motoId !== undefined) {
      let idMoto: number = this.motoId;
      this.listeMotoService.infoMoto(idMoto).subscribe(
        (response: any) => {
          this.motoDetails = response.annonce;
          console.log('detail moto: ', this.motoDetails);
          // On recherche le propriétaire qui a les infos de user_id
          this.proprietaireInfo = this.tabProprietaires.find(
            (user: any) => user.id === this.motoDetails.user_id
          );
        },
        (error) => {
          console.log(
            'Erreur lors de la récupération des détails de la moto: ',
            error
          );
        }
      );
    }
  }

  getCommentaires() {
    this.commentService.getcommentaires().subscribe(
      (response: any) => {
        console.log('Liste des commentaires: ', response.commentaires);

        // récupération des commentaires dans tabCommentaires
        this.tabCommentaires = response.commentaires;
        console.log('TabCommentaires: ', this.tabCommentaires);
        console.log("L'id de annonce: ", this.annonceId);

        // Convertir annonceId en nombre si nécessaire
        let identifiantAnnonce: number = Number(this.annonceId);
        // Filtrer les commentaires pour ne récupérer que ceux liés à l'annonce sélectionnée
        this.commentAnnonce = this.tabCommentaires.filter(
          (comment) => parseInt(comment.annonce_id, 10) === identifiantAnnonce
        );

        // top commentaires
        this.topComments = this.commentAnnonce.slice(0, 3);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Liste des annonces mises en avant
  getAnnoncesEnAvant() {
    this.listeAnnonceService.getAnnonceMisesEnAvant().subscribe(
      (response: any) => {
        console.log(response);
        // liste motos
        this.listeMotos = response.annoncesMisesEnAvant.moto;
        // Pour chaque annonce, trouvez l'utilisateur concernée
        this.listeMotos.forEach((annonce: any) => {
          const prorietaireAnnonce = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );
          console.log('prorietaireAnnonce: ', prorietaireAnnonce);

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonce;
        });

        // Initialisation de filteredSignalements avec les signalements récupérés
        this.listeMotosFiltered = [...this.listeMotos];
        console.log('AnnoncesEnAvantFiltered: ', this.listeMotosFiltered);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details moto
  redirectToDetails(motoId: number) {
    // this.identifiantmoto();
    this.router.navigate(['vehicules/motos/detailMoto', motoId]);
    // this.getMoto();
  }

  // Signalement annonce
  addSignal(idAnnonce: number) {
    console.log(this.raisonSignal);

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
          // Si l'utilisateur clique sur "Oui, d"sactiver"
          let newSignal: any = {
            description: this.raisonSignal,
          };

          this.signalService.signalAnnonce(idAnnonce, newSignal).subscribe(
            (response) => {
              console.log(response);
              this.alertMessage(
                'success',
                'Signalée',
                "Signalement de l'annonce effectué avec succés"
              );
            },
            (error) => {
              console.log(error);
              this.alertMessage(
                'warning',
                'Impossible',
                'Vous devez vous connectez pour soumettre un signalement'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Si l'utilisateur clique sur "Annuler"
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


  // ajout commentaire annonce
  addComment(idAnnonce: number) {
    console.log(this.commentaire);

    if (this.commentaire == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner un commentaire');
    } else {
      // Si l'utilisateur clique sur "Oui, d"sactiver"
      let newComment: any = {
        commentaire: this.commentaire,
      };

      this.commentService.commentAnnonce(idAnnonce, newComment).subscribe(
        (response) => {
          console.log(response);
          this.alertMessage(
            'success',
            'Envoyé',
            'Commentaire effectué avec succés'
          );
        },
        (error) => {
          console.log(error);
          // this.alertMessage('Oops', 'Non envoyé', 'Commentaire non effectué');
          this.alertMessage(
            'warning',
            'Impossible',
            'Vous devez vous connectez pour soumettre un commentaire'
          );
        }
      );
    }
  }

  // Alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  // clean form
  cleanForm() {
    this.raisonSignal = '';
  }
}
