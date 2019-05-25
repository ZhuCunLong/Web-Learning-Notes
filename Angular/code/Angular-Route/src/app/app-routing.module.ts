import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NewsComponent} from './components/news/news.component';
import {ProductComponent} from './components/product/product.component';
import {NewscontentComponent} from './components/newscontent/newscontent.component';
import {ProductContentComponent} from './components/product-content/product-content.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'newscontent/:newsid',
    component: NewscontentComponent
  },
  {
    path: 'productcontent/:pid',
    component: ProductContentComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
