import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-vendeur',
  templateUrl: './main-vendeur.component.html',
  styleUrls: ['./main-vendeur.component.css']
})
export class MainVendeurComponent {
  isSidebarVisible: boolean = true;

  ownerId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Récupérer l'ID du propriétaire à partir des paramètres de l'URL
    this.ownerId = this.route.snapshot.paramMap.get('id');
    
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
