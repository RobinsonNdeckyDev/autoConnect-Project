import { Component, OnInit } from '@angular/core';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-vendeur',
  templateUrl: './profil-vendeur.component.html',
  styleUrls: ['./profil-vendeur.component.css'],
})
export class ProfilVendeurComponent implements OnInit {
  userConnected: any;
  proprietaireInfo: any = {};
  tabUsers: any[] = [];
  infoProprietaire: any;
  proprietaireId: string | number | undefined;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  adresse: string = '';
  description: string = '';
  imageCheck!: File;
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";

  constructor(private proprietaireService: ListeUsersService) {}

  ngOnInit(): void {
    this.listeProprietaire();
    this.getuserConnected();
    this.testConnected();
  }

  // Liste des proprietaires
  listeProprietaire() {
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      this.tabUsers = response.proprietaire;
      console.log('tabusers: ', this.tabUsers);
    });
  }

  // Avoir l'utilisateur connecté
  getuserConnected() {
    let currentUserInfo: any = localStorage.getItem('currentUser');
    this.userConnected = JSON.parse(currentUserInfo);
    console.log('getUserConnected: ', this.userConnected.id);
  }

  // test userconnected
  testConnected() {
    this.infoProprietaire = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    this.proprietaireId = this.infoProprietaire.id;
    console.log('proprietaireId: ', this.proprietaireId);

    if (this.proprietaireId) {
      const proprietaireIdNumber =
        typeof this.proprietaireId === 'string'
          ? parseInt(this.proprietaireId, 10)
          : this.proprietaireId;
      this.proprietaireService
        .userShowDetail(proprietaireIdNumber)
        .subscribe((proprietaire: any) => {
          this.userConnected = proprietaire.utilisateur;
          console.log('userConnected: ', this.userConnected);
        });
    }
  }

  // Envoie de la mise à jour du profil
  onSubmit(): void {
    // test
    console.log(this.imageCheck);

    // Envoyer les modifications au backend
    if (this.proprietaireId) {
      // Convertir l'ID en nombre si c'est une chaîne de caractères
      const proprietaireIdNumber =
        typeof this.proprietaireId === 'string'
          ? parseInt(this.proprietaireId, 10)
          : this.proprietaireId;
      console.log('proprietaireIdNumber: ', proprietaireIdNumber);

      Swal.fire({
        title: 'Êtes-vous sûr de vouloir modifier votre profil ?',
        text: 'Vous allez modifier votre profil !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0F42A8',
        cancelButtonColor: 'black',
        confirmButtonText: 'Oui, modifier',
      }).then((result) => {
        if (result.isConfirmed) {
          let proprietaireData = {
            nom: this.userConnected.nom,
            prenom: this.userConnected.prenom,
            email: this.userConnected.email,
            telephone: this.userConnected.telephone,
            description: this.userConnected.description,
            adresse: this.userConnected.adresse,
            image: this.imageCheck as Blob,
            role: 'proprietaire',
          };

          console.log('proprietaireData: ', proprietaireData);

          // injestion dans le service
          this.proprietaireService
            .userUpdateDetail(this.userConnected.id, proprietaireData)
            .subscribe(
              (response) => {
                console.log('reponse: ', response);
                this.alertMessage(
                  'success',
                  'Modifié',
                  'Profil modifié avec succés'
                );
                this.viderChamps();
                this.getuserConnected();
                this.testConnected();
              },
              (error) => {
                console.log(error);
                this.alertMessage(
                  'error',
                  'Oops',
                  'Une erreur est survenue lors de la modification du profil'
                );
              }
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Si l'utilisateur clique sur "Annuler"
          console.log('La modification du profil a été annulée.');
          this.alertMessage(
            'info',
            'Annulée',
            'modification du profil annulée'
          );
          this.viderChamps();
        }
      });
    }
  }

  // File img1
  profilAdd(event: any) {
    this.imageCheck = event.target.files[0] as File;
    console.warn(event.target.files[0]);
  }

  // Vider champs
  viderChamps() {
    this.nom = '';
    this.prenom = '';
    this.description = '';
    this.email = '';
    this.adresse = '';
    this.telephone = '';
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
