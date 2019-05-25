/* 这个文件是angular根模块，告诉angular如何组装应用 */

// BrowserModule，浏览器解析的模块
import { BrowserModule } from '@angular/platform-browser'
// Angular 核心模块
import { NgModule } from '@angular/core'
// 路由模块
import { AppRoutingModule } from './app-routing.module'
// 表单模块，引入方便使用双向绑定
import { FormsModule} from '@angular/forms'
// 根组件
import { AppComponent } from './app.component'
import { NewsComponent } from './components/news/news.component'
import { HomeComponent } from './components/home/home.component'
import { HeaderComponent } from './components/header/header.component'

import { StorageService } from './services/storage.service';
import { ProductComponent } from './components/product/product.component'

/* @Ngmodule装饰器，@NgModule接收一个元数据对象*/
@NgModule({
  declarations: [  /* 配置当前项目运行的组件 */
    AppComponent, NewsComponent, HomeComponent, HeaderComponent, ProductComponent
  ],
  imports: [ /* 配置当前模块运行依赖的其他模块 */
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [StorageService], /* 配置所需要的服务 */
  bootstrap: [AppComponent] /* 指定应用的主视图（称为根组件）通过引导根AppModule来启动 */
})

// 根模块不需要导出任何东西， 因为其他组件不需要导入根模块
export class AppModule { }
