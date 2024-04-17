import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentification.service';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Declaration des attributs
  email: string = '';
  password: string = '';

  // Messages de validation
  validationMessages: { [key: string]: string } = {};

  // Déclaration des propriétés touched
  emailTouched: boolean = false;
  passwordTouched: boolean = false;

  // Déclaration des propriétés Empty
  emailEmpty: boolean = false;
  passwordEmpty: boolean = false;

  // emailregex pattern
  emailPattern =
    // /^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z][A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  // regex password
  passwordRegex: RegExp = /^\d{6,}$/;

  constructor(
    private authService: AuthenticationService,
    private route: Router,
    private ngZone: NgZone
  ) {}

  // methode pour la connexion
  login(): void {
    console.log(this.email);
    console.log(this.password);

    // Appeler la méthode validateFormLogin
    if (this.validateFormLogin()) {
      // Appeler la méthode registerProprietaire seulement si la validation réussit
      this.registerProprietaire();
    }
  }

  // registerProprietaire
  registerProprietaire() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log(response);

        // Si la connexion réussit, stocker la réponse dans le local storage, y compris le token
        localStorage.setItem('token', response.access_token); // Stocker le token

        const userdata = localStorage.getItem('currentUser');

        const userConnectedRole = userdata ? JSON.parse(userdata).role : null;
        console.log(userConnectedRole);

        // Rediriger l'utilisateur vers une autre page

        switch (response.user.role) {
          case 'admin':
            this.route.navigate(['/admin']);
            this.alertMessage(
              'success',
              'Connecté',
              'Connexion réussie avec succés.'
            );
            break;
          case 'proprietaire':
            this.route.navigate(['/proprietaire']);
            this.alertMessage(
              'success',
              'Connecté',
              'Connexion réussie avec succés.'
            );
            break;
          case 'acheteur':
            this.route.navigate(['/accueil']);
            this.alertMessage(
              'success',
              'Connecté',
              'Connexion réussie avec succés.'
            );
            break;
          default:
            // Redirection par défaut si le rôle n'est pas reconnu
            this.route.navigate(['/accueil']);
        }
      },
      (error) => {
        // En cas d'erreur, afficher un message d'erreur
        this.alertMessage(
          'error',
          'Erreur',
          'Connexion échouée. Veuillez vérifier vos identifiants.'
        );
      }
    );
  }

  // validation form login
  validateFormLogin() {
    let isValid = true;
    isValid = this.validateEmail() && isValid;
    isValid = this.validatePassword() && isValid;
    return isValid;
  }

  // Validation email
  validateEmail(){
    if (!this.email) {
      this.validationMessages['email'] = "L'email est requis";
      // Mettre à jour emailEmpty si le champ est vide
      this.emailEmpty = true;
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
  validatePassword() {
    if (!this.password) {
      this.validationMessages['password'] = 'Le mot de passe est requis';
      this.passwordEmpty = true;
      return false;
    } else {
      this.validationMessages['password'] = '';
      this.passwordEmpty = false;
      return true;
    }
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

// else if (!this.passwordRegex.test(this.password)) {
//   this.validationMessages['password'] =
//     'Le mot de passe doit contenir au moins 6 Chiffres pas de lettres.';
//   this.passwordEmpty = false;
//   return false;
// } 
