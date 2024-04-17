import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ListeUsersService } from 'src/app/services/liste-users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userConnected: any;
  infoProprietaire: any;
  proprietaireId: any;

  constructor(private proprietaireService: ListeUsersService) {}

  ngOnInit(): void {
    this.getuserConnected();
    // this.testConnected();
  }
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  // Avoir l'utilisateur connecté
  getuserConnected() {
    let currentUserInfo: any = localStorage.getItem('currentUser');
    this.userConnected = JSON.parse(currentUserInfo);
    console.log('getUserConnected: ', this.userConnected.id);
  }

  // test userconnected
  // testConnected() {
  //   this.infoProprietaire = JSON.parse(
  //     localStorage.getItem('currentUser') || '{}'
  //   );
  //   this.proprietaireId = this.infoProprietaire.id;
  //   console.log('proprietaireId: ', this.proprietaireId);

  //   if (this.proprietaireId) {
  //     const proprietaireIdNumber =
  //       typeof this.proprietaireId === 'string'
  //         ? parseInt(this.proprietaireId, 10)
  //         : this.proprietaireId;
  //     this.proprietaireService
  //       .userShowDetail(proprietaireIdNumber)
  //       .subscribe((proprietaire: any) => {
  //         this.userConnected = proprietaire.utilisateur;
  //         console.log('userConnected: ', this.userConnected);
  //         console.log(this.userConnected.image);
  //       });
  //   }
  // }
}
