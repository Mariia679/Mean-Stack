import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NewsComponent} from './news/news.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { PostDetailComponent } from './post-detail/post-detail.component';
import {HeaderComponent} from "./header/header.component";

const routes: Routes = [
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'post-details/:id',
    component: PostDetailComponent,
  },
  {
    path: '',
    redirectTo: '/news',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    PostDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {enableTracing: true})//debugging purposes only)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
