import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeContactsService } from 'src/app/services/liste-contacts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  nomComplet: string = '';
  email: string = '';
  message: string = '';

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

  constructor(
    private contactService: ListeContactsService,
    private http: HttpClient
  ) {}

  newContact() {
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

  registerContact() {
    let newContact = {
      nomComplet: this.nomComplet,
      email: this.email,
      message: this.message,
    };

    this.contactService.addMessage(newContact).subscribe((response: any) => {
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
  // Méthode de validation pour nom complet
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
      this.nomCompletEmpty = true;
      return false;
    } else if (!this.regexPattern.test(this.message)) {
      this.validationMessages['message'] =
        'Le nom ne peut etre composé que de lettres en miniscule ou majuscule.';
      this.nomCompletEmpty = false;
      return false;
    } else {
      this.validationMessages['message'] = '';
      this.nomCompletEmpty = false;
      return true;
    }
  }

  // vider champs
  viderChamps() {
    this.nomComplet = '';
    this.email = '';
    this.message = '';
  }

  // Alert message
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
