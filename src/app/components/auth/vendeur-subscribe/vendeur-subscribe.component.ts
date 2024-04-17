import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proprietaire } from 'src/app/models/proprietaire';
import { AuthenticationService } from 'src/app/services/authentification.service';
// import { InscriptionService } from 'src/app/services/inscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendeur-subscribe',
  templateUrl: './vendeur-subscribe.component.html',
  styleUrls: ['./vendeur-subscribe.component.css'],
})
export class VendeurSubscribeComponent {
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  // Attributs de champs
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  confirmation: string = '';
  telephone: string = '';
  adresse: string = '';
  description: string = '';
  image!: File;
  role: string = 'proprietaire';

  // Messages de validation
  validationMessages: { [key: string]: string } = {};

  // Déclaration des propriétés touched
  prenomTouched: boolean = false;
  nomTouched: boolean = false;
  emailTouched: boolean = false;
  telephoneTouched: boolean = false;
  passwordTouched: boolean = false;
  confirmationTouched: boolean = false;
  adresseTouched: boolean = false;
  photoTouched: boolean = false;
  descriptionTouched: boolean = false;

  // Déclaration des propriétés Empty
  prenomEmpty: boolean = false;
  nomEmpty: boolean = false;
  emailEmpty: boolean = false;
  telephoneEmpty: boolean = false;
  passwordEmpty: boolean = false;
  confirmationEmpty: boolean = false;
  adresseEmpty: boolean = false;
  photoEmpty: boolean = false;
  descriptionEmpty: boolean = false;

  // déclaration des regex

  // Regex prenom et nom
  regexPattern: RegExp = /^[a-zA-Z]+$/;

  // Telephone regex
  telephoneRegex: RegExp = /^[0-9]{9}$/;

  // emailregex pattern
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // regex password
  passwordRegex: RegExp = /^\d{6,}$/;

  // regex adresse
  adresseRegex: RegExp = /^[a-zA-Z\s]{4,}$/;

  // regex adresse
  descriptionRegex: RegExp = /^[a-zA-Z\s]{10,}$/;

  // Incription proprietaire
  inscription() {
    this.validateForm();
    this.registerUser();
  }

  validateForm() {
    let isValid = true;

    isValid = this.validatePrenom() && isValid;
    isValid = this.validateNom() && isValid;
    isValid = this.validateEmail() && isValid;
    isValid = this.validateTelephone() && isValid;
    isValid = this.validatePassword() && isValid;
    isValid = this.validateConfirmationPassword() && isValid;
    isValid = this.validateAdresse() && isValid;
    isValid = this.validatePhoto() && isValid;

    return isValid;
  }

  // Incription proprietaire
  registerUser() {
    let formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('prenom', this.prenom);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('confirmation', this.confirmation);
    formData.append('telephone', this.telephone);
    formData.append('adresse', this.adresse);
    formData.append('description', this.description);
    formData.append('role', this.role);
    // Ajouter l'image
    formData.append('image', this.image);

    this.authService.registerproprietaire(formData).subscribe(
      (response) => {
        console.log(response);

        this.route.navigate(['/login']);

        this.alertMessage(
          'success',
          'Bravo',
          'Vous vous êtes inscrit avec succès!'
        );
      },
      (error) => {
        console.error(error);
        this.alertMessage(
          'error',
          'Attention',
          'Inscription refusée. Veuillez réessayer.'
        );
      }
    );
  }

  // Validation prenom
  validatePrenom(): boolean {
    if (!this.prenom) {
      this.validationMessages['prenom'] = 'Le prénom est requis';
      // Mettre à jour prenomEmpty si le champ est vide
      this.prenomEmpty = true;
      return false;
    } else if (!this.regexPattern.test(this.prenom)) {
      this.validationMessages['prenom'] =
        'Pas de chiffres et de caractéres pour le prénom';
      this.prenomEmpty = false;
      return false;
    } else if (this.prenom.length < 4) {
      this.validationMessages['prenom'] = 'Le prénom est trop court';
      this.prenomEmpty = false;
      return false;
    } else {
      this.validationMessages['prenom'] = '';
      // Mettre à jour prenomEmpty si le champ n'est pas vide
      this.prenomEmpty = false;
      return true;
    }
  }

  // Validation nom
  validateNom(): boolean {
    this.nomTouched = true;
    if (!this.nom) {
      this.validationMessages['nom'] = 'Le nom est requis';
      return false;
    } else if (!this.regexPattern.test(this.nom)) {
      this.validationMessages['nom'] =
        'Pas de chiffres et de caractéres pour le nom';
      this.nomEmpty = false;
      return false;
    } else if (this.nom.length < 4) {
      this.validationMessages['nom'] = 'Le nom est trop court';
      return false;
    } else {
      this.validationMessages['nom'] = '';
      return true;
    }
  }

  // Validation email
  validateEmail(): boolean {
    if (!this.email) {
      this.validationMessages['email'] = "L'email est requis";
      this.emailEmpty = true; // Mettre à jour emailEmpty si le champ est vide
      return false;
    } else if (!this.emailPattern.test(this.email)) {
      this.validationMessages['email'] = 'Email invalide';
      this.emailEmpty = false; // Mettre à jour emailEmpty si le champ n'est pas vide
      return false;
    } else {
      this.validationMessages['email'] = '';
      this.emailEmpty = false; // Mettre à jour emailEmpty si le champ n'est pas vide
      return true;
    }
  }

  // Méthode de validation pour le téléphone
  validateTelephone() {
    if (!this.telephone) {
      this.validationMessages['telephone'] = 'Le téléphone est requis';
      this.telephoneEmpty = true;
      return false;
    } else if (!this.telephoneRegex.test(this.telephone)) {
      this.validationMessages['telephone'] =
        'Pas de caractères et dois contenir exactement 9 chiffres';
      this.telephoneEmpty = false;
      return false;
    } else {
      this.validationMessages['telephone'] = '';
      this.telephoneEmpty = false;
      return true;
    }
  }

  // Méthode de validation pour le mot de passe
  validatePassword() {
    if (!this.password) {
      this.validationMessages['password'] = 'Le mot de passe est requis';
      this.passwordEmpty = true;
      return false;
    } else if (!this.passwordRegex.test(this.password)) {
      this.validationMessages['password'] =
        'Le mot de passe doit contenir au moins 6 chiffres';
      this.passwordEmpty = false;
      return false;
    } else {
      this.validationMessages['password'] = '';
      this.passwordEmpty = false;
      return true;
    }
  }

  // Méthode de validation pour le champ de confirmation du mot de passe
  validateConfirmationPassword() {
    if (!this.confirmation) {
      this.validationMessages['confirmation'] =
        'La confirmation du mot de passe est requise';
      this.confirmationEmpty = true;
      return false;
    } else if (this.confirmation !== this.password) {
      this.validationMessages['confirmation'] =
        'La confirmation du mot de passe ne correspond pas au mot de passe';
      this.confirmationEmpty = false;
      return false;
    } else {
      this.validationMessages['confirmation'] = '';
      this.confirmationEmpty = false;
      return true;
    }
  }

  // Méthode de validation pour le champ "adresse"
  validateAdresse() {
    if (!this.adresse) {
      this.validationMessages['adresse'] = "L'adresse est requise";
      this.adresseEmpty = true;
      return false;
    } else if (!this.adresseRegex.test(this.adresse)) {
      this.validationMessages['adresse'] =
        "L'adresse doit contenir au moins 4 caractères et ne peut contenir que des lettres";
      this.adresseEmpty = false;
      return false;
    } else {
      this.validationMessages['adresse'] = '';
      this.adresseEmpty = false;
      return true;
    }
  }

  // Méthode de validation pour le champ "adresse"
  validateDescription() {
    if (!this.description) {
      this.validationMessages['description'] = 'La description est requise';
      this.descriptionEmpty = true;
      return false;
    } else {
      this.validationMessages['description'] = '';
      this.descriptionEmpty = false;
      return true;
    }
  }

  // Méthode de validation photo de profil
  validatePhoto() {
    if (!this.image) {
      this.validationMessages['photo'] = 'La photo de profil est requise';
      this.photoEmpty = true;
      return false;
    } else {
      this.validationMessages['photo'] = '';
      this.photoEmpty = false;
      return true;
    }
  }

  // Clean form
  cleanForm() {
    this.nom = '';
    this.email = '';
    this.prenom = '';
    this.password = '';
    this.confirmation = '';
    this.adresse = '';
    this.telephone = '';
    this.description = '';
    // this.image = '';
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

  // File img1
  profilAdd(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.image = fileInput.files[0];
      this.validatePhoto();
    }
  }


  // step by step by form

  currentStep = 1;

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  // Fonction pour réinitialiser l'étape à 1
  annulerInscription() {

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir annuler votre inscription?',
      text: 'Vous allez annuler votre inscription!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cleanForm();
        this.currentStep = 1;
        this.alertMessage('success', 'Annulée', 'Inscription annulée avec succès');
        // this.updateProgression();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log('L\'inscription a été annulée.');
        this.alertMessage('info', 'Annulée', 'Inscription annulée');
      }
    });
  }

}
