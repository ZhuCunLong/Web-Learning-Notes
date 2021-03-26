import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NewsComponent} from './components/news/news.component';
import {ProductComponent} from './components/product/product.component';
import {NewscontentComponent} from './components/newscontent/newscontent.component';
import {ProductContentComponent} from './components/product-content/product-content.component';
import {WelcomeComponent} from './components/home/welcome/welcome.component';
import {SettingComponent} from './components/home/setting/setting.component';
import {PlistComponent} from './components/product/plist/plist.component';
import {PcateComponent} from './components/product/pcate/pcate.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'setting', component: SettingComponent},
      {path: '**', redirectTo: 'welcome'}
    ]
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'product',
    component: ProductComponent,
    children: [
      {path: 'plist', component: PlistComponent},
      {path: 'pcate', component: PcateComponent},
      {path: '**', redirectTo: 'pcate'}
    ]
  },
  {path: 'newscontent/:newsid', component: NewscontentComponent},
  {path: 'productcontent/:pid', component: ProductContentComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
