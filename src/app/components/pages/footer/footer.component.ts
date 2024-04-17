import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeNewslettersService } from 'src/app/services/liste-newsletters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  newsletter: string = '';

  constructor(
    private http: HttpClient,
    private newsletterService: ListeNewslettersService
  ) {}

  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

  // Abonnement newsletter
  subscribeNews() {
    if (this.newsletter == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner vorte email');
    } else if (!this.newsletter.match(this.emailPattern)) {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner un email valide'
      );
    } else {
      let newSubscriberNews = {
        email: this.newsletter,
      };

      this.newsletterService
        .addNewSubscribeNews(newSubscriberNews)
        .subscribe((response: any) => {
          this.alertMessage(
            'success',
            'Abonné',
            'Vous etes maintenant abonné à notre newsletter'
          );
          console.log(response);
          this.viderChamps();
        });
    }
  }

  // vider champs
  viderChamps() {
    this.newsletter = '';
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
