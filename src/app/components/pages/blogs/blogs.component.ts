import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeBlogsService } from 'src/app/services/liste-blogs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent {

  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";
  
  blogs: any;

  constructor(
    private route: Router,
    private listeBlogsService: ListeBlogsService
  ) {}

  ngOnInit(): void {

    // liste blogs
    this.getBlogs();
  }

  // Liste des blogs
  getBlogs() {
    this.listeBlogsService.getBlogs().subscribe(
      (response: any) => {
        console.log('liste des blogs ', response);

        // Assigner à blogs les trois premiers
        this.blogs = response.blocs.slice(0, 3);
        console.log('mon tableu de blogs ', this.blogs);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details blog
  redirectToDetails(blogId: number) {
    this.route.navigate(['/blog/detailsBlog', blogId]);
  }

  // vider champs
  viderChamps() {
    // this.nomComplet = '';
    // this.email = '';
    // this.message = '';
  }

  // Alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
