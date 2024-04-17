import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.css']
})
export class ScrollButtonComponent {

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollFunction();
  }

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  private scrollFunction() {
    const btn = document.getElementById('scrollToTopButton') as HTMLElement;
    // console.log('Scrolling detected!');

    // console.log(document.body.scrollTop, document.documentElement.scrollTop);

    // Affiche le bouton une fois que le défilement dépasse une certaine valeur (par exemple, 300 pixels)
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  }


}
