import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupComponent} from './pages/setup/setup.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { FormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { MainRoutingModule} from './pages/main/main-routing.module';
import { LeftControlComponent } from './pages/main/left-control/left-control.component';
import { ListComponent } from './pages/main/left-control/list/list.component';
import { RightControlComponent } from './pages/main/right-control/right-control.component';
import { HeaderComponent } from './pages/main/right-control/header/header.component';
import { QuickAddComponent } from './pages/main/right-control/quick-add/quick-add.component';
import { TodoComponent } from './pages/main/right-control/todo/todo.component';
import { SuggestComponent } from './pages/main/right-control/header/suggest/suggest.component';
import { DetailComponent } from './pages/main/detail/detail.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    MainComponent,
    LeftControlComponent,
    ListComponent,
    RightControlComponent,
    HeaderComponent,
    QuickAddComponent,
    TodoComponent,
    SuggestComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MainRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
