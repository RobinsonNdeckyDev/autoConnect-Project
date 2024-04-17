import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'jquery';
import { Annonce } from 'src/app/models/annonce';
import { ListeCategoriesService } from 'src/app/services/liste-categories.service';
// import { ActivatedRoute } from '@angular/router';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publier-annonce',
  templateUrl: './publier-annonce.component.html',
  styleUrls: ['./publier-annonce.component.css'],
})
export class PublierAnnonceComponent {
  constructor(
    private publierAnnonce: PublierAnnonceService,
    private listeCategories: ListeCategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  // Attributs
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

  // Messages de validation
  validationMessages: { [key: string]: string } = {};

  // Déclaration des propriétés touched
  nomTouched: boolean = false;
  descriptionTouched: boolean = false;
  prixTouched: boolean = false;

  // Déclaration des propriétés Empty
  nomEmpty: boolean = false;
  descriptionEmpty: boolean = false;
  prixEmpty: boolean = false;

  regexNom: RegExp = /^[a-zA-Z]+$/;
  regexText: RegExp = /^[a-zA-Z0-9]+$/;
  regexPrix: RegExp = /^[0-9]{8,}$/;

  // emailregex pattern
  emailPattern =
    // /^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z][A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // Regex nom
  // regexNom: RegExp = ^[a-zA-Z0-9]+$;
  // regex password
  passwordRegex: RegExp = /^\d{6,}$/;

  // Définissez la variable de progression dans votre composant
  progression: number = 0;

  currentStep = 1;
  totalSteps = 3;

  //Liste des années de 2000 à 2024
  years: number[] = Array.from({ length: 25 }, (_, index) => 2000 + index);

  // Liste des categories
  Categories: any[] = [];

  // Liste des catégories
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

  // ajouter une annonce
  addAnnonce() {
    this.validateForm();

    this.registerAnnonce();

    this.viderChamps();

    this.resetToStep1();
  }

  // Validation des champs
  validateForm() {
    if (this.nom == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le nom du véhicule'
      );
      return; // Empêche la soumission si le champ est vide
    } else if (this.marque == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner la marque du vehicule'
      );
      return;
    } else if (this.couleur == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner la couleur du véhicule'
      );
      return;
    } else if (this.prix == 0) {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le prix du vehicule'
      );
      return;
    } else if (this.description == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner une description du vehicule'
      );
      return;
    } else if (this.climatisation == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner la clim');
      return;
    } else if (this.kilometrage == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le nombre de kilométrage parcouru par le véhicule'
      );
      return;
    } else if (this.localisation == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le lieu où se trouve le véhicule'
      );
      return;
    } else if (this.moteur == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner des infos sur le moteur'
      );
      return;
    } else if (this.annee == '') {
      this.alertMessage(
        'error',
        'Oops',
        "Merci de renseigner l'annee du vehicule"
      );
      return;
    } else if (this.carburant == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le type de carburant du vehicule'
      );
      return;
    } else if (this.carosserie == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner les ');
      return;
    } else if (this.categorie_id == 0) {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner la catégorie du véhicule'
      );
      return;
    }
  }

  // Validation email
  validateNom(): boolean {
    if (!this.nom) {
      this.validationMessages['nom'] = 'Le nom est requis';
      // Mettre à jour nomEmpty si le champ est vide
      this.nomEmpty = true;
      return false;
    } else if (!this.regexNom.test(this.nom)) {
      this.validationMessages['nom'] =
        'Le nom ne peut etre constitué de lettreS';
      this.nomEmpty = false;
      return false;
    } else {
      this.validationMessages['nom'] = '';
      this.nomEmpty = false;
      return true;
    }
  }

  validateDescription(): boolean {
    if (!this.description) {
      this.validationMessages['description'] = 'La description est requise';
      // Mettre à jour descriptionEmpty si le champ est vide
      this.descriptionEmpty = true;
      return false;
    } else if (!this.regexText.test(this.description)) {
      this.validationMessages['description'] =
        'La description ne peut etre constitué de lettres et de chiffres';
      this.descriptionEmpty = false;
      return false;
    } else {
      this.validationMessages['description'] = '';
      this.descriptionEmpty = false;
      return true;
    }
  }

  // Validation email
  validatePrix(): boolean {
    if (!this.nom) {
      this.validationMessages['nom'] = 'Le prix est requis';
      // Mettre à jour nomEmpty si le champ est vide
      this.prixEmpty = true;
      return false;
    } else if (!this.regexNom.test(this.nom)) {
      this.validationMessages['nom'] =
        'Le prix ne peut etre constitué de chiffres';
      this.prixEmpty = false;
      return false;
    } else {
      this.validationMessages['nom'] = '';
      this.prixEmpty = false;
      return true;
    }
  }

  // registerAnnonce
  registerAnnonce() {
    let nouvelleAnnonce = {
      nom: this.nom,
      marque: this.marque,
      couleur: this.couleur,
      image: this.image as File,
      prix: this.prix,
      description: this.description,
      nbrePlace: this.nbrePlace,
      localisation: this.localisation,
      moteur: this.moteur,
      annee: this.annee,
      carburant: this.carburant,
      carosserie: this.carosserie,
      kilometrage: this.kilometrage,
      climatisation: this.climatisation,
      categorie_id: this.categorie_id,
      image1: this.image1 as File,
      image2: this.image2 as File,
      image3: this.image3 as File,
      image4: this.image4 as File,
      commentaires: [],
      signalements: [],
    };

    console.log('new annonce avant ajout: ', nouvelleAnnonce);

    let formData = new FormData();
    Object.entries(nouvelleAnnonce).forEach(([key, value]) => {
      // Utilisez "as Blob" pour forcer TypeScript à reconnaître les valeurs comme des blobs
      formData.append(key, value as Blob);
    });

    this.publierAnnonce.addAnnonce(formData).subscribe(
      (response: any) => {
        console.log(response);
        console.log('réponse après ajout :', response.annonce);
        console.log('Annonce créee avec succés');
        this.alertMessage('success', 'Super', 'Annonce ajouté avec succés');
        console.log(response);
      },
      (error) => {
        console.log("Oops l'annonce n'a pas été créee");
        this.alertMessage('error', 'Oops', 'l\'annonce n\'a pas été créee');
        console.log(error);
      }
    );
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

  // Alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      // Durée en millisecondes avant la disparition
      timer: 1800,
      // Barre de progression de la temporisation
      timerProgressBar: true,
      // Cacher le bouton de confirmation
      showConfirmButton: false,
    });
  }

  // File img1
  onFileChange(event: any) {
    // console.warn(event.target.files[0]);
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

  // Fonction pour réinitialiser l'étape à 1
  resetToStep1() {
    this.currentStep = 1;
  }

  // Fonction pour réinitialiser l'étape à 1
  annulerPublicationAnnonce() {

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir annuler la publication de votre véhicule ?',
      text: 'Vous allez annuler la publication de votre véhicule !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.viderChamps();
        this.currentStep = 1;
        this.alertMessage('success', 'Annulée', 'Publication annulée avec succès');
        this.updateProgression();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log('La publication a été annulée.');
        this.alertMessage('info', 'Annulée', 'Publication annulée');
      }
    });
  }

  // Fonction pour mettre à jour la progression
  updateProgression() {
    this.progression = (this.currentStep - 1) * (100 / (this.totalSteps - 1));
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateProgression(); // Mettre à jour la progression
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgression(); // Mettre à jour la progression
    }
  }
}

