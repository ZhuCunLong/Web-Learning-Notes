import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  OnJump() {
    this.router.navigate(['/productcontent/', '123'])
  }

  goNews() {
    let navitationExtras = {
      queryParams: { newsid: '123' }
    }

    this.router.navigate(['/news'], navitationExtras)
  }
}
