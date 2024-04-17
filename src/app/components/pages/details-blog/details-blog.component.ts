import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListeBlogsService } from 'src/app/services/liste-blogs.service';

@Component({
  selector: 'app-details-blog',
  templateUrl: './details-blog.component.html',
  styleUrls: ['./details-blog.component.css'],
})
export class DetailsBlogComponent implements OnInit {

  // apiImage
  apiImage= "https://adamarahma99.simplonfabriques.com/images/";
  
  blogId?: number;
  blogDetails: any;

  constructor(
    private route: ActivatedRoute,
    private listeBlogsService: ListeBlogsService
    ) {}

  ngOnInit(): void {

    // iid du blog
    this.identifiantBlog();

    // detail du blog
    this.getBlog();
  }


  // identifiant du blog
  identifiantBlog(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.blogId = +id;
      console.log(this.blogId);
      // Utilisez cet ID pour charger les détails du blog
    } else {
      // Traitez le cas où l'ID est null
    }
  }

  // liste des blogs
  getBlog(){
    if (this.blogId !== undefined) {
      let idBlog: number = this.blogId;
      this.listeBlogsService.infoBlog(idBlog).subscribe(
        (response: any) => {
          console.log('Détails du blog: ', response.blocs);
          // Enregistrer les détails du blog dans la variable blogDetails
          this.blogDetails = response.blocs;
          console.log(this.blogDetails);
        },
        (error) => {
          console.log(
            'Erreur lors de la récupération des détails du blog: ',
            error
          );
        }
      );
    } else {
      // Traitez le cas où l'ID du blog est undefined
    }
  }
}
