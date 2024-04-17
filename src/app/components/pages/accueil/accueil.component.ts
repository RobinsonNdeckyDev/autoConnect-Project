import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeBlogsService } from 'src/app/services/liste-blogs.service';
import { ListeContactsService } from 'src/app/services/liste-contacts.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {

  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";

  
  nomComplet: string = '';
  email: string = '';
  message: string = '';
  // liste des véhicules
  listemotos: any;
  listeVoitures: any;
  listeUtilitaires: any;
  tabProprietaires: any[] = [];
  annonceVoitureFiltered: any[] = [];
  annonceMotoFiltered: any[] = [];
  annonceUtilitaireFiltered: any[] = [];

  // Messages de validation
  validationMessages: { [key: string]: string } = {};

  // Déclaration des propriétés touched
  emailTouched: boolean = false;
  nomCompletTouched: boolean = false;
  messageTouched: boolean = false;

  // Déclaration des propriétés Empty
  emailEmpty: boolean = false;
  nomCompletEmpty: boolean = false;
  messageEmpty: boolean = false;

  // emailregex pattern
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  // regex password
  passwordRegex: RegExp = /^\d{6,}$/;

  regexPattern: RegExp = /^[a-zA-Z ]+$/;

  // attributs de tables
  blogs: any[] = [];

  constructor(
    private contactService: ListeContactsService,
    private listeAnnonceService: PublierAnnonceService,
    private listeBlogsService: ListeBlogsService,
    private proprietaireService: ListeUsersService,
    private route: Router
  ) {}

  ngOnInit(): void {
    // proprietaires
    this.getProprietaire();

    // Annonces en avant
    this.getAnnoncesEnAvant();

    // liste blogs
    this.getBlogs();
  }

  // Liste des proprietaires
  getProprietaire() {
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      this.tabProprietaires = response.proprietaire;
    });
  }

  // Ajouter un contact
  addContact() {
    if (this.validateFormContact()) {
      this.registerContact();
    }
    // if (this.nomComplet == '') {
    //   this.alertMessage(
    //     'error',
    //     'Oops!',
    //     'Merci de renseigner votre nom complet!'
    //   );
    // } else if (this.email == '') {
    //   this.alertMessage('error', 'Oops!', 'Merci de renseigner votre email!');
    // } else if (this.message == '') {
    //   this.alertMessage('error', 'Oops!', 'Merci de renseigner votre message!');
    // } else if (!this.email.match(this.emailPattern)) {
    //   this.alertMessage(
    //     'error',
    //     'Oops!',
    //     'Merci de renseigner une adresse mail valide!'
    //   );
    // } else {
    //   let newAbonne = {
    //     nomComplet: this.nomComplet,
    //     email: this.email,
    //     message: this.message,
    //   };

    //   this.contactService.addMessage(newAbonne).subscribe((response: any) => {
    //     this.alertMessage('success', 'Super', 'Message envoyé avec succés');
    //     console.log(response);
    //     this.viderChamps();
    //   });
    // }
  }

  // redirection vers la page details voiture
  redirectToDetailsVoiture(voitureId: number) {
    this.route.navigate(['vehicules/voitures/detailVoiture', voitureId]);
  }

  // redirection vers la page details moto
  redirectToDetailsMoto(motoId: number) {
    this.route.navigate(['vehicules/motos/detailMoto', motoId]);
  }

  // redirection vers la page details utilitaire
  redirectToDetailsUtilitaire(utilitaireId: number) {
    this.route.navigate([
      'vehicules/utilitaires/detailUtilitaire',
      utilitaireId,
    ]);
  }

  // Liste des annonces mises en avant
  getAnnoncesEnAvant() {
    this.listeAnnonceService.getAnnonceMisesEnAvant().subscribe(
      (response: any) => {
        console.log(response);
        // liste voitures
        this.listeVoitures = response.annoncesMisesEnAvant.voiture;
        // Pour chaque annonce de voiture, trouvez l'utilisateur concernée
        this.listeVoitures.forEach((annonce: any) => {
          const prorietaireAnnonceVoiture = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonceVoiture;
        });
        // Initialisation de annonceVoitureFiltered
        this.annonceVoitureFiltered = [...this.listeVoitures];
        console.log('annonceVoitureFiltered: ', this.annonceVoitureFiltered);
        // Pour chaque annonce de voiture, trouvez l'utilisateur concernée

        // liste motos
        this.listemotos = response.annoncesMisesEnAvant.moto;
        // Pour chaque annonce de moto, trouvez l'utilisateur concernée
        this.listemotos.forEach((annonce: any) => {
          const prorietaireAnnonceMoto = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonceMoto;
        });

        // Initialisation de annonceMotoFiltered
        this.annonceMotoFiltered = [...this.listemotos];
        console.log('annonceMotoFiltered: ', this.annonceMotoFiltered);

        // Pour chaque annonce de moto, trouvez l'utilisateur concernée

        // liste utilitaires
        this.listeUtilitaires = response.annoncesMisesEnAvant.utilitaire;
        // Pour chaque annonce de utilitaire, trouvez l'utilisateur concernée
        this.listeUtilitaires.forEach((annonce: any) => {
          const prorietaireAnnonceUtilitaire = this.tabProprietaires.find(
            (user: any) => user.id === annonce.user_id
          );

          // Associez l'utilisateur et l'annonce
          annonce.infosProprietaire = prorietaireAnnonceUtilitaire;
        });

        // Initialisation de anonceUtilitaireFiltered
        this.annonceUtilitaireFiltered = [...this.listeUtilitaires];
        console.log(
          'annonceUtilitaireFiltered: ',
          this.annonceUtilitaireFiltered
        );

        // Pour chaque annonce de utilitaire, trouvez l'utilisateur concernée
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Liste des blogs
  getBlogs() {
    this.listeBlogsService.getBlogs().subscribe(
      (response: any) => {
        console.log('liste des blogs ', response);

        // Assigner à blogs les trois premiers
        this.blogs = response.blocs.slice(0, 3);
        console.log('mon tableu de blogs ', this.blogs);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details blog
  redirectToDetails(blogId: number) {
    this.route.navigate(['/blog/detailsBlog', blogId]);
  }

  registerContact() {
    let newAbonne = {
      nomComplet: this.nomComplet,
      email: this.email,
      message: this.message,
    };

    this.contactService.addMessage(newAbonne).subscribe((response: any) => {
      this.alertMessage('success', 'Envoyé', 'Message envoyé avec succés');
      console.log(response);
      this.viderChamps();
    });
  }

  // validation form login
  validateFormContact() {
    let isValid = true;
    isValid = this.validateNomComplet() && isValid;
    isValid = this.validateEmail() && isValid;
    isValid = this.validateMessage() && isValid;
    return isValid;
  }

  // Validation email
  validateEmail(): boolean {
    if (!this.email) {
      this.validationMessages['email'] = "L'email est requis";
      this.emailEmpty = true; // Mettre à jour emailEmpty si le champ est vide
      return false;
    } else if (!this.emailPattern.test(this.email)) {
      this.validationMessages['email'] = 'Email invalide';
      this.emailEmpty = false;
      return false;
    } else {
      this.validationMessages['email'] = '';
      this.emailEmpty = false;
      return true;
    }
  }
  // Méthode de validation pour le mot de passe
  validateNomComplet() {
    if (!this.nomComplet) {
      this.validationMessages['nomComplet'] = 'Le nom complet est requis';
      this.nomCompletEmpty = true;
      return false;
    } else if (!this.regexPattern.test(this.nomComplet)) {
      this.validationMessages['nomComplet'] =
        'Le nom ne peut etre composé que de lettres en miniscule ou majuscule.';
      this.nomCompletEmpty = false;
      return false;
    } else {
      this.validationMessages['nomComplet'] = '';
      this.nomCompletEmpty = false;
      return true;
    }
  }

  // Validate message
  validateMessage() {
    if (!this.message) {
      this.validationMessages['message'] = 'Le message est requis';
      this.messageEmpty = true;
      return false;
    } else if (!this.regexPattern.test(this.message)) {
      this.validationMessages['message'] =
        'Le message ne peut etre composé que de lettres en miniscule ou majuscule.';
      this.messageEmpty = false;
      return false;
    } else {
      this.validationMessages['message'] = '';
      this.messageEmpty = false;
      return true;
    }
  }

  // vider champs
  viderChamps() {
    this.nomComplet = '';
    this.email = '';
    this.message = '';
  }

  // alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 1800, // Durée en millisecondes avant la disparition
      timerProgressBar: true, // Barre de progression de la temporisation
      showConfirmButton: false, // Cacher le bouton de confirmation
    });
  }
}
