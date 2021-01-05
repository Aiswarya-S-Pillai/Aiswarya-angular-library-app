import { Component, OnInit } from '@angular/core';
import { IProduct } from '../productmodel';
//import { ProductService } from '../productservice.service'
import {AuthorserviceService} from '../authorservice.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-newauthor',
  templateUrl: './newauthor.component.html',
  styleUrls: ['./newauthor.component.css']
})
export class NewauthorComponent implements OnInit {



  constructor(private authorService:AuthorserviceService,private router: Router){  } 
  authorItem= {
     authorId :'',
     authorName:'',
     book:'',
    genre:'',
     country:'',
     price:'',
     starRating:'',
     imageUrl:''}
 // productItem: IProduct;
  ngOnInit() {
  }
  AddAuthor()
  {    
    this.authorService.newAuthor(this.authorItem);
    console.log("Called");    
    alert("Success");
    this.router.navigate(['/authors']);
  }
}
