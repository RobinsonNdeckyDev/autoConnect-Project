import { Component, EventEmitter, Output } from '@angular/core';
// import { MdbAccordionModule } from 'mdbootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  homeCollapsed: boolean = true;
  dashboardCollapsed: boolean = true;

  constructor() {}

  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  hideSidebar() {
    // Appeler votre méthode pour masquer le sidebar ici
    // Par exemple, si vous avez déjà une méthode nommée toggleSidebar() qui gère l'affichage/masquage du sidebar, vous pouvez l'appeler ici
    this.toggleSidebar();
  }

  toggleCollapse(panel: string) {
    if (panel === 'home') {
      this.dashboardCollapsed = true; // Fermer le panneau Dashboard si ouvert
      this.homeCollapsed = !this.homeCollapsed; // Inverser l'état du panneau Home
    } else if (panel === 'dashboard') {
      this.homeCollapsed = true; // Fermer le panneau Home si ouvert
      this.dashboardCollapsed = !this.dashboardCollapsed; // Inverser l'état du panneau Dashboard
    }
  }

  ngOnInit(): void {}
}


